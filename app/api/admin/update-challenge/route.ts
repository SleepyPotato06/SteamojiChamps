"use server";

import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { challenge } = await request.json();

  console.log(challenge);

  const id: string = challenge.id;
  const title: string = challenge.title;
  const themeColor: string = challenge.themeColor;
  const titleIcon: string = challenge.titleIcon;
  const tags: string[] = challenge.tags;
  const coinsOffered: number = challenge.coinsOffered;
  const description: string = challenge.description;
  const dueDate: Date = challenge.dueDate;
  const reference: { referenceDescription: string; referenceLink: string } =
    challenge.reference;
  const displayImage: string = challenge.displayImage;
  const imageAlt: string = challenge.imageAlt;
  const platform: string = challenge.platform;
  const lockStatus: string = challenge.lockStatus;
  const hints: string[] = challenge.hints;

  try {
    await prismapg.challenge.update({
      data: {
        title,
        themeColor,
        titleIcon,
        tags,
        coinsOffered,
        description,
        dueDate,
        reference,
        displayImage,
        imageAlt,
        platform,
        lockStatus,
        hints,
      },
      where: {
        id,
      },
    });

    const updatedChallenges = await prismapg.challenge.findMany();

    return NextResponse.json({ updatedChallenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating challeges: ${error}` },
      { status: 401 }
    );
  }
}
