"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="block w-screen h-[80vh] relative p-1 m-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
      >
        <source src="https://media.iceportal.com/138346/Videos/video040524214954517_1080p.mp4" type="video/mp4" />
      </video>
      <div
        className="relative top-[35%] z-20 text-center"
      >
        <h1 className="text-4xl font-serif text-white">CozyHotel</h1>
        <h3 className="text-xl font-serif text-white">
          At CozyHotel, you always feel at home
        </h3>
      </div>
      {session ? (
        <div
          className="z-30 absolute top-5 right-10 font-serif text-white text-xl"
        >
          Hello {session.user?.name}
        </div>
      ) : null}
      <button
        className="bg-black text-white font-serif 
             py-3 px-6 rounded-full z-30 absolute bottom-5 right-5 
             transition-all duration-300 ease-in-out
             border border-[#60788B] shadow-lg
             hover:bg-gray-400 hover:border-[#8FA7BE] 
             hover:text-white transform hover:scale-105"
        onClick={() => {
          router.push("/hotel");
        }}
      >
        Select Your Hotel
      </button>
    </div>
  );
}
