"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ChallengeIdSchema = z.object({
  challengeId: z.string().cuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { challengeId } = ChallengeIdSchema.parse(body);

    const submissions = await prismapg.userChallenge.findMany({
      where: {
        challengeId,
      },
      select: {
        id: true,
        userId: true,
        user: true,
        challengeId: true,
        challenge: true,
        isGraded: true,
        submissionStatus: true,
        submission: true,
        submissionDate: true,
      },
    });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: `Internal server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
