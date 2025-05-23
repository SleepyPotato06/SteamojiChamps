"use client";

import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaCoins, FaPuzzlePiece, FaTrophy } from "react-icons/fa";
import { UserCardProps } from "@/lib/definitions";

export default function UserCard({
  name,
  level,
  coinsAchieved,
  activeChallengeCount,
  achievementCount,
}: UserCardProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border-2 border-stone-200 rounded-lg items-center justify-between shadow-md">
      <div className="flex flex-col gap-4">
        <div id="heading" className="flex flex-row gap-6">
          <div id="name" className="text-lg">
            {name}
          </div>
          <div className="flex justify-center items-center px-2 py-0.5 border-2 border-yellow-500 bg-amber-100 text-xs rounded-2xl">
            {level}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between bg-yellow-50 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <FaCoins className="text-yellow-500" size={20} />
              <span className="text-sm">Coins Achieved</span>
            </div>
            <span className="font-medium">{coinsAchieved}</span>
          </div>
          <div className="flex items-center justify-between bg-emerald-50 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <FaTrophy className="text-emerald-600" size={20} />
              <span className="text-sm">Achievements</span>
            </div>
            <span className="font-medium">{achievementCount}</span>
          </div>
          <div className="flex items-center justify-between bg-blue-50 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <FaPuzzlePiece className="text-blue-600" size={20} />
              <span className="text-sm">Active Challenges</span>
            </div>
            <span className="font-medium">{activeChallengeCount}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-3 items-center justify-center">
        <button
          id="edit-btn"
          className="flex items-center justify-center w-1/2 bg-blue-600 px-2 py-1 border-2 border-blue-800 rounded-md"
        >
          <AiFillEdit size={25} className="text-white" />
        </button>
        <button
          id="delete-btn"
          className="flex items-center justify-center w-1/2 bg-red-600 px-2 py-1 border-2 border-red-800 rounded-md"
        >
          <MdDelete size={25} className="text-white" />
        </button>
      </div>
    </div>
  );
}
