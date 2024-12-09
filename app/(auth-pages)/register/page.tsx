"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useEffect, useRef, useState } from "react";
import { IconError404 } from "@tabler/icons-react";

export default function Signup() {
  // const searchParams = await props.searchParams;
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    console.log("handlesubmit");

    try {
      const resUserExists = await fetch("/api/user-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log("aaa");
      const user = await resUserExists.json();
      if (user) {
        setError("User already exists.");
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
        setName(null);
        setEmail(null);
        setPassword(null);
        setError(null);
      } else {
      }
    } catch (err) {
      console.log("Error during registration: ", err);
      return;
    }
    console.log({ name, email, password });
  };

  // Autofill detection
  useEffect(() => {
    let interval = setInterval(() => {
      if (nameField.current && emailField.current && passwordField.current) {
        setName(nameField.current.value);
        setEmail(emailField.current.value);
        setPassword(passwordField.current.value);
        //do the same for all autofilled fields
        clearInterval(interval);
      }
    }, 100);
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col min-w-64 mx-auto">
        <h1 className="text-4xl font-medium mb-4">Register</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/log-in">
            Log in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-6 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input
            ref={nameField}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Enter your name"
          />
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailField}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="you@example.com"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            ref={passwordField}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
          />
          <SubmitButton
            className="text-black font-semibold"
            pendingText="Registering..."
          >
            Register
          </SubmitButton>
          <div>
            <p className="text-red-500 text-sm flex items-center gap-2">
              {error}
            </p>
          </div>
        </div>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}
