"use server";

import prismapg from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: `Unauthorized` }, { status: 401 });
    }
    const challenges = await prismapg.challenge.findMany({
      where: {
        lockStatus: `active`,
      },
    });

    const registeredChallenges = await prismapg.userChallenge.findMany({
      where: {
        userId,
      },
      select: {
        challenge: {
          select: {
            id: true,
          },
        },
      },
    });

    // Get list of registered challenge IDs
    const registeredChallengeIds = registeredChallenges.map(
      (item) => item.challenge.id
    );

    // Filter out registered challenges
    const allUnregisteredChallenges = challenges.filter(
      (challenge) => !registeredChallengeIds.includes(challenge.id)
    );

    return NextResponse.json({ allUnregisteredChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
