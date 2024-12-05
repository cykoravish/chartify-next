import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Here you would typically upload the file to a storage service like AWS S3
    // For this example, we'll just simulate the upload and store metadata in MongoDB

    const client = await clientPromise;
    const db = client.db("podcast_analytics");

    if (!session?.user) {
      throw new Error("User is not logged in");
    }
    const podcastMetadata = {
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      userId: new ObjectId((session.user as { id: string }).id),
    };

    const result = await db.collection("podcasts").insertOne(podcastMetadata);

    return NextResponse.json({
      message: "Podcast uploaded successfully",
      podcastId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while uploading the podcast" },
      { status: 500 }
    );
  }
}
