import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Company from "@/models/company";
import { connectMongoDB } from "@/lib/mongo";

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

    console.log(`Searching for company with _slug: ${slug}`);
    const company = await Company.findOne({ slug });

    if (!company) {
      console.error("Company not found");
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company details" },
      { status: 500 }
    );
  } finally {
    mongoose.connection.close();
  }
}
