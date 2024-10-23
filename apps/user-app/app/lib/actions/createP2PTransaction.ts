"use server"

import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
// import {rowlock} from "@repo/db/client/sql"


export async function createP2PTransfer(toEmail: string, amount: number) {

    if (amount <= 0) {
        return {
            message: "Invalid amount"
        }
    }
    const session = await getServerSession(authOptions);
    const fromUserId = session?.user?.id;
    if ((!fromUserId)) {
        return {
            message: "Error while sending"
        }
    }

    const toUser = await db.user.findUnique({
        where: {
            email: toEmail
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    let transaction: any;

    try {
        transaction = await db.p2PTransaction.create({
            data: {
                amount,
                status: "Processing",
                startTime: new Date(),
                fromUserId: Number(fromUserId),
                toUserId: Number(toUser.id)
            }
        });


        await db.$transaction(async (tx) => {

            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;


            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(fromUserId)
                }
            });

            if (!fromBalance) {
                throw new Error("Something went wrong")
            }

            if (fromBalance.amount < amount) {
                throw new Error("Insufficient funds")
            }

            await tx.balance.update({
                where: {
                    userId: Number(fromUserId)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            });

            await tx.balance.update({
                where: {
                    userId: Number(toUser.id)
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });

            await tx.p2PTransaction.update({
                where: {
                    id: transaction.id
                },
                data: {
                    status: "Sent",
                }
            });

        })

    }
    catch (e: any) {
        console.log(e);

        if (transaction) {

            await db.p2PTransaction.update({
                where: {
                    id: transaction.id
                },
                data: {
                    status: "Failure"
                }
            });
        }
    }

}