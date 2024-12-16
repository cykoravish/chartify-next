import { NextRequest, NextResponse } from "next/server";
import EarlyUser from "@/models/EarlyUserModel";
import dbConnect from "@/lib/dbConnect";
import { unstable_noStore as noStore } from "next/cache";

export async function POST(req: NextRequest, res: NextResponse) {
  noStore();
  await dbConnect();
  try {
    const { name, email } = await req.json();

    const randomNumber = Math.floor(Math.random() * 100);
    const gender = Math.random() < 0.5 ? "men" : "women";
    const image = `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;

    const existingUser = await EarlyUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already in waiting list" },
        { status: 400 }
      );
    }

    const result = await EarlyUser.create({ name, email, image });

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

export async function GET() {
  await dbConnect();

  try {
    const users = await EarlyUser.find({}).sort({ createdAt: -1 }).limit(10);
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      image: user.photo,
      subscriptionDate: user.createdAt.toISOString().split("T")[0],
    }));
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
