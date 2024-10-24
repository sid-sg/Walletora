import db from "@repo/db/client"
import { getServerSession } from 'next-auth'
import AddMoneyCard from '../../components/AddMoneyCard'
import BalanceCard from '../../components/BalanceCard'
import { authOptions } from '../../lib/auth'


async function getBalance(){
  
  const session = await getServerSession(authOptions);  
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.id)
    }
  });
  
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

const page = async () => {
  const balance = await getBalance();
  return (
    <div className='mt-20'>

            <div className="flex justify-center text-5xl text-white pt-8 mb-8 font-bold">
                Dashboard
            </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-2'>
        <AddMoneyCard />
        <BalanceCard amount={balance.amount}  locked={balance.locked}/>
      </div>
    </div>
  )
}

export default page
