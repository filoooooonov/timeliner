import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Initialize the MongoClient instance
const uri = process.env.MONGODB_URI as string; // Ensure this is defined in .env.local file

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.url.split("?")[1]);
    const name = searchParams.get("name");
    const slug = searchParams.get("slug");
    console.log("Checking company name and slug:", name, slug);

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug parameters are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    await client.connect();
    const db = client.db("timeliner");
    const collection = db.collection("companies");

    const existingCompany = await collection.findOne({
      $or: [{ name }, { slug }],
    });

    return NextResponse.json({
      exists: !!existingCompany,
      message: existingCompany
        ? "Company with this name already exists!"
        : "Sounds like a great name!",
    });
  } catch (error) {
    console.error("Error checking company name:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
