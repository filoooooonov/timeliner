"use client";

import Link from "next/link";
import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { FaUserCircle } from "react-icons/fa";
import { MenuIcon } from "lucide-react";

const HeaderHome = () => {
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
    <header className="container mx-auto py-6">
      <nav className="relative flex items-center flex-row justify-between">
        <div className="hidden 2xl:block 2xl:absolute lg:left-1/2 2xl:transform 2xl:-translate-x-1/2">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <Link href="/" className="text-2xl font-bold text-primary">
          Timeliner.
        </Link>

        <div className="flex-row gap-4 hidden lg:flex">
          <Link
            href="/"
            className="hover:text-primary font-semibold duration-300 text-zinc-400 p-2 text-sm"
          >
            About
          </Link>
          <Link
            href="/"
            className="button-secondary text-sm !px-3 !py-2 flex items-center gap-2"
          >
            <FaUserCircle />
            <span>Log in</span>
          </Link>
          <Link href="/create-timeline" className="button-primary px-2 py-2">
            Create timeline
          </Link>
        </div>

        <div className="flex lg:hidden">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
