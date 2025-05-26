import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { challengeId, userId } = await request.json();

  try {
    const challenge = await prismapg.userChallenge.findMany({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
    });

    if (challenge.length === 0) {
      await prismapg.userChallenge.create({
        data: {
          userId,
          challengeId,
        },
      });

      return NextResponse.json(
        { message: "Challenge registered successfully !" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Challenge already registered !" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
