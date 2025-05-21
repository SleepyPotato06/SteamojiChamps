import AdminHeader from "@/components/admin-header";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AdminHeader />
        <div className="w-full flex justify-center">{children}</div>
      </body>
    </html>
  );
}
