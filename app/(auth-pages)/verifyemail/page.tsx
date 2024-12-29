"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await fetch(`/api/verifyemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="px-4 overflow-hidden">
      {!token && (
        <div>
          <MdOutlineMarkEmailUnread
            className="text-neutral-600 mb-8"
            size={60}
          />
          <h1 className="text-4xl font-medium mb-8">
            Verify your email address
          </h1>
          <div>
            <p className="text-neutral-300">
              We have send a verification link to your email. <br></br>
            </p>
            <p className="text-neutral-300 mt-6">
              Click on the link to complete the verification process. <br></br>{" "}
              If you can't find the email,{" "}
              <span className="font-semibold">
                it might be in your spam folder
              </span>
              .
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
        {verified && (
          <div className="py-2 flex flex-col gap-8">
            <span className="text-6xl">🎉</span>
            <div className="space-y-4">
              <p className="text-xl font-normal text-neutral-100">
                Your email is now verified! <br></br>
              </p>
              <p className="text-xl font-normal text-neutral-100">
                Please, sign in below 👇
              </p>
            </div>

            <Link href="/sign-in" className="button-primary px-4 py-2 w-max">
              Sign in
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-2xl text-red-500">Error verifying email!</h2>
          </div>
        )}
      </div>

      {/* <p className="text-red-500 text-sm flex items-center gap-2 mt-2">
        {error}
      </p> */}
    </div>
  );
}
