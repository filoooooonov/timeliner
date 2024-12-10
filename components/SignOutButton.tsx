"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = ({ text }: { text: string }) => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="button-primary mt-20 px-4 py-3 "
    >
      {text}
    </button>
  );
};

export default SignOut;
