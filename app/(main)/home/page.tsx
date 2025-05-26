"use client";

import { PiSealWarningFill } from "react-icons/pi";
import { inter_md } from "@/lib/font";
import { useUser } from "@/lib/UserContext";

export default function Home() {
  const { user } = useUser();

  return (
    <div
      className={`${inter_md.className} w-full px-6 flex flex-col gap-4 justify-center items-center`}
    >
      <div className="w-full flex flex-row gap-4 items-center">
        <div
          id="user-details"
          className="w-full h-full flex flex-col justify-center items-center font-bold text-4xl gap-4 p-4 border-2 border-stone-200 rounded-md shadow-md"
        >
          <div>
            👋Hello,{" "}
            <span className="bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-700 text-transparent bg-clip-text">
              {user?.first_name}
            </span>
          </div>
        </div>
        <div
          id="coins-achieved"
          className="w-full h-full p-4 border-2 border-stone-200 rounded-md shadow-md"
        >
          <div className="font-bold text-xl">Coins Achieved</div>
          <div className="w-full h-full text-blue-800 pb-6 flex justify-center items-center text-7xl">
            {user?.totalCoinsAchieved}
          </div>
        </div>
        <div
          id="achievement-count"
          className="w-full h-full p-4 border-2 border-stone-200 rounded-md shadow-md"
        >
          <div className="font-bold text-xl">Achievements</div>
          <div className="h-full w-full flex flex-row gap-2 justify-center items-center pb-6">
            <PiSealWarningFill
              size={30}
              className="text-amber-500 drop-shadow-lg drop-shadow-amber-300"
            />
            Work in Progress
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 p-4 border-2 border-stone-200 rounded-md shadow-md">
        <div className="font-bold text-2xl">Active Challenges</div>
      </div>
    </div>
  );
}
