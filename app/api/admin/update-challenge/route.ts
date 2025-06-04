"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for the challenge
const ChallengeSchema = z.object({
  id: z.string().cuid(),
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const challenge = ChallengeSchema.parse(body.challenge);

    console.log(challenge);

    await prismapg.challenge.update({
      data: {
        title: challenge.title,
        themeColor: challenge.themeColor,
        titleIcon: challenge.titleIcon,
        tags: challenge.tags,
        coinsOffered: challenge.coinsOffered,
        description: challenge.description,
        dueDate: challenge.dueDate,
        reference: challenge.reference,
        displayImage: challenge.displayImage,
        imageAlt: challenge.imageAlt,
        platform: challenge.platform,
        lockStatus: challenge.lockStatus,
        hints: challenge.hints,
      },
      where: {
        id: challenge.id,
      },
    });

    const updatedChallenges = await prismapg.challenge.findMany();

    return NextResponse.json({ updatedChallenges }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: `Error updating challenges: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
