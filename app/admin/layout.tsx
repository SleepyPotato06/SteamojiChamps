import AdminHeader from "@/components/admin-header";
import { inter_md } from "@/lib/font";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter_md.className}`}>
      <AdminHeader />
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
}
