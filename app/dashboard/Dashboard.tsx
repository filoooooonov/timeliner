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
import { toast, Toaster } from "sonner";
import CompanyDemoBlock from "@/components/ui/CompanyDemoBlock";

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

  const fetchData = async () => {
    if (!userId) {
      console.error("User ID is required");
      setLoading(false);
      return;
    }
    const companies = await getCompanyData(userId);
    setCompanies(companies);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const deleteCompany = async (companySlug: string) => {
    try {
      const res = await fetch(`/api/delete-company?slug=${companySlug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Company deleted successfully!");
        fetchData(); // Refresh the list of companies
      }
    } catch (error) {
      toast.error("Failed to delete company");
      console.error(error);
    }
  };

  return (
    <main className="px-5 max-w-5xl mx-auto pt-20">
      <Toaster />
      <div className="flex flex-row justify-between space-x-4 mb-32">
        <h1 className="text-5xl">
          Hey, <span className="text-primary">{userName}</span>!
        </h1>
        <div className="ml-auto flex flex-col gap-4">
          <SignOutButton className="w-max" text="Sign out" />
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
            <CompanyDemoBlock
              key={company.slug}
              company={company}
              onDelete={() => deleteCompany(company.slug)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
