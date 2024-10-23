import db from "@repo/db/client"
import OnRampTransactions from '../../components/OnRampTransactions'
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import P2pTransactions from "../../components/P2pTransactions";

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

async function getP2PTransactions(){
  const session = await getServerSession(authOptions);
  const transactions = await db.p2PTransaction.findMany({
    where: {
      fromUserId: Number(session?.user?.id)
    },
    orderBy: {
      startTime: "desc"
    },
    include: {
      toUser: {
        select: {
          name: true
        }
      }
    }
  });

  
  return transactions.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status ,
    toUserName: t.toUser.name
  }));
}
const page = async() => {
  const onRampTransactions = await getOnRampTransactions();
  const P2PTransactions = await getP2PTransactions();
  // console.log(P2PTransactions);
  
  
  return (
    <div className='mt-20'>

            <div className="flex justify-center text-5xl text-white pt-8 mb-8 font-bold">
                Transactions
            </div>
            <OnRampTransactions transactions={onRampTransactions}/>
            <div className="mt-10"></div>
            <P2pTransactions transactions={P2PTransactions}/>
    </div>
  )
}

export default page