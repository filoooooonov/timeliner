"use client";

import Link from "next/link";
import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { FaUserCircle } from "react-icons/fa";

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
    <header className=" px-6 py-3">
      <nav className="relative flex items-center flex-row justify-between">
        <div className="absolute left-1/2 transform -translate-x-1/2 ">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <Link href="/" className="text-2xl font-bold text-primary">
          Timeliner.
        </Link>

        <div className="flex flex-row gap-6">
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
            <span>Dashboard</span>
          </Link>
          <Link
            href="/create-timeline"
            className="bg-zinc-700 rounded-full w-8 h-8 my-auto"
          ></Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
