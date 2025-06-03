"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validating the incoming request
const UpdateUserSchema = z.object({
  userId: z.string().cuid(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  level: z.enum([
    "Tinkerer",
    "Engineer",
    "Inventor",
    "Designer",
    "Crafter",
    "Builder",
    "Innovator",
  ]),
  totalCoinsAchieved: z
    .number()
    .nonnegative(`Coins must be a non-negative integer`),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, first_name, last_name, level, totalCoinsAchieved } =
      UpdateUserSchema.parse(body);

    await prismapg.user.update({
      data: {
        first_name,
        last_name,
        level,
        totalCoinsAchieved,
      },
      where: {
        id: userId,
      },
    });

    const updatedUsers = await prismapg.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        level: true,
        totalCoinsAchieved: true,
        role: true,
        achievements: true,
        userChallenges: true,
      },
    });

    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: `Error updating user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
