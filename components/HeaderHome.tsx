"use client";

import Link from "next/link";
import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { FaUserCircle } from "react-icons/fa";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CreateTimelineButton from "./CreateTimelineButton";

const HeaderHome = () => {
  const { data: session } = useSession();

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
    <header className="py-6">
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
          {!session && (
            <Link
              href="/sign-in"
              className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-2 py-2"
            >
              Sign in
            </Link>
          )}
          <Link
            href={!session ? "/register" : "/dashboard"}
            className="button-secondary text-sm !px-3 !py-2 flex items-center gap-2"
          >
            <FaUserCircle />
            <span>{!session ? "Register" : "Dashboard"}</span>
          </Link>
          <CreateTimelineButton className="py-2 px-3" />
        </div>

        <div className="flex lg:hidden">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
