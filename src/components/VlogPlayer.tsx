"use client";
import { useWindowListener } from "@/hooks/useWindowListener";
import { useRef, useEffect, useState } from "react";
export function VlogPlayer({
  vdoSrc,
  isPlaying,
}: {
  vdoSrc: string;
  isPlaying: boolean;
}) {
  const vdoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    //alert("Video width is " + vdoRef.current?.videoWidth);
    if (isPlaying) {
      vdoRef.current?.play();
    } else {
      vdoRef.current?.pause();
    }
  });

  const [winwidth, setWinwidth] = useState(0);

  useWindowListener("resize", (e) => {
    //alert("Window width is " + (e.target as Window).innerWidth);
  });
  return <video className="w-[40%]" src={vdoSrc} ref={vdoRef} loop muted />;
}
