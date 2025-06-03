import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { z } from "zod";

const challengeSchema = z.object({
  title: z.string().min(1),
  themeColor: z.string().min(1),
  titleIcon: z.string().min(1),
  tags: z.string().min(1),
  dueDate: z.coerce.date(),
  coinsOffered: z.coerce.number(),
  description: z.string().min(1),
  referenceDescription: z.string().optional(),
  referenceLink: z.string().url().optional(),
  displayImage: z.string().url().optional(),
  imageAlt: z.string().optional(),
  platform: z.string().min(1),
  lockStatus: z.string().min(1),
  hints: z.union([z.string(), z.array(z.string())]),
});

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

    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

    const parsedChallenges = [];

    for (const raw of rawRows) {
      const result = challengeSchema.safeParse(raw);
      if (!result.success) {
        return NextResponse.json(
          { message: "Invalid challenge data", errors: result.error.format() },
          { status: 400 }
        );
      }

      const valid = result.data;

      parsedChallenges.push({
        title: valid.title,
        themeColor: valid.themeColor,
        titleIcon: valid.titleIcon,
        tags: valid.tags.split(",").map((t) => t.trim()),
        dueDate: valid.dueDate,
        coinsOffered: valid.coinsOffered,
        description: valid.description,
        reference: {
          referenceDescription: valid.referenceDescription ?? "",
          referenceLink: valid.referenceLink ?? "",
        },
        displayImage: valid.displayImage ?? "",
        imageAlt: valid.imageAlt ?? "",
        platform: valid.platform,
        lockStatus: valid.lockStatus,
        hints: typeof valid.hints === "string" ? [valid.hints] : valid.hints,
      });
    }

    await prismapg.challenge.createMany({
      data: parsedChallenges,
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
