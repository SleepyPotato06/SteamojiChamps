"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define Zod schema for request body
const requestSchema = z.object({
  userId: z.string().cuid(), // assumes userId is a UUID string
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = requestSchema.parse(body);

    const registeredChallenges = await prismapg.userChallenge.findMany({
      where: { userId },
      select: {
        id: true,
        submissionStatus: true,
        isGraded: true,
        challenge: true,
      },
    });

    return NextResponse.json({ registeredChallenges }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? "Invalid request format"
        : error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      { message: `Error retrieving challenges: ${message}` },
      { status: 400 }
    );
  }
}
