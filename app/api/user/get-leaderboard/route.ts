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
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        totalCoinsAchieved: true,
        level: true,
        userChallenges: {
          select: {
            id: true, // Only include necessary fields
            submissionStatus: true,
          },
        },
      },
    });

    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
