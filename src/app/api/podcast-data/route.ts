import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db("podcast_analytics")

    // Fetch podcast data from MongoDB
    const totalListeners = await db.collection("listeners").countDocuments()
    const averageListenTime = await db.collection("listens").aggregate([
      { $group: { _id: null, avg: { $avg: "$duration" } } }
    ]).toArray()
    const topEpisode = await db.collection("episodes").findOne({}, { sort: { listens: -1 } })
    const listenerTrend = await db.collection("daily_listeners").find().sort({ date: 1 }).limit(30).toArray()
    const latestPodcast = await db.collection("podcasts").findOne({}, { sort: { uploadDate: -1 } })

    return NextResponse.json({
      totalListeners,
      averageListenTime: formatTime(averageListenTime[0]?.avg || 0),
      topEpisode: topEpisode?.title || "No episodes yet",
      listenerTrend: listenerTrend.map(item => ({
        date: item.date.toISOString().split('T')[0],
        listeners: item.count
      })),
      latestPodcast: latestPodcast ? {
        title: latestPodcast.filename,
        url: `/api/podcast/${latestPodcast._id}` // You'll need to implement this API route
      } : null
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while fetching podcast data" }, { status: 500 })
  }
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

