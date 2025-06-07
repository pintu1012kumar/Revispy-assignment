import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  const validOtp = otpStore[email];
  if (!validOtp) {
    return NextResponse.json({ message: "OTP expired or not found" }, { status: 400 });
  }

  if (otp !== validOtp) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
  }

  // On success - create a JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  return NextResponse.json({ message: "OTP verified", token });
}
