import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, getMongoClient } from "../../../lib/mongo";
import Company from "@/models/company";

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
    await connectMongoDB();

    const newCompany = new Company({
      name: body.name,
      slug: body.slug,
      creator: body.creator,
      description: body.description,
      month_founded: body.month_founded,
      year_founded: body.year_founded,
    });

    await newCompany.save();

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
