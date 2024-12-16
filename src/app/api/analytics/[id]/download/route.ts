import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Analytics from "@/models/Analytics";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const analytics = await Analytics.findOneAndUpdate(
      { podcast: params.id },
      { $inc: { totalDownloads: 1 } },
      { new: true }
    );

    if (!analytics) {
      return NextResponse.json(
        { error: "Analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error updating download count:", error);
    return NextResponse.json(
      { error: "Error updating download count" },
      { status: 500 }
    );
  }
}
