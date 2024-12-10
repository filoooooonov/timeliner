"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = ({ text }: { text: string }) => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="button-secondary w-fit px-4"
    >
      {text}
    </button>
  );
};

export default SignOut;
