import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Podcast from "@/models/Podcast";
import { User } from "@/models/User";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const podcastId =  params.id;

  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  await dbConnect();

  try {
    const podcast = await Podcast.findById(podcastId).populate("user").populate("analytics");

    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }
    console.log("populated user podcast: ", podcast);
    return NextResponse.json(podcast);
  } catch (error) {
    console.error("Error fetching podcast:", error);
    return NextResponse.json(
      { error: "Error fetching podcast" },
      { status: 500 }
    );
  }
}
