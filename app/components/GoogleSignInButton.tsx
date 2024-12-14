"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function GoogleSignInButton() {
  const googleSignIn = async () => {
    signIn("google");
  };

  return (
    <button
      onClick={googleSignIn}
      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-[#4285f4] rounded-md"
    >
      LOGIN
    </button>
  );
}
