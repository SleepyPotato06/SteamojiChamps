"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const submissionSchema = z.object({
  userId: z.string().cuid(),
  registeredChallengeId: z.string().cuid(),
  solution: z.string().min(1, `Submission is required !`),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { userId, registeredChallengeId, solution } = parsed.data;

    // Input validation
    if (!userId || !registeredChallengeId || !solution) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Update user challenge submission
    await prismapg.userChallenge.update({
      data: {
        submission: solution,
        submissionDate: new Date(),
        submissionStatus: "Complete",
      },
      where: {
        id: registeredChallengeId,
      },
    });

    // Fetch updated list
    const updatedRegisteredChallenges = await prismapg.userChallenge.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        user: true,
        challengeId: true,
        challenge: true,
        isGraded: true,
        submission: true,
        submissionDate: true,
        submissionStatus: true,
      },
    });

    return NextResponse.json({ updatedRegisteredChallenges }, { status: 200 });
  } catch (error) {
    console.error("Error submitting solution:", error);

    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
