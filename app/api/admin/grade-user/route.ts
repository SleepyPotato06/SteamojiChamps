import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { userId, submissionId, points } = await request.json();

  if (
    submissionId === undefined ||
    userId === undefined ||
    points === undefined
  ) {
    return NextResponse.json(
      { message: `Undefined Submission Id cannot be processed !` },
      { status: 401 }
    );
  }

  try {
    await prismapg.$transaction([
      prismapg.userChallenge.update({
        data: {
          isGraded: true,
          pointsAwareded: points,
        },
        where: {
          id: submissionId,
        },
      }),
      prismapg.user.update({
        data: {
          totalCoinsAchieved: {
            increment: points,
          },
        },
        where: {
          id: userId,
        },
      }),
    ]);

    return NextResponse.json(
      { message: `Points awareded successfully !` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
