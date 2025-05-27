"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, first_name, last_name, level, password } =
    await request.json();

  try {
    await prismapg.user.create({
      data: {
        username,
        first_name,
        last_name,
        level,
        password,
      },
    });

    const updatedUsers = await prismapg.user.findMany({
      where: {
        role: "USER",
      },
    });

    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error adding user: ${error}` },
      { status: 401 }
    );
  }
}
