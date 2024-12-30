import React from "react";

function VerifyEmailHTML({ hashedToken }: { hashedToken: string }) {
  return (
    <div className="bg-background w-full">
      <div className="relative max-w-[80%] flex justify-center">
        <h1>Verify your email</h1>
        <p>
          Click the link below to verify your email address and get started.
        </p>
        <a
          target="_blank"
          href={`http://localhost:3000/verifyemail?token=${hashedToken}`}
          className="button-primary px-4 py-2"
        >
          Verify email
        </a>
        <a
          className="absolute bottom-0 text-primary"
          target="_blank"
          href={process.env.NEXT_PUBLIC_PROD_URL}
        >
          Timeliner.
        </a>
      </div>
    </div>
  );
}

export default VerifyEmailHTML;
