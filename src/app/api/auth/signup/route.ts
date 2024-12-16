import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    const randomNumber = Math.floor(Math.random() * 100);
    const gender = Math.random() < 0.5 ? "men" : "women";
    const image = `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      image,
    });

    await user.save();

    return NextResponse.json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
