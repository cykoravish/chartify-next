import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const client = await clientPromise
    const db = client.db("podcast_analytics")

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const result = await db.collection("users").insertOne({ 
      email, 
      createdAt: new Date() 
    })

    return NextResponse.json({ message: "User registered successfully", userId: result.insertedId })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 })
  }
}

