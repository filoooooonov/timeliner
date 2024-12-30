"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    try {
      const response = await fetch("/api/sendemail-reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to send email");
        throw new Error(data.message || "Failed to send email");
      } else {
        toast.success("Email sent successfully!");
      }
      setLoading(false);

      // Handle success (e.g., show a success message or redirect)
    } catch (err: any) {
      setError(err.message || "Failed to send email");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form className="h-fit flex flex-col max-w-96" onSubmit={handleSubmit}>
        <RiLockPasswordLine className="text-neutral-600 mb-8" size={60} />
        <h1 className="text-4xl font-medium mb-4">Reset your password</h1>
        <p className="mb-2 mt-2 text-foreground">
          Enter the email that is linked to your Timeliner account. We will send
          you a link to change your password.
        </p>

        <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />

          <SubmitButton className="button-primary mb-6 text-black font-semibold">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Sending...
              </span>
            ) : (
              "Send email"
            )}
          </SubmitButton>
          <p>
            Don't have an account?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/register"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </form>

      <p className="text-red-500 text-sm flex items-center gap-2 mt-2">
        {error}
      </p>
    </main>
  );
}
