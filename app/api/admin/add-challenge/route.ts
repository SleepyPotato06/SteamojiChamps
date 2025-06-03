"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { challenge } = await request.json();

  console.log(challenge);

  try {
    await prismapg.challenge.create({
      data: {
        title: challenge.title,
        titleIcon: challenge.titleIcon,
        themeColor: challenge.themeColor,
        tags: challenge.tags,
        dueDate: challenge.dueDate,
        coinsOffered: challenge.coinsOffered,
        description: challenge.description,
        reference: challenge.reference,
        displayImage: challenge.displayImage,
        imageAlt: challenge.imageAlt,
        platform: challenge.platform,
        lockStatus: challenge.lockStatus,
        hints: challenge.hints,
      },
    });

    const updatedChallenges = await prismapg.challenge.findMany();

    return NextResponse.json({ updatedChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error adding user: ${error}` },
      { status: 401 }
    );
  }
}
