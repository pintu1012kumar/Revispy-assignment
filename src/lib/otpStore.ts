const otpStore: Record<string, string> = {};

export function storeOtp(email: string, otp: string) {
  otpStore[email] = otp;
}

export function getStoredOtp(email: string): string | undefined {
  return otpStore[email];
}
