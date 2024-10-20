import { Card } from "@repo/ui/card"

const BalanceCard = ({ amount, locked }: { amount: number, locked: number }) => {
    return (
        <div className="flex justify-center">
            <Card title="Balance">
                <div className="px-16 mt-8">
                    <div className="mt-2 flex justify-between items-center border-b border-slate-300 pb-2 text-xl">
                        <div>Unlocked balance</div>
                        <div className="ml-8">{amount / 100} INR</div>
                    </div>
                    <div className="mt-2 flex justify-between items-center border-b border-slate-300 py-2 text-xl">
                        <div>Locked Balance</div>
                        <div className="ml-8">{locked / 100} INR</div>
                    </div>
                    <div className="mt-2 flex justify-between items-center border-b border-slate-300 py-2 text-xl">
                        <div>Total Balance</div>
                        <div className="ml-8">{(locked + amount) / 100} INR</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default BalanceCard
