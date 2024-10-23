import { Card } from "@repo/ui/card"
import TransactionsItem from "./TransactionsItem"

// enum statusVal {
//   Failure = "Failure",
//   Processing ="Processing",
//   Sent = "Sent"
// }
type transactionsType = {
  time: Date,
  amount: number,
  // status: statusVal,
  status: string,
  toUserName: string
}

const P2pTransactions = ({ transactions }: { transactions: transactionsType[] }) => {
  if (!transactions || !transactions.length) {
    return (
      <Card title="Transactions">
        <div>
          no transactions
        </div>
      </Card>
    )
  }
  return (
    <div className="flex justify-center">

      <Card title="Transactions">
        <div className="divide-y divide-gray-600 p-10">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex justify-center space-x-4 p-2">
              <TransactionsItem transaction={transaction} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default P2pTransactions