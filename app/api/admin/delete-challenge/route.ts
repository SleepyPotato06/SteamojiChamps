"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { challengeId } = await request.json();

  try {
    await prismapg.challenge.delete({
      where: {
        id: challengeId,
      },
    });

    const allChallenges = await prismapg.challenge.findMany({});

    return NextResponse.json({ allChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error deleting challenge: ${error}` },
      { status: 401 }
    );
  }
}
