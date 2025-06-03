"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema to validate request payload
const AwardPointsSchema = z.object({
  userId: z.string().cuid(),
  submissionId: z.string().cuid(),
  points: z.number().int().min(0, "Points must be a non-negative integer"),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, submissionId, points } = AwardPointsSchema.parse(body);

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
      { message: `Points awarded successfully!` },
      { status: 200 }
    );
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
