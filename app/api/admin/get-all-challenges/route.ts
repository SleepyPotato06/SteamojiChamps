"use server";

import prismapg from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allChallenges = await prismapg.challenge.findMany({});

    return NextResponse.json({ allChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error retrieving users: ${error}` },
      { status: 401 }
    );
  }
}
