"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { IoNotificationsSharp } from "react-icons/io5";
import { FcHome, FcPuzzle } from "react-icons/fc";
import { FaTrophy } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const pathname = usePathname();

  return (
    <div className="w-screen flex flex-row p-4 items-center justify-between">
      <Image width={180} height={180} src={Logo} alt="logo" />
      <div className="flex flex-row gap-12 justify-center items-center">
        <Link
          href="/home"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/home"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcHome height={10} width={10} />
          Home
        </Link>
        <Link
          href="/challenges"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/challenges"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcPuzzle height={10} width={10} />
          Challenges
        </Link>
        <Link
          href="/leaderboard"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/leaderboard"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FaTrophy height={10} width={10} className="text-yellow-500" />
          Leaderboard
        </Link>
      </div>
      <div className="flex flex-row gap-4 items-center justify-between">
        <Button className="hover:bg-blue-600">
          <IoNotificationsSharp size={30} className="text-white" />
        </Button>
        <Button className="bg-red-600">Logout</Button>
      </div>
    </div>
  );
}
