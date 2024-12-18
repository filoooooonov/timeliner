import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Company from "@/models/company";
import { connectMongoDB } from "@/lib/mongo";

export async function POST(request: NextRequest) {
  try {
    const { newSlug, oldSlug, ...data } = await request.json();

    if (!newSlug || !oldSlug) {
      return NextResponse.json(
        { error: "Company slug is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const company = await Company.findOneAndUpdate(
      { slug: oldSlug },
      { ...data, slug: newSlug, logo: data.logo },
      { new: true }
    );

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Company details updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company details" },
      { status: 500 }
    );
  } finally {
    mongoose.connection.close();
  }
}
