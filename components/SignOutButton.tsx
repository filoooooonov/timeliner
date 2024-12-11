"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOut = ({ text }: { text: string }) => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="button-red"
    >
      <FaSignOutAlt />
      {text}
    </button>
  );
};

export default SignOut;
