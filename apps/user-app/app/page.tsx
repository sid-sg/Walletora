"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Appbar  user={session.data?.user} />

      <div className='flex flex-col items-center'>
        <h1 className='text-gray-300 text-4xl sm:text-7xl p-5 tracking-widest '>WALLETORA</h1>

        <div className='text-gray-400 md:text-3xl '>
          Your Secure & Seamless E-Wallet Solution
        </div>
      </div>

      <div className='flex  justify-center mt-20'>
        <div className='flex'>

            <Button onClick={()=>{
              router.push("/sign-up")
            }}>{"Create new account"}</Button>
        </div>
      </div>
    </div>
  );
}