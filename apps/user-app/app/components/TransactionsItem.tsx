
// enum statusVal {
//   Failure = "Failure",
//   Success = "Success",
//   Processing ="Processing",
//   Sent = "Sent"
// }
type transactionsType = {
  time: Date,
  amount: number,
  // status: statusVal,
  status: string,
  provider?: string
  toUserName?: string
}

// const TransactionsItem = ({ transaction }: { transaction: transactionsType }) => {
//   return (
//     <div className="flex flex-col text-lg">

//       <div>
//         { (()=>{
//           if(transaction.status === "Success"){
//             return(
//             <div className="text-green-500 flex  justify-between gap-5">
//               <div>Received</div>
//               <div >+ Rs {transaction.amount / 100}</div>
//             </div>
//             );
//           }
//           else if(transaction.status === "Processing" ){
//             return (

//             <div className="text-gray-500 flex  justify-between gap-5">

//               <div >Processing</div>
//               <div >Rs {transaction.amount / 100}</div>
//             </div>
//             );
//           }
//           else if(transaction.status === "Sent"){
//             return (

//             <div className="text-gray-500 flex  justify-between gap-5">

//               <div >Sent</div>
//               <div >Rs {transaction.amount / 100}</div>
//             </div>
//             );
//           }
//           else{
//             return(

//             <div className="text-red-500 flex  justify-between gap-5">
//               <div >Failed</div>
//               <div >Rs {transaction.amount / 100}</div>
//             </div>
//             );
//           }

//         }) () 
//         }


//         {/* {
//           transaction.status === "Success" ? (
//           ) : (transaction.status === "Processing" ? (
//           ) : (

//           ))
//         } */}
//       </div>

//       <div className="flex justify-between gap-5">
//         <div>
//           {/* {`${transaction.time.getDate().toString()} ${(transaction.time.getMonth() + 1).toString()} ${transaction.time.getFullYear().toString()}`} */}
//           {transaction.time.toDateString() }
//         </div>

//         <div>
//           {
//             ( ()=>{
//               if(transaction.status==="Sent"){
//                 return(
//                   <div>
//            {transaction.toUserName}
//                   </div>
//                 );
//               }
//               else{
//                 return(
//                   <div>
//            {transaction.provider}
//                   </div>
//                 );
//               }
//             }) ()
//           }
//         </div>
//       </div>
//     </div>

//   )
// }
const TransactionsItem = ({ transaction }: { transaction: transactionsType }) => {
  return (
    <div className="flex flex-col text-lg w-full max-w-sm mx-auto p-4 bg-slate-900 rounded-md shadow-md">
      <div>
        {(() => {
          if (transaction.status === "Success") {
            return (
              <div className="text-green-500 flex justify-between gap-5">
                <div>Received</div>
                <div>+ Rs {transaction.amount / 100}</div>
              </div>
            );
          } 
          else if (transaction.status === "Processing") {
            return (
              <div className="text-gray-500 flex justify-between gap-5">
                <div>Processing</div>
                <div>Rs {transaction.amount / 100}</div>
              </div>
            );
          } 
          else if (transaction.status === "Sent") {
            return (
              <div className="text-gray-500 flex justify-between gap-5">
                <div>Sent</div>
                <div>Rs {transaction.amount / 100}</div>
              </div>
            );
          } 
          else {
            return (
              <div className="text-red-500 flex justify-between gap-5">
                <div className="flex">

                  Failed <CrossIcon/>
                  </div>
                <div>Rs {transaction.amount / 100}</div>
              </div>
            );
          }
        })()}
      </div>

      <div className="flex justify-between gap-5 mt-2">
        <div className="text-gray-600">
          {transaction.time.toDateString()}
        </div>

        <div className="text-slate-500 font-medium truncate max-w-[120px] text-right">
          {transaction.status === "Sent"
            ? transaction.toUserName
            : transaction.provider}
        </div>
      </div>
    </div>
  );
};

function CrossIcon(){
  return <div >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

  </div>
}

export default TransactionsItem