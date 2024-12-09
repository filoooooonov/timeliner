"use client";

import { CompanyData } from "@/app/timeline/[slug]/page";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import BrinImg from "@/public/sergey_brin.webp";
import PageImg from "@/public/larry_page.webp";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaAward } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

const CompanyPage = ({ companyData }: { companyData: CompanyData }) => {
  const { data: session, status } = useSession();

  return (
    <div className="bg-background">
      {/* <Image
      src={defaultImg}
      alt="company logo"
      className="h-[30vh] object-cover"
    /> */}
      <div className="bg-neutral-800 w-full h[30vh] md:h-[16vw] flex items-center">
        <h2 className="text-neutral-700 text-5xl md:text-8xl mx-auto select-none">
          {companyData.name}
        </h2>
      </div>
      <main className="px-5 md:px-0 md:w-[65%] mx-auto bg-background mt-10">
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <h1 className="text-5xl font-semibold text-white">
              {companyData.name}
            </h1>
            <div className="mt-4 mb-6 flex flex-row gap-4">
              {session?.user.id === companyData.creator && (
                <button className="button-secondary flex items-center gap-2">
                  <MdEdit />
                  Edit company info
                </button>
              )}

              <button className="button-secondary flex items-center gap-2 text-!sm">
                <IoShareSocialSharp />
                Share
              </button>
            </div>

            <div>
              {/* DESCRIPTION */}
              <p className="mt-6">{companyData.description}</p>

              {/* FOUNDERS */}
              <div className="flex flex-row gap-2 mt-8">
                <Image
                  src={BrinImg}
                  alt="founder image"
                  className="avatar-image"
                />
                <Image
                  src={PageImg}
                  alt="founder image"
                  className="avatar-image "
                />
              </div>
            </div>
          </div>

          <div className="ml-auto w-full flex flex-col col-span-2">
            <div className="ml-auto flex items-center bg-neutral-900 px-4 py-2 rounded-md">
              {/* ESTABLISHED_DATE */}
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

        {/* Socials on mobile */}
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
      </main>
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
