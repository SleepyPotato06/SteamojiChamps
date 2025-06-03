"use client";

import { useEffect, useState } from "react";
import { FaTrophy, FaLock } from "react-icons/fa";
import { User, UserChallenge } from "@/lib/definitions";
import toast from "react-hot-toast";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  useEffect(() => {
    async function getLeaderboard() {
      const getLeaderboard = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-leaderboard`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Failed to load leaderboard");
        return res.json();
      });

      toast
        .promise(getLeaderboard, {
          loading: "Loading leaderboard...",
          success: "Leaderboard loaded!",
          error: "Could not load leaderboard.",
        })
        .then((result) => {
          setLeaderboard(result.leaderboard);
        });
    }

    getLeaderboard();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row  text-white bg-blue-700 p-3 rounded-tl-md rounded-tr-md font-medium">
        <div className="min-w-[5rem] flex items-center justify-center">
          Rank
        </div>
        <div className="min-w-[20rem] flex items-center justify-center">
          Name
        </div>
        <div className="min-w-[15rem] flex items-center justify-center">
          Challenges Complete
        </div>
        <div className="min-w-[10rem] flex items-center justify-center">
          Coins Earned
        </div>
        <div className="min-w-[10rem] flex items-center justify-center">
          Total Achievements
        </div>
      </div>
      {leaderboard.map((user: User, index: number) => (
        <div
          key={user.id}
          className="flex flex-row border-b-2 border-l-2 border-r-2 border=stone-200 text-black bg-white p-3"
        >
          <div className="min-w-[5rem] flex justify-center items-center">
            {index === 0 ? (
              <FaTrophy
                size={20}
                className="text-yellow-400 drop-shadow-md drop-shadow-amber-300"
              />
            ) : index === 1 ? (
              <FaTrophy
                size={20}
                className="text-gray-500 drop-shadow-md drop-shadow-gray-300"
              />
            ) : index === 2 ? (
              <FaTrophy
                size={20}
                className="text-yellow-800 drop-shadow-md drop-shadow-yellow-900"
              />
            ) : (
              <div className="w-fit px-2 py-0.1 flex items-center border-2 border-amber-500 bg-amber-100 rounded-4xl">
                {index + 1}
              </div>
            )}
          </div>
          <div className="min-w-[20rem] flex flex-row justify-center items-center gap-2">
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
          </div>
          <div className="min-w-[15rem] flex items-center justify-center">
            {
              user.userChallenges.filter(
                (userChallenge: UserChallenge) =>
                  userChallenge.submissionStatus === `Complete`
              ).length
            }
          </div>
          <div className="min-w-[10rem] flex items-center justify-center">
            {user.totalCoinsAchieved}
          </div>
          <div className="min-w-[10rem] flex items-center justify-center">
            <FaLock size={20} className="text-blue-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
