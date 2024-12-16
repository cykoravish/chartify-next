import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Analytics from "@/models/Analytics";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const analytics = await Analytics.findOneAndUpdate(
      { podcast: params.id },
      { $inc: { 'geographicalData.$[elem].count': 1 } },
      { 
        new: true, 
        upsert: true,
        arrayFilters: [{ 'elem.country': 'Unknown' }]
      }
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error updating share count:", error);
    return NextResponse.json(
      { error: "Error updating share count" },
      { status: 500 }
    );
  }
}

