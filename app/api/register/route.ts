import { connectMongoDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { sendEmail } from "@/utils/mailer";

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

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser, savedUser._id);
    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

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
