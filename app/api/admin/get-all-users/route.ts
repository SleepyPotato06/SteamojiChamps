"use server";

import prismapg from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allUsers = await prismapg.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        level: true,
        totalCoinsAchieved: true,
        role: true,
        achievements: true,
        userChallenges: true,
      },
    });

    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error retrieving users: ${error}` },
      { status: 401 }
    );
  }
}
