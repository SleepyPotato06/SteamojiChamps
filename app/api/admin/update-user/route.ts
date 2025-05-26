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

    return NextResponse.json(
      { message: `User updated successfully !` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating user: ${error}` },
      { status: 401 }
    );
  }
}
