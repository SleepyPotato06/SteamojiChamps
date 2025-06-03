"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { user } = await request.json();

  try {
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
      { status: 401 }
    );
  }
}
