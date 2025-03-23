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
      event.currentTarget.classList.remove("bg-white");
      event.currentTarget.classList.add("bg-neutral-200");
    } else {
      event.currentTarget.classList.remove("shadow-2xl");
      event.currentTarget.classList.add("shadow-lg");
      event.currentTarget.classList.remove("bg-neutral-200");
      event.currentTarget.classList.add("bg-white");
    }
  }
  return (
    <div
      className="w-full h-[300px] rounded-lg bg-white shadow-white shadow-lg cursor-pointer"
      onClick={() => onCardSelected()}
      onMouseOver={(e) => onCardMouseAction(e)}
      onMouseOut={(e) => onCardMouseAction(e)}
    >
      {children}
    </div>
  );
}
