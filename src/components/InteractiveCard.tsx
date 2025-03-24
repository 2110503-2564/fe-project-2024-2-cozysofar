"use client";
import React from "react";

export default function InteractiveCard({
  children,
  contentName,
}: {
  children: React.ReactNode;
  contentName: string;
}) {
  function onCardSelected() {
    //alert("You selected " + contentName);
  }

  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type === "mouseover") {
      event.currentTarget.classList.remove("shadow-lg");
      event.currentTarget.classList.add("shadow-2xl");
    } else {
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("shadow-lg");
    }
  }

  return (
    <div
      className="w-full h-[300px] rounded-lg bg-[#1A1A1A] border border-[#333333]
                 shadow-lg shadow-black/20 cursor-pointer transition-all duration-300
                 hover:border-[#C9A55C]/30 hover:shadow-[0_0_40px_rgba(201,165,92,0.1)]
                 transform hover:-translate-y-1"
      onClick={() => onCardSelected()}
      onMouseOver={(e) => onCardMouseAction(e)}
      onMouseOut={(e) => onCardMouseAction(e)}
    >
      {children}
    </div>
  );
}
