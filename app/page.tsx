"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/lib/UserContext";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  async function login(formData: FormData) {
    setError(null);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Please ensure all fields are filled.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await res.json();
    const user = result.user[0];

    if (res.ok) {
      setUser({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        totalCoinsAchieved: user.totalCoinsAchieved,
        level: user.level,
        achievements: user.achievements,
        role: user.role,
        userChallenges: user.userChallenges,
      });

      if (user.role === "USER") {
        router.push(`/home`);
      }

      if (user.role === "ADMIN") {
        router.push(`/admin/users`);
      }
    } else {
      setError(result.message);
    }
  }
  return (
    <>
      <div className="fixed inset-0 flex flex-col gap-2 items-center justify-center">
        <Image width={200} height={200} src={Logo} alt="logo" />
        <div className="flex flex-col p-8 rounded-md justify-center items-center gap-6 border-2 border-stone-100 drop-shadow-lg">
          <div>Please login here</div>
          <form action={login} className="flex flex-col gap-4">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              className="min-w-[25rem] h-[3rem]"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="min-w-[25rem] h-[3rem]"
            />
            <div className="w-full flex justify-center items-center text-red-600">
              {error}
            </div>
            <Button type="submit" className="hover:bg-blue-700 w-full h-[3rem]">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
