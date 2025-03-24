import Image from "next/image";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-black sticky top-0 left-0 right-0 z-30 border-t border-b border-gray-700 flex justify-between items-center px-4">
      <div className="flex items-center h-full">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={39}
            height={39  }
            className="h-full w-auto"
          />
        </Link>
        <TopMenuItem title="Select Hotel" pageRef="/hotel" />
        <TopMenuItem title="About" pageRef="/about" />
        <TopMenuItem title="My Bookings" pageRef="/cart" />
      </div>
      <div className="flex items-center h-full">
        {session && session.user ? (
          <Link href="/api/auth/signout">
            <div className="px-2 text-white text-sm cursor-pointer">Sign-Out</div>
          </Link>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <div className="px-2 text-white text-sm cursor-pointer">Sign-In</div>
            </Link>
            <Link href="/register">
              <div className="px-2 text-white text-sm cursor-pointer">Register</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}