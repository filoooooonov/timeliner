"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoogleIcon from "@/public/google_logo_icon.webp";
import { signIn } from "next-auth/react";

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      if (!email) {
        setError("Something went wrong. Please, contact us");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email as string)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      const resUserExists = await fetch("/api/user-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailToCheck: email }),
      });

      if (!resUserExists.ok) {
        setError("Failed to check if user exists. Please, contact us");
      }
      const { userExists } = await resUserExists.json();

      if (userExists) {
        setError("There is already an account with this email address");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError(null);
        setLoading(false);
        toast.success(
          "Registration successful! Please, verify you email address."
        );
        router.push("/verifyemail");
      }
    } catch (err) {
      console.log("Error during registration: ", err);
      setError("Something went wrong during registration. Please, contact us");
      setLoading(false);
      return;
    }
    console.log({ name, email, password });
  };

  return (
    <main className="max-w-5xl">
      <form onSubmit={handleSubmit} className="flex flex-col min-w-64 mx-auto">
        <h1 className="text-4xl font-medium mb-4">Register</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input autoComplete="off" name="name" placeholder="Enter your name" />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={8}
          />
          <SubmitButton
            className="button-primary text-black font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Registering...
              </span>
            ) : (
              "Register"
            )}
          </SubmitButton>

          {/* <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-neutral-500" />
            <span className="mx-4 text-neutral-500 text-sm">OR</span>
            <hr className="flex-grow border-t border-neutral-500" />
          </div> */}
        </div>
      </form>
      {/* <button
        className="button-google"
        onClick={() => {
          signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        <Image src={GoogleIcon} className="size-8" alt="google logo" />
        Register with Google
      </button> */}
      <p className="text-red-500 text-sm flex items-center gap-2 mt-2">
        {error}
      </p>
    </main>
  );
}
