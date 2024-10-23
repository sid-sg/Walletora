import SendMoneyCard from "../../components/SendMoneyCard"

const page = () => {
  return (
    <div className='mt-20'>

            <div className="flex justify-center text-5xl text-white pt-8 mb-8 font-bold">
                Transfer
            </div>
      <div className='p-2'>
        <SendMoneyCard />
      </div>
    </div>
  )
}

export default page