"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const session = useSession();

  console.log({ session });
  const handleClick = async () => {
    signOut();
  };

  return <button onClick={handleClick}>Sign out</button>;
}
