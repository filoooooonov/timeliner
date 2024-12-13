import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, getMongoClient } from "../../../lib/mongo";

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

    console.log(`Searching for company with _slug: ${slug}`);
    const company = await collection.findOne({ slug: slug });

    if (!company) {
      console.error("Company not found");
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
