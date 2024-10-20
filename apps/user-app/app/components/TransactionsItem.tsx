
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

const TransactionsItem = ({ transaction }: { transaction: transactionsType }) => {
  return (
    <div className="flex flex-col text-lg">

      <div>
        {
          transaction.status === "Success" ? (
            <div className="text-green-500 flex  justify-between gap-5">
              <div>Received</div>
              <div >+ Rs {transaction.amount / 100}</div>
            </div>
          ) : (transaction.status === "Processing" ? (
            <div className="text-gray-500 flex  justify-between gap-5">

              <div >Processing</div>
              <div >Rs {transaction.amount / 100}</div>
            </div>
          ) : (

            <div className="text-red-500 flex  justify-between gap-5">
              <div >Failed</div>
              <div >Failed Rs {transaction.amount / 100}</div>
            </div>
          ))
        }
      </div>

      <div className="flex justify-between gap-5">
        <div>
          {/* {`${transaction.time.getDate().toString()} ${(transaction.time.getMonth() + 1).toString()} ${transaction.time.getFullYear().toString()}`} */}
          {transaction.time.toDateString() }
        </div>

        <div>
           {transaction.provider}
        </div>
      </div>
    </div>

  )
}

export default TransactionsItem