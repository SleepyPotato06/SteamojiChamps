"use server";

import prismapg from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await prismapg.user.findMany({
      take: 10,
      where: {
        role: "USER",
      },
      orderBy: {
        totalCoinsAchieved: "desc",
      },
      select: {
        userChallenges: true,
        totalCoinsAchieved: true,
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        level: true,
      },
    });

    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}
