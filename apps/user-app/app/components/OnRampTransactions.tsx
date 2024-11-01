import { Card } from "@repo/ui/card"
import TransactionsItem from "./TransactionsItem"

// enum statusVal {
//   Failure = "Failure",
//   Processing ="Processing",
//   Success = "Success"
// }
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
      <Card title="Deposits">
        <div>
          no transactions
        </div>
      </Card>
    )
  }
  return (
    <div className="flex justify-center">

      <Card title="Deposits">
        <div className="divide-y divide-gray-600 p-10">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex justify-center space-x-4 p-2">
              <TransactionsItem transaction={transaction} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default OnRampTransactions


