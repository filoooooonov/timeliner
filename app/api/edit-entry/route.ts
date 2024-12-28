import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company";
import { connectMongoDB } from "@/lib/mongo";

export async function PUT(request: NextRequest) {
  try {
    const { slug, entryIndex, dateISO, includesDay, text } =
      await request.json();

    console.log(slug);
    if (
      !slug ||
      entryIndex === undefined ||
      entryIndex === null ||
      !dateISO ||
      !text
    ) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const company = await Company.findOne({ slug });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    const entry = company.timeline_entries[entryIndex];

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    entry.dateISO = new Date(dateISO);
    entry.includesDay = includesDay;
    entry.text = text;

    await company.save();

    return NextResponse.json(
      { message: "Entry updated successfully" },
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
