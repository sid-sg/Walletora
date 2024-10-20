import { Card } from "@repo/ui/card"
import TransactionsItem from "./TransactionsItem"

// enum statusVal {
//   Failed,
//   Success,
//   Processing
// }
type transactionsType = {
  time: Date,
  amount: number,
  // status: statusVal,
  status: string,
  provider: string
}

const OnRampTransactions = ({ transactions }: { transactions: transactionsType[] }) => {
  // console.log(transactions);

  if (!transactions || !transactions.length) {
    return (
      <Card title="On-ramp transactions">
        <div>
          no transactions
        </div>
      </Card>
    )
  }
  return (
    <div className="flex justify-center">

      <Card title="On-ramp transactions">
        <div className="divide-y divide-gray-600 p-10">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex justify-center space-x-4 p-2">
              {/* <div>
              <div>Received INR</div>
              <div className="text-sm">{transaction.time.toString()}</div>
            </div> */}
              {/* {transaction.status === "Success" ? (
              <div className="text-green-500">+ Rs {transaction.amount/100}</div>
            ) : transaction.status === "Processing" ? (
              <div className="text-gray-500">Processing Rs {transaction.amount/100}</div>
            ) : (
              <div className="text-red-500">Failed X Rs {transaction.amount/100}</div>
            )} */}

              <TransactionsItem transaction={transaction} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default OnRampTransactions


