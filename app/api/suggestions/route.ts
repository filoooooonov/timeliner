import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import Company from "@/models/company";
import { connectMongoDB } from "@/lib/mongo";

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const suggestions = await Company.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    return NextResponse.json(
      suggestions.map((company) => ({
        name: company.name,
        slug: company.slug,
        logo: company.logo,
      }))
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "Error fetching suggestions" },
      { status: 500 }
    );
  }
}
