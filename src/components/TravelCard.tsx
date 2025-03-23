"use client";
import { VlogPlayer } from "./VlogPlayer";
import { useState } from "react";
import { Rating } from "@mui/material";
import { useWindowListener } from "@/hooks/useWindowListener";

export function TravelCard() {
  const [playing, setPlaying] = useState(true);
  const [rating, setRating] = useState(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  useWindowListener("pointermove", (e) => {
    setPointerPosition({
      x: (e as PointerEvent).clientX,
      y: (e as PointerEvent).clientY,
    });
  });

  return (
    <div className="w-[80%] bg-[#25282A] shadow-lg mx-[10%] my-10 p-2 rounded-lg flex flex-row">
      <VlogPlayer
        isPlaying={playing}
        vdoSrc="/video/EdgeRunner.mp4"
      ></VlogPlayer>
      <div>
        <div className="text-lg font-bold text-[#52D7F7] m-2">Night City</div>
        <button
          className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
          font-semibold py-2 px-4 m-2 rounded z-30 bottom-0 right-0 hover:bg-[#52D7F7]
          hover:text-[#181A1B] hover:boarder-transparent"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        {/* Style เทพๆ */}
        <Rating
          className="w-full h-[10%] m-2"
          value={rating === undefined ? 0 : rating}
          onChange={(e, newValue) => {
            if (newValue != null) setRating(newValue);
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2-00/svg"
              viewBox="0 0 24 24"
              fill="#52D7F7"
              width="1em"
              height="1em"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 18.77l-5.18 2.22 1.18-6.88-5-4.87 6.91-1.01L12 2z" />
            </svg>
          }
          emptyIcon={
            <svg
              xmlns="http://www.w3.org/2-00/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#52D7F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="1em"
              height="1em"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 18.77l-5.18 2.22 1.18-6.88-5-4.87 6.91-1.01L12 2z" />
            </svg>
          }
        />
        
      </div>
    </div>
  );
}
