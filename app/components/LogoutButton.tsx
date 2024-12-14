"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const handleClick = async () => {
    signOut();
  };

  return <button onClick={handleClick}>Sign out</button>;
}
