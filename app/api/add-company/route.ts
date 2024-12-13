import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB, getMongoClient } from "../../../lib/mongo";
import Company from "@/models/company";
import User from "@/models/user";

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

    const existingCompany = await Company.findOne({ slug: body.slug });
    if (existingCompany) {
      return NextResponse.json(
        { error: "A company with this slug already exists" },
        { status: 400 }
      );
    }

    const newCompany = new Company({
      name: body.name,
      slug: body.slug,
      creator: body.creator,
      description: body.description,
      month_founded: body.month_founded,
      year_founded: body.year_founded,
      logo: body.logo,
    });

    await newCompany.save();

    const user = await User.findById(body.creator);
    if (user) {
      user.companies.push(newCompany.id);
      await user.save();
    }

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
