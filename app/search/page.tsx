"use client";

import React from "react";
import SearchPage from "./SearchPage";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CompanyData } from "../[slug]/page";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function () {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const { data: companies, error } = useSWR(
    `/api/get-all-companies?q=${q}`,
    fetcher
  );

  if (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }

  if (!companies) {
    return (
      <div className="mx-auto w-max h-max mt-40">
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Loading...
        </span>
      </div>
    );
  }

  return <SearchPage companies={companies} q={q} />;
}
