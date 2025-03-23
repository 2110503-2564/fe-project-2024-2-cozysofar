"use client";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { useState } from "react";
import Rating from "@mui/material/Rating";

export default function ProductCard({
  venueName,
  imgSrc,
  onRating,
}: {
  venueName: string;
  imgSrc: string;
  onRating?: Function;
}) {
  function onCarSelected() {
    alert("You selected " + venueName);
  }

  const [rating, setRating] = useState(0);

  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[60%] relative rounded-t-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt={`${venueName} Image`}
          layout="fill"
          objectFit="cover"
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[20%] p-[10px] text-black text-center font-semibold">
        {venueName}
      </div>
      <div
        className="flex justify-center mt-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {onRating ? (
          <Rating
            id={venueName + " Rating"}
            name={venueName + " Rating"}
            data-testid={venueName + " Rating"}
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating || 0);
              onRating(venueName, newRating);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </InteractiveCard>
  );
}
