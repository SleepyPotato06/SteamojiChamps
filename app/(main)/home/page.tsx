"use client";

import { useState } from "react";

export default function Home() {
  const [buttonSelected, setButtonSelected] = useState<string>("button1");

  return (
    <div className="min-w-[60rem] h-[30rem] flex flex-row rounded-md">
      <div className="w-2/6 flex flex-col gap-4 bg-stone-950 text-white p-4">
        <button
          onClick={() => setButtonSelected("button1")}
          className={`${
            buttonSelected === "button1"
              ? "text-black bg-yellow-400"
              : "bg-stone-950"
          } p-2 rounded-md`}
        >
          Account Details
        </button>
        <button
          onClick={() => setButtonSelected("button2")}
          className={`${
            buttonSelected === "button2"
              ? "text-black bg-yellow-400"
              : "bg-stone-950"
          } p-2 rounded-md`}
        >
          Your Challenges
        </button>
        <button
          onClick={() => setButtonSelected("button3")}
          className={`${
            buttonSelected === "button3"
              ? "bg-yellow-400 text-black"
              : "bg-stone-950"
          } p-2 rounded-md`}
        >
          Achievements
        </button>
      </div>
      <div className="p-4 border-2 w-full h-full border-gray-100"></div>
    </div>
  );
}
