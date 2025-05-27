"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const {
    challengeId,
    title,
    titleHex,
    titleIcon,
    tags,
    tagHex,
    coinsOffered,
    dueDate,
    description,
    reference,
    displayImage,
    imageAlt,
    platform,
    lockStatus,
    hints,
    buttonHex,
  } = await request.json();

  try {
    await prismapg.challenge.update({
      data: {
        title,
        titleHex,
        titleIcon,
        tags,
        tagHex,
        coinsOffered,
        description,
        dueDate,
        reference,
        displayImage,
        imageAlt,
        platform,
        lockStatus,
        hints,
        buttonHex,
      },
      where: {
        id: challengeId,
      },
    });

    const updatedChallenges = await prismapg.user.findMany();

    return NextResponse.json({ updatedChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating challeges: ${error}` },
      { status: 401 }
    );
  }
}
