"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { userId, first_name, last_name, level } = await request.json();

  try {
    await prismapg.user.update({
      data: {
        first_name,
        last_name,
        level,
      },
      where: {
        id: userId,
      },
    });

    const updatedUsers = await prismapg.user.findMany({
      where: { role: "USER" },
    });

    return NextResponse.json({ updatedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating user: ${error}` },
      { status: 401 }
    );
  }
}
