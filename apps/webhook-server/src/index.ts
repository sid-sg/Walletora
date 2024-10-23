import express, { Request, Response } from "express";
import db from "@repo/db/client"

const PORT = 4000;
const app = express();


app.use(express.json());

type infoType = {
    token: string,
    userId: string,
    amount: string,
    webhookSecret: string
}
app.post("/hdfc-webhook", async (req: Request, res: Response): Promise<any> => {

    const info: infoType = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        webhookSecret: req.body.webhookSecret
    }

    if (info.webhookSecret != "HDFC_secret") {
        return res.status(401).json({
            message: "Unauthorized Bank"
        });
    }

    //todo: zod validation of info

    try {

        const processingTrans = await db.onRampTransaction.findUnique({
            where: {
                token: info.token
            }
        });

        if (!processingTrans || processingTrans.status !== "Processing") {
            return res.status(400).json({
                message: "Invalid or processed transaction"
            })
        }

        await db.$transaction([

            db.balance.update({
                where: {
                    userId: Number(info.userId)
                },
                data: {
                    amount: {
                        increment: Number(info.amount)
                    }
                }
            }),

            db.onRampTransaction.update({
                where: {
                    token: info.token
                },
                data: {
                    status: "Success",

                }
            })

        ]);

        return res.json({
            message: "successfully processed the webhook"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});

app.post("/axis-webhook", async (req, res): Promise<any> => {
    const info: infoType = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
        webhookSecret: req.body.webhookSecret
    }

    if (info.webhookSecret != "AXIS_secret") {
        return res.status(401).json({
            message: "Unauthorized Bank"
        })
    }
    //todo: zod validation of info

    try {

        const processingTrans = await db.onRampTransaction.findUnique({
            where: {
                token: info.token
            }
        });

        if (!processingTrans || processingTrans.status !== "Processing") {
            return res.status(400).json({
                message: "invalid or processed transaction"
            })
        }

        await db.$transaction([

            db.balance.update({
                where: {
                    userId: Number(info.userId)
                },
                data: {
                    amount: {
                        increment: Number(info.amount)
                    }
                }
            }),

            db.onRampTransaction.update({
                where: {
                    token: info.token
                },
                data: {
                    status: "Success",

                }
            })

        ]);

        return res.json({
            message: "successfully processed the webhook"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});


app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});