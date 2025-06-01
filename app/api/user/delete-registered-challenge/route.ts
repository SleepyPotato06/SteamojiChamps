"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { userChallengeId } = await request.json();

  try {
    await prismapg.userChallenge.delete({
      where: {
        id: userChallengeId,
      },
    });

    return NextResponse.json(
      { message: "Challenge deleted successfully !" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error deleting challenge: ${error}` },
      { status: 401 }
    );
  }
}
