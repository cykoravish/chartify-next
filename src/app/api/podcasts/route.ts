// export const config = {
//   api: {
//     responseLimit: false,
//   },
//   bodyParser: {
//     sizeLimit: "100mb",
//   },
// };

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Podcast from "@/models/Podcast";
import Analytics from "@/models/Analytics";
import { User } from "@/models/User";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    const base64File = Buffer.from(buffer).toString("base64");
    const dataURI = `data:${file.type};base64,${base64File}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "podcasts",
    });

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "Please Logout And Craeate new Account" }, { status: 401 });
    }

    // Create the podcast first
    const podcast = new Podcast({
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      fileUrl: uploadResponse.secure_url,
      fileId: uploadResponse.public_id,
      user: user._id,
    });

    await podcast.save();
 
    // Now create the analytics with the podcast reference
    const defaultAnalytics = new Analytics({
      podcast: podcast._id, // Set the podcast reference
      totalDownloads: 0,
      totalPlays: 0,
      totalShares:0,
      listenerDemographics: {
        age: {
          "18-24": 0,
          "25-34": 0,
          "35-44": 0,
          "45-54": 0,
          "55+": 0,
        },
        gender: {
          male: 0,
          female: 0,
          other: 0,
        },
      },
      geographicalData: [{ country: "Unknown", count: 0 }],
      listeningDuration: {
        total: 0,
        average: 0,
      },
      deviceInfo: [{ device: "Unknown", count: 0 }],
      platformInfo: [{ platform: "Unknown", count: 0 }],
    });

    await defaultAnalytics.save();
  
    // Update the podcast with the analytics reference
    podcast.analytics = defaultAnalytics._id;
    await podcast.save();

    user.podcasts.push(podcast._id);
    await user.save();

    return NextResponse.json(podcast);
  } catch (error) {
    console.error("Error creating podcast:", error);
    return NextResponse.json(
      { error: "Error creating podcast" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const user = await User.findOne({ email: session.user.email });

    const podcasts = await Podcast.find({ user: user._id }).populate(
      "analytics"
    );

    return NextResponse.json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { error: "Error fetching podcasts" },
      { status: 500 }
    );
  }
}
