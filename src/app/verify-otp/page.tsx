"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("signupDetails");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setEmail(parsed.email);
      } catch (err) {
        console.error("Error parsing signupDetails:", err);
        router.push("/signup");
      }
    } else {
      router.push("/signup");
    }
  }, [router]); // ✅ Include 'router' in dependency array

  const handleVerify = async () => {
    if (!otp || !email) return alert("Missing email or OTP");

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20">
      <h2 className="text-xl mb-4 font-semibold text-center">
        Enter the OTP sent to your email
      </h2>
      <input
        type="text"
        placeholder="6-digit OTP"
        className="border p-2 w-full mb-4 rounded"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded"
      >
        Verify &amp; Continue
      </button>
    </div>
  );
}
