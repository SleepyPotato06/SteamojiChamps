import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  try {
    const achievements = await prismapg.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        achievements: true,
      },
    });

    return NextResponse.json({ achievements }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
