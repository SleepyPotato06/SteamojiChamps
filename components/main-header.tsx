"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { IoNotificationsSharp } from "react-icons/io5";
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
          className={`${
            pathname === "/home"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          Home
        </Link>
        <Link
          href="/challenges"
          className={`${
            pathname === "/challenges"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          Challenges
        </Link>
        <Link
          href="/leaderboard"
          className={`${
            pathname === "/leaderboard"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
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
