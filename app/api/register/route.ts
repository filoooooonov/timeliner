import { connectMongoDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password }: RegisterData = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    return NextResponse.json(
      { message: "User was registered successfully. " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
