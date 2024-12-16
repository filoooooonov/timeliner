"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { FaUserCircle } from "react-icons/fa";
import { MenuIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CreateTimelineButton from "./CreateTimelineButton";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const HeaderHome = () => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const placeholders = [
    "Browse start-ups...",
    "Browse companies...",
    "Browse projects...",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const form = e.currentTarget;
    // const input = form.querySelector("input");
    // const query = input ? input.value : "";

    if (inputValue) {
      router.push(`/search?q=${inputValue}`);
    }
  };

  return (
    <>
      <header className="py-6 mt-2">
        <nav className="relative flex items-center flex-row justify-between">
          <div className="hidden 2xl:block 2xl:absolute lg:left-1/2 2xl:transform 2xl:-translate-x-1/2">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>

          <Link
            href="/"
            className="absolute left-0 z-[9999] text-2xl font-bold text-primary"
          >
            Timeliner.
          </Link>

          {status !== "loading" && (
            <div className="absolute right-0 flex-row gap-4 hidden lg:flex">
              {status !== "authenticated" && (
                <Link
                  href="/sign-in"
                  className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-2 py-2"
                >
                  Sign in
                </Link>
              )}
              <Link
                href={status !== "authenticated" ? "/register" : "/dashboard"}
                className="button-secondary text-sm !px-3 !py-2 flex items-center gap-2"
              >
                <FaUserCircle />
                <span>
                  {status !== "authenticated" ? "Register" : "Dashboard"}
                </span>
              </Link>
              <CreateTimelineButton className="py-2 px-3" />
            </div>
          )}

          <div className="absolute right-0 z-[9999] flex lg:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* ON MOBILE */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed right-0 -top-[100%] h-full w-full bg-background border-2-l border-neutral-800 shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="flex flex-col gap-4 space-y-2 mt-16">
            <PlaceholdersAndVanishInput
              className="py-8"
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            {status !== "loading" && (
              <div className="pt-8 flex flex-col gap-8">
                {status !== "authenticated" && (
                  <Link
                    href="/sign-in"
                    className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-2 py-2"
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  href={status !== "authenticated" ? "/register" : "/dashboard"}
                  className="button-secondary text-sm !py-3 !px-8 flex items-center gap-2 mx-auto"
                >
                  <FaUserCircle />
                  <span>
                    {status !== "authenticated" ? "Register" : "Dashboard"}
                  </span>
                </Link>
                <CreateTimelineButton className="py-3 px-8 w-max mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
