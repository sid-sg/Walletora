import db from "@repo/db/client"
import OnRampTransactions from '../../components/OnRampTransactions'
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getOnRampTransactions(){
  const session = await getServerSession(authOptions);
  const transactions = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id)
    },
    orderBy: {
      startTime: "desc"
    }
  });
  // console.log(transactions);
  
  return transactions.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }));
}

const page = async() => {
  const transactions = await getOnRampTransactions();
  // console.log(transactions);
  
  return (
    <div className='mt-20'>

            <div className="flex justify-center text-5xl text-white pt-8 mb-8 font-bold">
                Transactions
            </div>
            <OnRampTransactions transactions={transactions}/>
    </div>
  )
}

export default page