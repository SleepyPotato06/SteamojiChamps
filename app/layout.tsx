import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { inter_md } from "@/lib/font";
import { UserProvider } from "@/lib/UserContext";

export const metadata: Metadata = {
  title: "Steamoji Hackathon",
  description: "Steamoji Hackathon 1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter_md.className}`}>
        <Toaster />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
