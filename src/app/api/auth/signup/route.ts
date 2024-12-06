import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hash } from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    const client = await clientPromise
    const db = client.db("podcast_analytics")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({ message: "User created successfully", userId: result.insertedId })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 })
  }
}

