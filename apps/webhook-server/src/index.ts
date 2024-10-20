import express from "express";
import db from "@repo/db/client"

const PORT = 4000;
const app = express();

type infoType = {
        token: string, 
        userId: string,
        amount: string
}
app.post("/hdfc-webhook", async (req, res) => {
    const info:infoType = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }
    //todo: zod validation of info
    //todo: check if req comes from hdfc bank, use webhook secret

    try {
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

        res.json({
            message: "successfully processed the webhook"
        })
    }
    catch (e) {
        console.log(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});

app.post("/kotak-webhook", async (req, res) => {
    const info:infoType = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }
    //todo: zod validation of info
    //todo: check if req comes from hdfc bank, use webhook secret

    try {
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

        res.json({
            message: "successfully processed the webhook"
        })
    }
    catch (e) {
        console.log(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});