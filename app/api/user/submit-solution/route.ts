import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { userId, registeredChallengeId, solution } = await request.json();

  const currentDate = new Date(Date.now());

  try {
    await prismapg.userChallenge.update({
      data: {
        submission: solution,
        submissionDate: currentDate,
        submissionStatus: `Complete`,
      },
      where: {
        id: registeredChallengeId,
      },
    });

    const updatedRegisteredChallenges = await prismapg.userChallenge.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        user: true,
        challengeId: true,
        challenge: true,
        submission: true,
        submissionDate: true,
        submissionStatus: true,
      },
    });

    return NextResponse.json({ updatedRegisteredChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
