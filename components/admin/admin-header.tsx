"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoExtensionPuzzle } from "react-icons/io5";
import { IoMdAnalytics } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
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
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <RiUserSettingsFill height={10} width={10} />
          Users
        </Link>
        <Link
          href="/admin/challenges"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/challenges"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <IoExtensionPuzzle height={10} width={10} />
          Challenges
        </Link>
        <Link
          href="/admin/analytics"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/analytics"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <IoMdAnalytics height={10} width={10} />
          Analytics
        </Link>
        <Link
          href="/admin/platform-settings"
          className={`flex flex-row gap-2 items-center justify-center ${
            pathname === "/admin/platform-settings"
              ? "px-3 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 rounded-2xl"
              : "hover:font-bold"
          }`}
        >
          <IoSettings height={10} width={10} />
          Platform Settings
        </Link>
      </div>
      <Link href={`/`}>
        <Button className="bg-red-600">Logout</Button>
      </Link>
    </div>
  );
}
