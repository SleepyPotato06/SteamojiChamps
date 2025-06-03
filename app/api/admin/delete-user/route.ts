"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { userId } = await request.json();

  try {
    await prismapg.user.delete({
      where: {
        id: userId,
      },
    });

    const updatedUsers = await prismapg.user.findMany({
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

    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error deleting users: ${error}` },
      { status: 401 }
    );
  }
}
