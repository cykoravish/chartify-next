import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Analytics from "@/models/Analytics";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const analytics = await Analytics.findOneAndUpdate(
      { podcast: params.id },
      { $inc: { totalPlays: 1 } },
      { new: true, upsert: true }
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error updating play count:", error);
    return NextResponse.json(
      { error: "Error updating play count" },
      { status: 500 }
    );
  }
}

