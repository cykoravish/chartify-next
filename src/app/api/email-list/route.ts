import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("podcast_analytics")

    const users = await db.collection("users").find({}).project({
      email: 1,
      createdAt: 1
    }).sort({ createdAt: -1 }).limit(10).toArray()

    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      email: user.email,
      subscriptionDate: user.createdAt.toISOString().split('T')[0]
    }))

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

