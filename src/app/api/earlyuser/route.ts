import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import EarlyUser from "@/lib/EarlyUserModel";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    const { email } = await req.json();
    console.log(email);

    const existingUser = await EarlyUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already in waiting list" },
        { status: 400 }
      );
    }
    const result = await EarlyUser.create({ email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while registering the user in waiting list" },
      { status: 500 }
    );
  }
}
