import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("steamoji_challenges");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rawExtractedChallenges: {
      title: string;
      themeColor: string;
      titleIcon: string;
      tags: string;
      dueDate: Date;
      coinsOffered: number;
      description: string;
      referenceDescription: string;
      referenceLink: string;
      displayImage: string;
      imageAlt: string;
      platform: string;
      lockStatus: string;
      hints: string[];
    }[] = XLSX.utils.sheet_to_json(worksheet);

    const extractedChallenges = rawExtractedChallenges.map(
      (rawExtractedChallenge) => {
        return {
          ...rawExtractedChallenge,
          reference: {
            referenceDescription: rawExtractedChallenge.referenceDescription,
            referenceLink: rawExtractedChallenge.referenceLink,
          },
          tags: rawExtractedChallenge.tags.split(","),
        };
      }
    );

    await prismapg.challenge.createMany({
      data: extractedChallenges,
    });

    const challenges = await prismapg.challenge.findMany();

    return NextResponse.json({ challenges }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error reading Excel file: ${error}` },
      { status: 500 }
    );
  }
}
