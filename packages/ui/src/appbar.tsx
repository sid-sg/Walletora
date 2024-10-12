import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation"; 
import Link from 'next/link'

interface AppbarProps {
  user?: {
    name?: string | null;
  };
}

export const Appbar = ({ user }: AppbarProps) => {
  const pathname = usePathname();
 const router = useRouter()
  const shouldShowButton = pathname !== "/sign-in" && pathname !== "/sign-up";

  return (
    <div className="flex justify-between text-white bg-gray-900 rounded shadow-md shadow-gray-800">
        <Link href="/">      <div className="tracking-widest px-3 py-4">WALLETORA</div></Link>
      <div className="flex flex-col justify-center pt-2">
        {shouldShowButton && (
          <Button onClick={user ? ()=>{router.push("/sign-up")} : ()=>{router.push("/sign-in")}}>
            {user ? "Logout" : "Login"}
          </Button>
        )}
      </div>
    </div>
  );
};
