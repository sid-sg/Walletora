"use client";

import { Card } from "@repo/ui/card";
import AmountSelector from "@repo/ui/amountInput";
import Dropdown from "@repo/ui/dropdown";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmount] = useState(0);

  const handleBankChange = (bankName: string) => {
    const selectedBank = SUPPORTED_BANKS.find((bank) => bank.name === bankName);
    if (selectedBank) {
      setProvider(selectedBank.name);
      setRedirectUrl(selectedBank.redirectUrl);
    }
  };

  return (
    <div className="flex justify-center">
      <Card title="Add Money">
        <div className="px-20">
          <AmountSelector
            label="Select Amount"
            placeholder="Amount"
            amount={amount}
            onAmountChange={setAmount}
          />
          <Dropdown
            provider={provider}
            options={SUPPORTED_BANKS}
            onProviderChange={handleBankChange}
          />
          <Button onClick={async () => {
            console.log(`Adding ${amount} INR to ${provider}`);
            await createOnRampTransaction(provider, amount);
            window.open(redirectUrl || "");
          }}>
            Add
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddMoneyCard;