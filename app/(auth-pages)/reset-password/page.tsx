"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

export default function page() {
  // use these when given a token in the URL
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get("password") as string;
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to change password");
        throw new Error(data.message || "Failed to change password");
      } else {
        toast.success("Password changed successfully!");
      }
      setLoading(false);

      // Handle success (e.g., show a success message or redirect)
      toast.success("Password changed successfully!");
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message || "Failed to change password");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <main className="">
      <form className="h-fit flex flex-col max-w-96" onSubmit={handleSubmit}>
        <MdPassword className="text-neutral-600 mb-8" size={60} />
        <h1 className="text-4xl font-medium mb-4">Reset your password</h1>
        <p className="mb-2 mt-2 text-foreground">
          Enter the email that is linked to your Timeliner account. We will send
          you a link to change your password.
        </p>

        <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
          <Label htmlFor="email">New password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your new password"
            required
          />

          <SubmitButton className="button-primary mb-6 text-black font-semibold">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Changing...
              </span>
            ) : (
              "Change password"
            )}
          </SubmitButton>
          {/* <p>
            Don't have an account?{" "}
            <Link
              className="text-primary font-medium underline"
              href="/register"
            >
              Register
            </Link>{" "}
          </p> */}
        </div>
      </form>

      <p className="text-red-500 text-sm flex items-center gap-2 mt-2">
        {error}
      </p>
    </main>
  );
}
