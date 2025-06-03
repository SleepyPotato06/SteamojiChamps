"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validation
const deleteChallengeSchema = z.object({
  challengeId: z.string().cuid(),
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = deleteChallengeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { challengeId } = parsed.data;

    await prismapg.challenge.delete({
      where: { id: challengeId },
    });

    const allChallenges = await prismapg.challenge.findMany();

    return NextResponse.json({ allChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error deleting challenge: ${error}` },
      { status: 500 }
    );
  }
}
