"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import {
  FcPortraitMode,
  FcPuzzle,
  FcStatistics,
  FcSettings,
} from "react-icons/fc";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-row p-4 items-center justify-between">
      <Image width={180} height={180} src={Logo} alt="logo" />
      <div className="flex flex-row gap-12 justify-center items-center">
        <Link
          href="/admin/users"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/users"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcPortraitMode height={10} width={10} />
          Users
        </Link>
        <Link
          href="/admin/challenges"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/challenges"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcPuzzle height={10} width={10} />
          Challenges
        </Link>
        <Link
          href="/admin/analytics"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/analytics"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcStatistics height={10} width={10} />
          Analytics
        </Link>
        <Link
          href="/admin/platform-settings"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/platform-settings"
              ? "px-3 py-1 bg-blue-600 text-white rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <FcSettings height={10} width={10} />
          Platform Settings
        </Link>
      </div>
      <Link href={`/`}>
        <Button className="bg-red-600">Logout</Button>
      </Link>
    </div>
  );
}
