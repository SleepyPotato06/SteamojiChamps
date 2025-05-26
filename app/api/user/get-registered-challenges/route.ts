"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const registeredChallenges = await prismapg.userChallenge.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        submissionStatus: true,
        challenge: true,
      },
    });

    return NextResponse.json({ registeredChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error retrieving challenges: ${error}` },
      { status: 401 }
    );
  }
}
