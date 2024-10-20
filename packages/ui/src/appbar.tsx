import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const shouldShowButton = pathname !== "/sign-in" && pathname !== "/sign-up";

  const handleAuthAction = async () => {
    if (session) {
      await signOut();
    } else {
      // await signIn();
      router.push("/sign-in");
    }
  };

  return (
<div
      className="fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center bg-gray-900 text-white shadow-md shadow-gray-800"
    >
      <Link href="/">
        <div className="tracking-widest px-3 py-4">WALLETORA</div>
      </Link>
      <div className="flex flex-col justify-center pt-2">
        {shouldShowButton && (
          <Button onClick={handleAuthAction}>
            {session ? "Logout" : "Login"}
          </Button>
        )}
      </div>
    </div>
  );
};
