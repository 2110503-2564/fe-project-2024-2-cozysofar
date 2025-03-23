"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg"];
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
        src={covers[index % 3]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
        style={{ filter: "brightness(50%)" }}
      />
      <div className="relative top-[25%] z-20 text-center" onClick={(e) => {
          e.stopPropagation();
        }}>
        <h1 className="text-4xl font-serif text-white">CozyHotel</h1>
        <h3 className="text-xl font-serif text-white">At CozyHotel, you always feel at home</h3>
      </div>
      {session ? (
        <div className="z-30 absolute top-5 right-10 font-semibold text-white text-xl">
          Hello {session.user?.name}
        </div>
      ) : null}
      <button
        className="bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
        font-semibold py-2 px-4 m-2 rounded z-30 absolute bottom-2 right-5 hover:bg-[#52D7F7]
        hover:text-[#181A1B] hover:boarder-transparent"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/hotel");
        }}
      >
        Select Your Hotel
      </button>
    </div>
  );
}
