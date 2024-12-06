import { error } from "console";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Initialize the MongoClient instance
const uri = process.env.MONGODB_URI as string; // Ensure this is defined in .env.local file
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    console.log("Incoming request:", req.url);
    const body = await req.json();

    if (!body.slug || !body.name) {
      console.error("Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db("timeliner");
    const collection = db.collection("companies");

    // Check if company with the same name or slug already exists in the database
    const existingCompanyName = await collection.findOne({ name: body.name });
    const existingSlug = await collection.findOne({ slug: body.slug });
    if (existingCompanyName || existingSlug) {
      return NextResponse.json(
        {
          message: "Company with this name already exists!",
        },
        {
          status: 409,
        }
      );
    }

    console.log(`Inserting company with slug: ${body.slug}`);
    const result = await collection.insertOne(body);

    console.log("Company inserted:", result);
    return NextResponse.json({ message: "Company added successfully" });
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    console.log("Closing MongoDB connection...");
    await client.close();
  }
}
