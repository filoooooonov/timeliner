"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import {
  LucideSettings,
  MenuIcon,
  Search,
  Settings,
  Settings2,
  Settings2Icon,
  XIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import SignOutButton from "@/components/SignOutButton";
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
      <header className="py-8 px-4">
        <nav className="relative flex items-center flex-row justify-between z-[999]">
          <div className="relative hidden 2xl:block 2xl:absolute lg:left-1/2 2xl:transform 2xl:-translate-x-1/2">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            {suggestions.length > 0 && (
              <div className="absolute w-64 lg:w-full z-50 bg-neutral-900 shadow-lg rounded-lg mt-2 p-2 flex flex-col border-2 border-neutral-800">
                {suggestions.map((suggestion: CompanyData, index) => (
                  <Link
                    href={`/${suggestion.slug}`}
                    key={index}
                    className="p-3 text-sm text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 cursor-pointer rounded-md duration-200 flex items-center gap-4"
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

          <div className="absolute right-0 hidden md:flex flex-row gap-6">
            {status !== "authenticated" ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-6 py-3 w-max mx-auto"
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
                  href="/dashboard"
                  className="button-secondary text-sm !px-3 !py-2 flex items-center gap-2"
                >
                  <FaUserCircle />
                  Dashboard
                </Link>
              </>
            )}
          </div>
          <div className="absolute right-0 z-[9999] flex md:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* ON MOBILE */}
      <div
        className={`fixed inset-0 mt-8 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`fixed right-0 -top-[100%] h-full w-full bg-background border-l-2 border-neutral-800 shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-y-full" : "translate-y-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 space-y-2 mt-16">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            {status !== "loading" && (
              <>
                {status !== "authenticated" ? (
                  <>
                    <Link
                      href="/sign-in"
                      className="text-neutral-400 font-semibold hover:text-neutral-500 duration-200 px-6 py-3 mx-auto"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="button-secondary text-sm !px-6 !py-3 mx-auto flex items-center gap-2"
                    >
                      <FaUserCircle />
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-neutral-400 hover:text-neutral-500 duration-200 font-semibold flex items-center gap-2 mx-auto w-max !px-8 !py-3"
                    >
                      <span className="flex items-center gap-2">
                        <IoIosSettings />
                        Settings
                      </span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="button-secondary text-sm flex items-center gap-2 mx-auto w-max !px-8 !py-3"
                    >
                      <FaUserCircle />
                      Dashboard
                    </Link>
                    <SignOutButton
                      className="mx-auto w-max !px-8 !py-3"
                      text="Sign out"
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
