"use client";

import clsx from "clsx";
import { signOut } from "next-auth/react";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOut = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className={clsx("button-red", className)}
    >
      <FaSignOutAlt />
      {text}
    </button>
  );
};

export default SignOut;
