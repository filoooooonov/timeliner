"use client";

import Link from "next/link";
import React from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import {
  LucideSettings,
  MenuIcon,
  Settings,
  Settings2,
  Settings2Icon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

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
    <header className=" px-6 py-3">
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

        <div className="hidden md:flex flex-row gap-6">
          {!session ? (
            <>
              <Link
                href="/sign-in"
                className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-2 py-2"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="button-secondary text-sm !px-3 !py-2 flex items-center gap-2"
              >
                <FaUserCircle />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className=" text-neutral-400 hover:text-neutral-500 duration-200 font-semibold flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  <IoIosSettings />
                  Settings
                </span>
              </Link>
              <Link
                href="/create-timeline"
                className="bg-zinc-700 rounded-full w-8 h-8 my-auto"
              ></Link>
            </>
          )}
        </div>
        <div className="flex md:hidden">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
