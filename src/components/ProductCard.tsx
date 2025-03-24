"use client";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function ProductCard({
  carName,
  imgSrc,
  onCompare,
}: {
  carName: string;
  imgSrc: string;
  onCompare?: Function;
}) {
  function onCarSelected() {
    alert("You selected " + carName);
  }

  return (
    <InteractiveCard contentName={carName}>
      <div className="w-full h-[70%] relative rounded-t-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt="Product Picture"
          layout="fill"
          objectFit="cover"
          className="object-cover rounded-t-lg transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="w-full h-[15%] p-[10px] text-[#C9A55C] text-center font-serif text-lg">
        {carName}
      </div>
      {onCompare ? (
        <button
          className="block h-[10%] text-sm rounded-md bg-[#C9A55C] hover:bg-[#B38B4A] mx-2 px-4 py-1 text-white 
                     shadow-sm transition-all duration-300 transform hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onCompare(carName);
          }}
        >
          Compare
        </button>
      ) : (
        ""
      )}
    </InteractiveCard>
  );
}
