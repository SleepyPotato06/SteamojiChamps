"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/lib/UserContext";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  async function login(formData: FormData) {
    setError(null);
    setLoading(true);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Please ensure all fields are filled.");
      setLoading(false);
      return;
    }

    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        const user = result.user;

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
          setTimeout(() => router.push(`/home`), 1000);
        }

        if (user.role === "ADMIN") {
          setTimeout(() => router.push(`/admin/users`), 1000);
        }

        return "Login success!";
      }),
      {
        loading: "Logging in...",
        success: (msg) => msg,
        error: (err) => err.message || "Login failed",
      }
    );

    setLoading(false);
  }

  return (
    <>
      <div className="fixed inset-0 flex flex-col gap-2 items-center justify-center">
        <Image width={200} height={200} src={Logo} alt="logo" />
        <div className="flex flex-col p-8 rounded-md justify-center items-center gap-6 border-2 border-stone-100 drop-shadow-lg">
          <div>Please login here</div>
          <form action={login} className="flex flex-col gap-4">
            <Input
              onChange={() => setError(null)}
              type="text"
              name="username"
              placeholder="Username"
              className="min-w-[25rem] h-[3rem]"
            />
            <Input
              onChange={() => setError(null)}
              type="password"
              name="password"
              placeholder="Password"
              className="min-w-[25rem] h-[3rem]"
            />
            <div className="w-full text-sm flex justify-center items-center text-red-600">
              {error}
            </div>
            {loading ? (
              <Button className="hover:bg-blue-700 w-full h-[3rem] text-white flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in…
              </Button>
            ) : (
              <Button
                type="submit"
                className="hover:bg-blue-700 w-full h-[3rem]"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
