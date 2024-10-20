"use server"

import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction(provider: string, amount: number){
    const sesstion = await getServerSession(authOptions);
    
    if(!sesstion?.user || !sesstion.user?.id){
        return {
            message: "Unquthorized request"
        }
    }

    const userId = sesstion.user.id;
    //todo: get token from bank server by passing amoint and user id
    const token = Math.random().toString();
    
    await db.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount: amount*100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token
        }
    });

    return {
        message: "Onramp transaction added"
     }
}