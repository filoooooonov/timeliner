import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo";
import User from "@/models/user";
import Company from "@/models/company";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    await connectMongoDB();
    const user = await User.findById(userId).populate("companies");

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(user.companies || [], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
