"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

type SignupInput = {
  email: string;
  name: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });

  async function handleSignupWithOtp() {
    try {
      const res = await axios.post("/api/send-otp", {
        email: postInputs.email,
      });

      if (res.status === 200) {
        localStorage.setItem("signupDetails", JSON.stringify(postInputs));
        alert("OTP sent to your email.");
        router.push("/verify-otp");
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      alert("Error while sending OTP: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex justify-center items-center flex-col">
        <div className="text-3xl font-extrabold">Create an account</div>

        <LabelInput
          label="Name"
          placeholder="Pintu.."
          onChange={(e) =>
            setPostInputs((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <LabelInput
          label="Email"
          placeholder="pintu@gmail.com"
          onChange={(e) =>
            setPostInputs((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <LabelInput
          label="Password"
          type="password"
          placeholder="password"
          onChange={(e) =>
            setPostInputs((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button
          type="button"
          onClick={handleSignupWithOtp}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 w-1/2"
        >
          Sign up
        </button>
        <div className="text-sm font-medium text-gray-500 mt-2">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-700 hover:underline">
            Sign in
          </a>
        </div>
      </div>

      <div className="hidden md:flex bg-gray-500 justify-center items-center">
        <div className="max-w-md p-4">
          <div className="text-2xl font-bold">
            &ldquo;User-friendly website, smooth checkout, and a helpful support team that truly cares about customer satisfaction.&rdquo;
          </div>
          <div className="text-xl font-semibold mt-2">- Revispy</div>
          <div className="text-sm font-medium text-slate-400 mt-1">
            CEO | xxxx
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div className="my-2 w-1/2">
      <label className="block mb-1 text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={type ?? "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
