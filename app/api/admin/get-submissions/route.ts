import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { challengeId } = await request.json();

  console.log(challengeId);

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
        userId: true,
        user: true,
        submissionStatus: true,
      },
    });

    console.log(submissions);

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
