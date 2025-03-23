import Image from "next/image";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-between items-center">
      <div>
        {session ? (
          <Link href="/api/auth/signout">
            <div>Sign-Out of {session.user?.name}</div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div>Sign-In</div>
          </Link>
        )}
      </div>
      {/*ผมซุยไปบ่ครับอ้าย*/}
      <div></div>

      {/* Right Menu Items */}
      <div className="flex">
        <TopMenuItem title="My Bookings" pageRef="/mybooking" />
        <TopMenuItem title="Booking" pageRef="/booking" />
        <Image
          src={"/img/logo.png"}
          className="h-auto w-auto"
          alt="logo"
          width={0}
          height={0}
          sizes="70px"
        />
      </div>
    </div>
  );
}
