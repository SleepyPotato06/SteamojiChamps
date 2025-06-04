import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST API CALLED!");
  return NextResponse.json({
    message: "Test API working",
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  console.log("TEST POST API CALLED!");
  return NextResponse.json({ message: "Test POST working" });
}
