import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, getMongoClient } from "../../../lib/mongo";

export async function POST(req: NextRequest) {
  try {
    // Validate request method
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed ERR" },
        {
          status: 405,
          headers: {
            Allow: "POST",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }
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
    await connectMongoDB();
    const client = getMongoClient();
    const db = client?.connection?.db;

    if (!db) {
      console.error("Database connection failed");
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const collection = db.collection("companies");

    console.log(`Inserting company with slug: ${body.slug}`);
    const result = await collection.insertOne(body);

    console.log("Company inserted:", result);
    return NextResponse.json(
      { message: "Company added successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
