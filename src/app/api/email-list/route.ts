import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import EarlyUser from "@/lib/EarlyUserModel";

export async function GET() {
  await dbConnect(); // Ensure the database connection is established

  try {
    // Fetch all users, sorted by creation date in descending order
    const users = await EarlyUser.find({})
      .select("email createdAt") // Select specific fields
      .sort({ createdAt: -1 }) // Sort by `createdAt` descending
      .limit(10); // Limit the number of results to 10

    // Format the data as needed
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      subscriptionDate: user.createdAt.toISOString().split("T")[0],
    }));

    // Return the formatted users
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Optional revalidation and dynamic behavior
export const dynamic = "force-dynamic";
export const revalidate = 0;
