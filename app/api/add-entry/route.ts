import { NextResponse } from "next/server";
import Company from "@/models/company";
import { connectMongoDB } from "@/lib/mongo";

export async function POST(request: Request) {
  try {
    const { slug, dateISO, includesDay, text } = await request.json();

    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { error: "Invalid company slug" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const company = await Company.findOne({ slug });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    company.timeline_entries.push({
      dateISO: new Date(dateISO),
      includesDay: includesDay,
      text: text,
    });

    await company.save();

    // sort the timeline entries by date in descending order
    company.timeline_entries.sort(
      (a: { dateISO: string | Date }, b: { dateISO: string | Date }) =>
        new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    );
    await company.save();

    return NextResponse.json(
      { message: "Timeline entry added successfully" },
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
