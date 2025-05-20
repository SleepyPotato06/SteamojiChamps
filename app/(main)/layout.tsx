import MainHeader from "@/components/main-header";
import { Inter } from 'next/font/google'

const inter = Inter({weight: "400", subsets: ['latin']})

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <MainHeader />
        <div className="w-full flex justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
