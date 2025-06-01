import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { challengeId } = await request.json();

  if (challengeId === undefined) {
    return NextResponse.json(
      { message: `Undefined challenge Id cannot be process !` },
      { status: 401 }
    );
  }

  try {
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
        submissionStatus: true,
        submission: true,
        submissionDate: true,
      },
    });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
