import { NextRequest, NextResponse } from "next/server";
import { sendOtpMail } from "@/lib/mailer";

const otpStore: Record<string, string> = {};

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  await sendOtpMail(email, otp);

  return NextResponse.json({ message: "OTP sent successfully" });
}

// Optional: For verifying OTP later
export { otpStore };
