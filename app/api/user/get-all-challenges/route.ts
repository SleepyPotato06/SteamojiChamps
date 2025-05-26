import prismapg from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const challenges = await prismapg.challenge.findMany();

    return NextResponse.json({ challenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error retrieving challenges: ${error}` },
      { status: 401 }
    );
  }
}
