"use client";

import AdminHeader from "@/components/admin-header";
import { inter_md } from "@/lib/font";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/lib/UserContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  return (
    <div className={`${inter_md.className}`}>
      <AdminHeader />
      <div className="w-full flex justify-center">
        {user !== null && user.role === "ADMIN" ? (
          children
        ) : (
          <div>Unauthorized user. Please login with an admin account</div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
