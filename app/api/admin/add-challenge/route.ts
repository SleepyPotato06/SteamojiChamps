"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validating challenge data
const challengeSchema = z.object({
  title: z.string(),
  titleIcon: z.string(),
  themeColor: z.string(),
  tags: z.array(z.string()),
  dueDate: z.coerce.date(),
  coinsOffered: z.number(),
  description: z.string(),
  reference: z.object({
    referenceLink: z.string().url(),
    referenceDescription: z.string(),
  }),
  displayImage: z.string().url(),
  imageAlt: z.string(),
  platform: z.string(),
  lockStatus: z.enum(["active", "inactive"]),
  hints: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  try {
    const { challenge } = await request.json();

    const parsed = challengeSchema.safeParse(challenge);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid challenge data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const validatedChallenge = parsed.data;

    await prismapg.challenge.create({
      data: validatedChallenge,
    });

    const updatedChallenges = await prismapg.challenge.findMany();

    return NextResponse.json({ updatedChallenges }, { status: 200 });
  } catch (error) {
    console.error("Error creating challenge:", error);
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
