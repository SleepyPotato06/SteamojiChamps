"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define schema for input validation
const DeleteSchema = z.object({
  userChallengeId: z.string().min(1, "Registered Challenge ID is required"),
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { userChallengeId } = DeleteSchema.parse(body);

    // Delete challenge
    await prismapg.userChallenge.delete({
      where: { id: userChallengeId },
    });

    return NextResponse.json(
      { message: "Challenge deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Error deleting challenges:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
