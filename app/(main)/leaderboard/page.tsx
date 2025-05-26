"use client";

import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { User } from "@/lib/definitions";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  useEffect(() => {
    async function getLeaderboard() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-leaderboard`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setLeaderboard(result.leaderboard);
      }
    }

    getLeaderboard();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row  text-white bg-blue-700 p-3 rounded-tl-md rounded-tr-md font-medium">
        <div className="min-w-[5rem]">Rank</div>
        <div className="min-w-[20rem]">Name</div>
        <div className="min-w-[15rem]">Challenges Complete</div>
        <div className="min-w-[10rem]">Coins Earned</div>
        <div className="min-w-[10rem]">Total Achievements</div>
      </div>
      {leaderboard.map((user: User, index: number) => (
        <div
          key={user.id}
          className="flex flex-row border-b-2 border-l-2 border-r-2 border=stone-200 text-black bg-white p-3"
        >
          <div className="min-w-[5rem]">
            {index === 0 ? (
              <FaTrophy size={20} className="text-yellow-400" />
            ) : index === 1 ? (
              <FaTrophy size={20} className="text-gray-500" />
            ) : index === 2 ? (
              <FaTrophy size={20} className="text-yellow-800" />
            ) : (
              <div className="w-fit px-2 py-0.1 flex items-center border-2 border-amber-500 bg-amber-100 rounded-4xl">
                {index + 1}
              </div>
            )}
          </div>
          <div className="min-w-[20rem] flex flex-row gap-2">
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
          </div>
          <div className="min-w-[15rem]">{user.achievements.length}</div>
          <div className="min-w-[10rem]">{user.totalCoinsAchieved}</div>
          <div className="min-w-[10rem]">{user.achievements.length}</div>
        </div>
      ))}
    </div>
  );
}
