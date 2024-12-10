import { connectMongoDB } from "@/lib/mongo";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { emailToCheck } = await req.json();

    const userCount = await User.findOne({
      email: emailToCheck,
    }).countDocuments();

    if (userCount === 0) {
      return NextResponse.json({ userExists: false }, { status: 200 });
    } else {
      return NextResponse.json({ userExists: true }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occured while checking if the user exists." },
      { status: 500 }
    );
  }
}
