"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/lib/UserContext";

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
        achievements: user.achievements,
        role: user.role,
        userChallenges: user.userChallenges,
      });

      router.push(`/home`);
    } else {
      setError(result.message);
    }
  }
  return (
    <>
      <Header />
      <div className="w-full mt-[10rem] px-[35rem] flex flex-col gap-4 items-center justify-center">
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
