import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo";
import Company from "@/models/company";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  console.log("SLUG", slug);

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const result = await Company.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
