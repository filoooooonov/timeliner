import React, { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { CompanyData } from "@/app/[slug]/page";
import Image from "next/image";
import { EllipsisVertical, Loader2 } from "lucide-react";

import { MdDelete } from "react-icons/md";
import { toast, Toaster } from "sonner";
import CompanyDemoBlock from "@/components/ui/CompanyDemoBlock";
import { useSession } from "next-auth/react";
import { FaPaperPlane } from "react-icons/fa6";

const Dashboard = ({
  userId,
  userName,
}: {
  userId: string;
  userName?: string | null;
}) => {
  const [companies, setCompanies] = React.useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  async function getCompanyData(userId: string) {
    try {
      const res = await fetch(`/api/get-users-companies?userId=${userId}`);
      if (!res.ok) {
        setError("Failed to fetch company data");
        throw new Error(
          "Failed to fetch company data. Please try again later."
        );
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      setError(
        "An error occured while fetching company data. Please try again later."
      );
      return [];
    }
  }

  const fetchData = async () => {
    if (!userId) {
      console.error("User ID is required");
      setLoading(false);
      setError("Something went wrong. Please try again later.");
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
    <main className="px-5 max-w-5xl mx-auto pt-20 pb-20">
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
        {session?.user.isVerified && (
          <Link href="create-timeline" className="button-secondary">
            <TiPlus size={15} />
            Add company
          </Link>
        )}
      </div>

      {loading ? (
        <p className="flex items-center gap-4 mx-auto w-max mt-40">
          <Loader2 className="animate-spin" />
          Loading...
        </p>
      ) : session?.user.isVerified === false ? (
        <div className="mt-40 text-center flex flex-col gap-6 ">
          <span className="text-lg font-medium text-neutral-100">
            Verify your email address to view or add companies.
          </span>{" "}
          <span>
            If you cannot find the verification link, make sure you check the
            spam folder.
          </span>
          <button className="button-primary px-4 py-2 w-max mx-auto flex items-center gap-2">
            <FaPaperPlane />
            Resend verification email
          </button>
        </div>
      ) : companies.length === 0 && !error ? (
        <p className="mt-40 text-center">You don't have any companies yet!</p>
      ) : error ? (
        <p className="mt-40 text-center text-red-500">{error}</p>
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
