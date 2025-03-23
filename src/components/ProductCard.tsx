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
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px] text-black text-center font-semibold">
        {carName}
      </div>
      {onCompare ? (
        <button
          className="block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm"
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
