import Image from "next/image";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import CompanyPage from "@/components/CompanyPage";

// Define the interface for the company data
export interface CompanyData {
  month_founded: string;
  year_founded: string;
  slug: string;
  description: string;
  name: string;
  creator: string;
}

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://timeliner-demo.vercel.app";

const fetchCompany = async (slug: string): Promise<CompanyData | null> => {
  const res = await fetch(`${URL}/api/get-company?_slug=${slug}`, {
    method: "GET",
  });
  const data = await res.json();

  if (res.ok) {
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
  // const { data: session } = useSession();

  if (!companyData) {
    return (
      <div className="w-full bg-background h-screen flex items-center justify-center">
        <h1 className="text-3xl text-white">
          We could not find what you are looking for. Please, try again.
        </h1>
      </div>
    );
  }

  return <CompanyPage companyData={companyData} />;
}
