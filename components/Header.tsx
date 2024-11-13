"use client";

import Link from "next/link";
import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

const Header = () => {
  const placeholders = [
    "Browse start-ups...",
    "Browse companies...",
    "Browse projects...",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="relative flex items-center flex-row justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Timeliner.
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2 ">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <div className="space-x-6">
          <Link
            href="/"
            className="hover:text-primary font-semibold duration-300 text-zinc-400 p-2 text-sm"
          >
            About
          </Link>
          <Link href="/" className="button-secondary text-sm !px-3 !py-2 ">
            Log in
          </Link>
          <Link href="/" className="button-primary px-2 py-2 !text-sm">
            Create timeline
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
