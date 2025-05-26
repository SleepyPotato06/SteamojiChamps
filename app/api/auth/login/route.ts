import prismapg from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return (
      NextResponse.json({
        message: "Please ensure all fields are filled",
      }),
      { status: 400 }
    );
  }

  try {
    const user = await prismapg.user.findMany({
      where: {
        username: username,
        password: password,
      },
    });

    console.log(user);

    if (user.length !== 0) {
      return NextResponse.json({ user }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Failed to login. Try again !" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error:  " + error,
      },
      { status: 500 }
    );
  }
}
