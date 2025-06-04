"use server";

import { Challenge, UserChallenge } from "@/lib/definitions";
import prismapg from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Input schema
const Schema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = Schema.parse(body);

    // Fetch active challenges
    const activeChallenges = await prismapg.challenge.findMany({
      where: { lockStatus: "active" },
    });

    // Fetch IDs of challenges the user is already registered for
    const registeredChallengeIds = await prismapg.userChallenge
      .findMany({
        where: { userId },
        select: { challengeId: true },
      })
      .then((list: { challengeId: string }[]) =>
        list.map((uc: { challengeId: string }) => uc.challengeId)
      );

    // Filter out already registered challenges
    const unregisteredChallenges = activeChallenges.filter(
      (challenge: { id: string }) =>
        !registeredChallengeIds.includes(challenge.id)
    );

    return NextResponse.json({ unregisteredChallenges }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error fetching unregistered challenges:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
