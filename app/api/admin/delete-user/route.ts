"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validation
const deleteUserSchema = z.object({
  userId: z.string().cuid(),
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = deleteUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { userId } = parsed.data;

    await prismapg.user.delete({
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
    return NextResponse.json(
      { message: `Error deleting user: ${error}` },
      { status: 500 }
    );
  }
}
