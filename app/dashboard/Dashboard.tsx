import React, { Suspense, useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { CompanyData } from "@/app/timeline/[slug]/page";
import { useSession } from "next-auth/react";
import { connectMongoDB } from "@/lib/mongo";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import Image from "next/image";

export async function getCompanyData(userId: string) {
  try {
    const res = await fetch(`/api/get-users-companies?userId=${userId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch company data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Dashboard = ({
  userId,
  userName,
}: {
  userId: string;
  userName?: string | null;
}) => {
  const [companies, setCompanies] = React.useState<CompanyData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const companies = await getCompanyData(userId);
      setCompanies(companies);
      console.log("COMPANIES DATA", companies);
    };

    fetchData();
  }, [userId]);

  const [logo, setLogo] = useState<string | null>(null);

  const renderLogo = (logo: string) => {
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
    }
    return null;
  };

  return (
    <main className="px-5 max-w-5xl mx-auto pt-20">
      <div className="grid grid-cols-2 mb-32">
        <h1 className="text-5xl">
          Hello, <span className="text-primary">{userName}</span>
        </h1>
        <div className="ml-auto flex flex-col gap-4">
          <SignOutButton text="Sign out" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2>Your companies</h2>
        <Link href="create-timeline" className="button-secondary">
          <TiPlus size={15} />
          Add company
        </Link>
      </div>

      {companies.length === 0 ? (
        <p className="mt-8 text-center">You don't have any companies yet!</p>
      ) : (
        <div className="mt-12 md:grid md:grid-cols-2 flex flex-col gap-8">
          {companies.map((company: CompanyData) => (
            <Link
              href={`/timeline/${company.slug}`}
              key={company.slug}
              className="p-6 bg-neutral-800/60 hover:bg-neutral-800/80 transition duration-200 rounded-lg shadow-md border-t-2 border-neutral-800 cursor-pointer flex flex-col"
            >
              <div className="flex flex-row gap-4 items-center mb-8">
                <div className="object-cover rounded-full size-16">
                  {renderLogo(company.logo)}
                </div>
                <h2>{company.name}</h2>
              </div>

              <div className="flex flex-col w-full">
                <p className="text-sm">{company.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
