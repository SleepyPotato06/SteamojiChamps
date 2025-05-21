"use client";

import { Inter } from "next/font/google";
import UserCard from "@/components/user-card";
import { Button } from "@/components/ui/button";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function ManageUsers() {
  return (
    <div
      className={`${inter.className} w-fit h-full flex flex-col gap-4 justify-center items-center pb-6`}
    >
      <div className="w-fit h-fit flex flex-row gap-4 justify-center items-center">
        <input
          className="min-w-[35rem] min-h-[3rem] px-4 py-1 border-1 border-stone-200 rounded-lg shadow-lg text-md"
          placeholder="Search for a user..."
        />
        <Button className="bg-blue-600 hover:bg-blue-800">Add User</Button>
      </div>
      <div className="w-full flex flex-wrap gap-4 justify-center items-start">
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
        <UserCard
          name={"Suyash Aminhbavi"}
          level={"Junior"}
          coinsAchieved={1200}
          activeChallengeCount={10}
          achievementCount={3}
        />
      </div>
    </div>
  );
}
