"use client";

import { CompanyData } from "@/app/[slug]/page";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import BrinImg from "@/public/sergey_brin.webp";
import PageImg from "@/public/larry_page.webp";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaAward } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { toast, Toaster } from "sonner";
import { MdOutlineAddCircle } from "react-icons/md";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const CompanyPage = ({ companyData }: { companyData: CompanyData }) => {
  const { data: session, status } = useSession();

  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (companyData.logo) {
      setLogo(companyData.logo);
    }
  }, [companyData.logo]);

  const renderLogo = () => {
    if (logo) {
      return (
        <Image
          src={logo}
          alt="company logo"
          className="size-16 object-cover rounded-full"
          width={500}
          height={500}
        />
      );
    } else {
      return <div className="bg-neutral-700 size-16 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-background">
      <Toaster />

      {/* Banner on top */}
      <div className="relative bg-neutral-800 w-full h[30vh] md:h-[16vw] flex items-center py-8 md:py-0">
        <h2 className="text-neutral-700 text-5xl md:text-8xl mx-auto select-none">
          {companyData.name}
        </h2>
        <div className="hidden lg:flex w-full -bottom-16 absolute md:bottom-0 left-1/2 transform -translate-x-1/2 items-end justify-between pb-4 h-full md:w-[65%] mx-auto px-5 md:px-0 ">
          {session?.user.id === companyData.creator && (
            <button className="button-secondary flex items-center gap-2">
              <MdEdit />
              Edit company info
            </button>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_PROD_URL}/${companyData.slug}`
              );
              toast.success("Link copied to clipboard!");
            }}
            className="button-secondary flex items-center gap-2 text-!sm"
          >
            <FaRegCopy />
            Copy link
          </button>
        </div>
      </div>

      <div className="px-5 md:px-0 md:w-[65%] mx-auto bg-background pt-8">
        <div className="flex flex-col md:grid md:grid-cols-5">
          <div className="col-span-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                {renderLogo()}
                <h1 className="text-5xl font-semibold text-white">
                  {companyData.name}
                </h1>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="block md:hidden rounded-full hover:bg-neutral-700 duration-200 p-2"
                  asChild
                >
                  <EllipsisVertical size={40} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  {session?.user.id === companyData.creator && (
                    <DropdownMenuItem>
                      <span className="text-neutral-300 flex items-center gap-2">
                        <MdEdit />
                        Edit company
                      </span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <span className="text-neutral-300 flex items-center gap-2">
                      <FaRegCopy />
                      Copy link
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* ESTABLISHED_DATE */}
            <div className="w-max flex items-center bg-neutral-900 px-4 py-2 mt-6 border-2 border-amber-300 rounded-md">
              <p className="font-semibold flex items-center gap-2">
                <FaAward />
                Est. {companyData.month_founded} {companyData.year_founded}
              </p>
            </div>

            <div>
              {/* DESCRIPTION */}
              <p className="mt-6">{companyData.description}</p>

              {/* FOUNDERS */}
              <div className="flex flex-col mt-8">
                <h2 className="text-base text-neutral-400 mb-4">Founders</h2>
                <div className="flex flex-row gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Image
                        src={BrinImg}
                        alt="founder image"
                        className="avatar-image size-16"
                      />
                    </HoverCardTrigger>

                    <HoverCardContent className="w-max">
                      <div className="text-center px-4">
                        <h3 className="text-lg font-medium">founder.name</h3>
                        <span className="text-neutral-300 text-sm">
                          founder.job_title
                        </span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  {session?.user.id === companyData.creator && (
                    <div className="size-16 bg-neutral-800 rounded-full hover:bg-neutral-700/60 duration-200 cursor-pointer flex justify-center items-center">
                      <MdOutlineAddCircle className="text-neutral-500 size-6" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto w-full flex flex-col col-span-2">
            {/* ESTABLISHED_DATE */}
            <div className="hidden md:flex ml-auto items-center bg-neutral-900 px-4 py-2 rounded-md">
              <p className="font-semibold flex items-center gap-2">
                <FaAward />
                Est. {companyData.month_founded} {companyData.year_founded}
              </p>
            </div>
            {/* SOCIALS */}
            <div className="hidden md:block ml-auto bg-neutral-900 rounded-md p-4 h-max min-w-[200px] mt-8">
              <h2 className="text-lg font-medium mb-2 text-zinc-300">
                Follow {companyData.name}
              </h2>
              <ul>
                <li className="text-zinc-400">Facebook</li>
                <li className="text-zinc-400">Instagram</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOCIALS on mobile */}
        <div className="block md:hidden ml-auto bg-neutral-900 rounded-md p-4 h-max min-w-[200px] mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-zinc-300">Socials</h2>
          <ul>
            <li className="text-zinc-400">Facebook</li>
            <li className="text-zinc-400">Instagram</li>
          </ul>
        </div>

        <div className=" mb-40">
          <Timeline data={testData} />
        </div>
      </div>
    </div>
  );
};

const testData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Built and launched Aceternity UI and Aceternity UI Pro from scratch
        </p>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          I usually run out of copy, but when I see content this big, I try to
          integrate lorem ipsum.
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Lorem ipsum is for people who are too lazy to write copy. But we are
          not. Here are some more example of beautiful designs I built.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/* <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            /> */}
        </div>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Deployed 5 new components on Aceternity today
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Card grid component
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Startup template Aceternity
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Random file upload lol
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Himesh Reshammiya Music CD
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Salman Bhai Fan Club registrations open
          </div>
        </div>
      </div>
    ),
  },
];

export default CompanyPage;
