"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.token);

  return (
    <div
      className="block w-screen h-[80vh] relative p-1 m-0"
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
        style={{ filter: "brightness(50%)" }}
      />
      <div className="relative top-[35%] z-20 text-center">
        <h1 className="text-4xl font-serif">
          where every event finds its venue
        </h1>
        <h3 className="text-xl font-serif">
          Finding the perfect venue has never been easier. Whether it's a
          wedding, corporate event, or private party, we connecting people to
          the perfect place.
        </h3>
      </div>
      {session ? (
        <div className="z-30 absolute top-5 right-10 font-semibold text-white text-xl">
          Hello {session.user?.name}
        </div>
      ) : null}
    </div>
  );
}
