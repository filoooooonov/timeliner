"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { FaUserCircle } from "react-icons/fa";
import { MenuIcon, Search, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CreateTimelineButton from "./CreateTimelineButton";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { CompanyData } from "@/app/[slug]/page";
import Image from "next/image";

const HeaderHome = () => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<CompanyData[]>([]);
  const router = useRouter();

  const placeholders = [
    "Browse start-ups...",
    "Browse companies...",
    "Browse projects...",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Disable scrolling when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (inputValue) {
      // Fetch suggestions from the database
      fetch(`/api/suggestions?q=${inputValue}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const form = e.currentTarget;
    // const input = form.querySelector("input");
    // const query = input ? input.value : "";

    if (inputValue) {
      router.push(`/search?q=${inputValue}`);
      setSidebarOpen(false);
    }
  };

  const renderLogo = (logo: string) => {
    if (logo) {
      return (
        <Image
          src={logo}
          alt="company logo"
          className="size-6 object-cover rounded-full"
          width={100}
          height={100}
        />
      );
    } else {
      return <Search size={20} />;
    }
  };

  return (
    <>
      <header className="py-6 mt-2 ">
        <nav className="relative flex items-center flex-row justify-between">
          <div className="hidden 2xl:block 2xl:absolute lg:left-1/2 2xl:transform 2xl:-translate-x-1/2">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            {suggestions.length > 0 && (
              <div
                className={`absolute w-32 lg:w-full bg-neutral-900 shadow-lg rounded-lg mt-2 p-2 flex flex-col border-2 border-neutral-800 transition-all duration-300 ease-in-out ${suggestions.length > 0 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}
              >
                {suggestions.map((suggestion: CompanyData, index) => (
                  <Link
                    href={`/${suggestion.slug}`}
                    key={index}
                    className="p-2 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 cursor-pointer rounded-md duration-200 flex items-center gap-4"
                  >
                    {renderLogo(suggestion.logo)}
                    {suggestion.name}
                  </Link>
                ))}
              </div>
            )}
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
                  className="text-neutral-400 font-semibold hover:bg-neutral-800/20 hover:text-neutral-200 rounded-lg duration-200 px-4 py-2"
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
          className={`fixed right-0 -top-[100%] h-full w-full bg-background shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out ${
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
            {suggestions.length > 0 && (
              <div
                className={`absolute bg-neutral-900 shadow-lg rounded-lg mt-2 p-2 w-full flex flex-col border-2 border-neutral-800 transition-all duration-300 ease-in-out ${suggestions.length > 0 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}
              >
                {suggestions.map((suggestion: CompanyData, index) => (
                  <Link
                    href={`/${suggestion.slug}`}
                    key={index}
                    className="p-3 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 cursor-pointer rounded-md duration-200 flex items-center gap-4"
                  >
                    <Search size={20} />
                    {suggestion.name}
                  </Link>
                ))}
              </div>
            )}
            {status !== "loading" && (
              <div className="pt-8 flex flex-col gap-8">
                {status !== "authenticated" && (
                  <Link
                    href="/sign-in"
                    className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-6 py-3 w-max mx-auto"
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
