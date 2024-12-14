import React, { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { CompanyData } from "@/app/[slug]/page";
import Image from "next/image";
import { EllipsisVertical, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDelete } from "react-icons/md";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getCompanyData(userId);
      setCompanies(companies);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const renderLogo = (logo: string) => {
    if (logo) {
      return (
        <Image
          src={logo}
          alt="company logo"
          className="size-12 object-cover rounded-full"
          width={100}
          height={100}
        />
      );
    } else {
      return <div className="bg-neutral-700 size-12 rounded-full"></div>;
    }
  };

  const deleteCompany = async (e: React.FormEvent, companyId: string) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/delete-company?companyId=${companyId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete company");
      }
      setCompanies(companies.filter((c) => c.id !== companyId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="px-5 max-w-5xl mx-auto pt-20">
      <div className="grid grid-cols-2 mb-32">
        <h1 className="text-5xl">
          Hey, <span className="text-primary">{userName}</span>!
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

      {loading ? (
        <p className="flex items-center gap-4 mx-auto w-max mt-20">
          <Loader2 className="animate-spin" />
          Loading...
        </p>
      ) : companies.length === 0 ? (
        <p className="mt-8 text-center">You don't have any companies yet!</p>
      ) : (
        <div className="mt-12 md:grid md:grid-cols-2 flex flex-col gap-8">
          {companies.map((company: CompanyData) => (
            <Link
              href={`/${company.slug}`}
              key={company.slug}
              className="p-6 bg-neutral-800/60 hover:bg-neutral-800/80 transition duration-200 rounded-lg shadow-md border-t-2 border-neutral-800 cursor-pointer flex flex-col"
            >
              <div className="flex items-center mb-8 justify-between">
                <div className="flex flex-row items-center gap-4">
                  <div className="object-cover rounded-full">
                    {renderLogo(company.logo)}
                  </div>
                  <h2>{company.name}</h2>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="rounded-full hover:bg-neutral-700 duration-200 p-2"
                    asChild
                  >
                    <EllipsisVertical size={35} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem
                      onClick={async (e) => deleteCompany(e, company.id)}
                    >
                      <span className="text-red-500 flex items-center gap-2">
                        <MdDelete />
                        Delete company
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm">
                  {company.description.split(" ").length > 15
                    ? company.description.split(" ").slice(0, 25).join(" ") +
                      "..."
                    : company.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
