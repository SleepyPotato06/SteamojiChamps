import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(1),
  level: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("steamoji_users");

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

    const rawUsers = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);
    const validatedUsers = [];

    for (const rawUser of rawUsers) {
      const result = userSchema.safeParse(rawUser);
      if (!result.success) {
        return NextResponse.json(
          {
            message: "Invalid user data",
            errors: result.error.format(),
          },
          { status: 400 }
        );
      }

      validatedUsers.push(result.data);
    }

    await prismapg.user.createMany({
      data: validatedUsers,
    });

    const users = await prismapg.user.findMany({
      where: {
        role: "USER",
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error reading Excel file: ${error}` },
      { status: 500 }
    );
  }
}
