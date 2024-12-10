"use client";

import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  // change these as in register

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate email

    // Validate password
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      if (res?.url) router.replace("/dashboard");
    } else {
      setError(null);
    }
  };

  return (
    <main className="max-w-5xl">
      <form className="h-fit flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-medium mb-4">Log in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-primary font-medium underline" href="/register">
            Register
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton
            className="text-black font-semibold"
            // formAction={signInAction}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </SubmitButton>
          <p className="text-red-500 text-sm flex items-center gap-2">
            {error}
          </p>
        </div>
      </form>
    </main>
  );
}
