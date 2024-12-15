import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import Company from "../../../models/company";
import { connectMongoDB } from "@/lib/mongo";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";

export async function GET(req: NextRequest) {
  try {
    console.log("Incoming request:", req.url);

    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const query =
      q && q !== "null" ? { name: { $regex: q, $options: "i" } } : {};
    const companies = await Company.find(query);

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
