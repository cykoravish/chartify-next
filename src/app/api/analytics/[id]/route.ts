import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Analytics from "@/models/Analytics";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const analytics = await Analytics.findOne({ podcast: params.id });

    if (!analytics) {
      return NextResponse.json({ error: "Analytics not found" }, { status: 404 });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics" },
      { status: 500 }
    );
  }
}

