import nodemailer from "nodemailer";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongo";
import { render } from "@react-email/components";
import { Email } from "./email";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    await connectMongoDB();

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        resetForgotPasswordToken: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      // Looking to send emails in production? Check out our Email API/SMTP product!
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const emailHtml = await render(
      <Email url={`http://localhost:3000/verifyemail?token=${hashedToken}`} />
    );

    const mailOptions = {
      from: "alexfiloonov@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailHtml,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
