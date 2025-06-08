import { NextRequest, NextResponse } from "next/server";
import { sendOtpMail } from "@/lib/mailer";
import { storeOtp } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    storeOtp(email, otp);
    await sendOtpMail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
