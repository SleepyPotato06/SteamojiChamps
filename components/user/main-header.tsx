"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-row p-4 items-center justify-between">
      <Image width={180} height={180} src={Logo} alt="logo" />
      <div className="flex flex-row gap-12 justify-center items-center">
        <Link
          href="/home"
          className={`flex flex-row gap-2 text-md items-center justify-center ${
            pathname === "/home"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FaHome height={10} width={10} />
          Home
        </Link>
        <Link
          href="/challenges"
          className={`flex flex-row gap-2 text-md items-center justify-center ${
            pathname === "/challenges"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <IoExtensionPuzzle height={10} width={10} />
          Challenges
        </Link>
        <Link
          href="/leaderboard"
          className={`flex flex-row gap-2 text-md items-center justify-center ${
            pathname === "/leaderboard"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <GiTrophy height={10} width={10} />
          Leaderboard
        </Link>
      </div>
      <Link href={`/`}>
        <Button className="bg-red-600">Logout</Button>
      </Link>
    </div>
  );
}
