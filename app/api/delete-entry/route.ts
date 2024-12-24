import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo";
import Company from "@/models/company";

export async function POST(request: Request) {
  try {
    const { slug, entryIndex } = await request.json();

    // check validity of slug
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    if (typeof entryIndex !== "number") {
      return NextResponse.json(
        { error: "Invalid entry index" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const company = await Company.findOne({ slug });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // check validity of entryIndex
    if (entryIndex < 0 || entryIndex >= company.timeline_entries.length) {
      return NextResponse.json(
        { error: "Index out of range" },
        { status: 400 }
      );
    }

    company.timeline_entries.splice(entryIndex, 1);
    await company.save();

    return NextResponse.json(
      { message: "Entry removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
