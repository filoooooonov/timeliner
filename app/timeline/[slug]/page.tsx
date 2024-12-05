import HeaderHome from "@/components/HeaderHome";
import Image from "next/image";
import React from "react";
import defaultImg from "@/public/google_logo.webp";
import { Timeline } from "@/components/ui/timeline";
import BrinImg from "@/public/sergey_brin.webp";
import PageImg from "@/public/larry_page.webp";

// Define the interface for the company data
interface CompanyData {
  _id: string;
  month_founded: string;
  year_founded: string;
  slug: string;
  description: string;
  name: string;
}

const fetchCompany = async (slug: string): Promise<CompanyData | null> => {
  const response = await fetch(
    `http://localhost:3000/api/get-company?_slug=${slug}`
  );
  const data = await response.json(); // Will parse JSON if response is valid

  if (response.ok) {
    console.log(data);
    return data;
  } else {
    console.error("API Error:", data.error);
    return null;
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const companyData = await fetchCompany(slug);

  if (!companyData) {
    return (
      <div className="w-full bg-background h-screen flex items-center justify-center">
        <h1 className="text-3xl text-white">
          Oops! We could not find what you are looking for. Please, try again.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Image
        src={defaultImg}
        alt="company logo"
        className="h-[30vh] object-cover"
      />
      <main className="w-[65%] mx-auto bg-background mt-10">
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <h1 className="text-5xl font-semibold">{companyData.name}</h1>
            <button className="button-secondary mt-4">
              Add data to database
            </button>
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
            <div className="ml-auto flex items-center button-secondary">
              {/* ESTABLISHED_DATE */}
              <p>
                Est. {companyData.month_founded} {companyData.year_founded}
              </p>
            </div>
            <div className="ml-auto bg-zinc-900 rounded-md p-4 h-max min-w-[200px] mt-8">
              {/* SOCIALS */}
              <h2 className="text-2xl font-semibold mb-2 text-zinc-300">
                Socials
              </h2>
              <ul>
                <li className="text-zinc-400">Facebook</li>
                <li className="text-zinc-400">Instagram</li>
              </ul>
            </div>
          </div>
        </div>

        <div className=" mb-40">
          <Timeline data={testData} />
        </div>
      </main>
    </div>
  );
}

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
