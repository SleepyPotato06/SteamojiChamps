import { NextResponse } from "next/server";
import prismapg from "@/lib/prisma";

// Remove or change runtime to nodejs if you had `edge` before
// export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();

  try {
    const result = await prismapg.challenge.updateMany({
      where: {
        dueDate: { lt: now },
        lockStatus: { not: "inactive" },
      },
      data: {
        lockStatus: "inactive",
      },
    });

    return NextResponse.json({
      message: "Expired challenges updated",
      updatedCount: result.count,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update challenges: " + err },
      { status: 500 }
    );
  }
}
