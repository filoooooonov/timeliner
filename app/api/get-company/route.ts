import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Initialize the MongoClient instance
const uri = process.env.MONGODB_URI as string; // Ensure this is defined in your .env.local file
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    console.log("Incoming request:", req.url);
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    const slug = searchParams.get("_slug");

    if (!slug) {
      console.error("Missing _slug parameter");
      return NextResponse.json(
        { error: "Missing _slug parameter" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db("timeliner");
    const collection = db.collection("companies");

    console.log(`Searching for company with _slug: ${slug}`);
    const company = await collection.findOne({ slug: slug });

    if (!company) {
      console.error("Company not found");
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    console.log("Company found:", company);
    return NextResponse.json(company);
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    console.log("Closing MongoDB connection...");
    await client.close();
  }
}
