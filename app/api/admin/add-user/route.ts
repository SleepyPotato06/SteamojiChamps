"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  username: z.string().min(2, `Username is required`),
  first_name: z.string().min(1, `First Name is required`),
  last_name: z.string().min(1, `Last Name is required`),
  level: z.enum([
    "Tinkerer",
    "Engineer",
    "Inventor",
    "Designer",
    "Crafter",
    "Builder",
    "Innovator",
  ]),
  password: z.string().min(1, `Password is required`),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = createUserSchema.safeParse(body.user);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid user data", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const user = parsed.data;

    await prismapg.user.create({
      data: {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        level: user.level,
        password: user.password,
      },
    });

    const updatedUsers = await prismapg.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        totalCoinsAchieved: true,
        role: true,
        level: true,
        achievements: true,
        userChallenges: true,
      },
    });

    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error adding user: ${error}` },
      { status: 500 }
    );
  }
}
