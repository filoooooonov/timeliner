import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";
import User from "@/models/user";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "We could not find a user with this email! Please, try with a different one",
        },
        { status: 404 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
