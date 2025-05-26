"use client";

import { FaLock } from "react-icons/fa";
import { inter_md } from "@/lib/font";
import { useUser } from "@/lib/UserContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DisplayRegisteredChallenges from "@/components/display-registered-challenges";

export default function Home() {
  const { user } = useUser();

  return (
    <div
      className={`${inter_md.className} w-full px-6 flex flex-col gap-4 justify-center items-center`}
    >
      <div className="w-full flex flex-row gap-4 items-center">
        <Card
          id="user-details"
          className="w-full h-full flex justify-center items-center font-bold text-4xl"
        >
          <div>
            👋Hello,{" "}
            <span className="bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-700 text-transparent bg-clip-text">
              {user?.first_name}
            </span>
          </div>
        </Card>
        <Card id="coins-achieved" className="w-full h-full p-4">
          <div>
            <CardTitle className="text-xl">Coins Achieved</CardTitle>
          </div>
          <CardContent className="w-full h-full flex justify-center items-center font-bold text-7xl bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-700 text-transparent bg-clip-text">
            {user?.totalCoinsAchieved}
          </CardContent>
        </Card>
        <Card id="achievements" className="w-full h-full p-4">
          <div>
            <CardTitle className="text-xl">Achievements</CardTitle>
          </div>
          <CardContent className="h-full w-full flex justify-center items-center">
            <FaLock size={30} className="text-blue-800" />
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-4 py-4">
        <div className="text-2xl underline underline-2 underline-offset-4 decoration-blue-500">
          Registered Challenges
        </div>
        <DisplayRegisteredChallenges />
      </div>
    </div>
  );
}
