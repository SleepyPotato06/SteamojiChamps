"use client";

import { FaTree } from "react-icons/fa";
import JungleAdventure from "@/public/ja.png";
import { Inter } from "next/font/google";
import { PiSealWarningFill } from "react-icons/pi";
import ActiveChallengeCard from "@/components/active-challenge-card";

const inter = Inter({ weight: "400", subsets: ["latin"] });
export default function Home() {
  return (
    <div
      className={`${inter.className} w-full px-6 flex flex-col gap-4 justify-center items-center`}
    >
      <div className="w-full flex flex-row gap-4 items-center">
        <div
          id="user-details"
          className="w-full h-full flex flex-col justify-center items-center font-bold text-5xl gap-4 p-4 border-2 border-stone-200 rounded-md shadow-lg"
        >
          <div>
            👋Hello,{" "}
            <span className="bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-700 text-transparent bg-clip-text">
              Suyash
            </span>
          </div>
        </div>
        <div
          id="coins-achieved"
          className="w-full h-full p-4 border-2 border-stone-200 rounded-md"
        >
          <div className="font-bold text-xl">Coins Achieved</div>
          <div className="w-full h-full text-blue-800 pb-6 flex justify-center items-center text-8xl">
            1200
          </div>
        </div>
        <div
          id="achievement-count"
          className="w-full h-full p-4 border-2 border-stone-200 rounded-md"
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
      <div className="w-full flex flex-col gap-2 p-4 border-2 border-stone-200 rounded-md shadow-lg">
        <div className="font-bold text-2xl">Active Challenges</div>
        <div className="flex flex-wrap gap-2">
          <ActiveChallengeCard
            title={`Jungle Adventure`}
            titleIcon={FaTree}
            titleHex="text-green-800"
            dueDate="22nd May 3:00 PM"
            coinsOffered={50}
            displayImage={JungleAdventure}
            imageAlt="jungle_adventure_img"
          />
        </div>
      </div>
    </div>
  );
}
