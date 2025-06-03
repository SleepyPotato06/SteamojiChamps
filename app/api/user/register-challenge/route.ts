"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define schema
const RegisterSchema = z.object({
  userId: z.string().cuid(), // or .string() if you're not using UUIDs
  challengeId: z.string().cuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { userId, challengeId } = parsed.data;

    const existingEntry = await prismapg.userChallenge.findFirst({
      where: { userId, challengeId },
    });

    if (existingEntry) {
      return NextResponse.json(
        { message: "Challenge already registered." },
        { status: 409 }
      );
    }

    await prismapg.userChallenge.create({
      data: { userId, challengeId },
    });

    return NextResponse.json(
      { message: "Challenge registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering challenge:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
