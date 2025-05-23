import MainHeader from "@/components/main-header";
import { inter_md } from "@/lib/font";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter_md.className}`}>
      <MainHeader />
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
}
