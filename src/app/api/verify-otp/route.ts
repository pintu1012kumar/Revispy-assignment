import { NextRequest, NextResponse } from "next/server";
import { getStoredOtp } from "@/lib/otpStore";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const validOtp = getStoredOtp(email);
    if (!validOtp) {
      return NextResponse.json({ message: "OTP expired or not found" }, { status: 400 });
    }

    if (otp !== validOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    // On success - create JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "OTP verified", token });
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
