"use client";

import { Card } from "@repo/ui/card";
import AmountSelector from "@repo/ui/amountInput";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import InputField from "@repo/ui/inputfield";
import { createP2PTransfer } from "../lib/actions/createP2PTransaction";

const SendMoneyCard = () => {
  const [amount, setAmount] = useState(0);
  const [reciever, setReciever] = useState("");

  return (
    <div className="flex justify-center ">
      <Card title="Send Money">
        <div className="px-20 max-w-[409px] text-lg">
          <div className="mt-4"></div>
            <InputField type="email" label="" placeholder="Reciever Email" value={reciever} onChange={ (e:any)=>setReciever((e.target.value)) } error={null}/>
          <AmountSelector
            label=""
            placeholder="Amount"
            amount={amount}
            onAmountChange={setAmount}
          />
          <div className="mt-4"></div>
          <Button onClick={async () => {
            await createP2PTransfer(reciever, Number(amount)*100);
            // console.log(`Sending ${amount} INR to ${reciever}`);
          }}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SendMoneyCard;