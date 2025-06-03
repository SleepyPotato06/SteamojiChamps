"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validation
const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const { username, password } = LoginSchema.parse(body);

    // Find user by username
    const user = await prismapg.user.findUnique({
      where: { username, password },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        totalCoinsAchieved: true,
        achievements: true,
        role: true,
        userChallenges: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    console.log(user);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
