import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

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

    const extractedUsers: {
      username: string;
      first_name: string;
      last_name: string;
      password: string;
      level: string;
    }[] = XLSX.utils.sheet_to_json(worksheet);

    await prismapg.user.createMany({
      data: extractedUsers,
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
