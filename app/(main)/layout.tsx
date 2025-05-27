"use client";

import MainHeader from "@/components/user/main-header";
import { inter_md } from "@/lib/font";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/lib/UserContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  return (
    <div className={`${inter_md.className}`}>
      <MainHeader />
      <div className="w-full flex justify-center px-4 pb-4">
        {user !== null ? children : <div>Unauthorized. Please login !</div>}
      </div>
      <Toaster />
    </div>
  );
}
