"use client";

import React from "react";
import SearchPage from "./SearchPage";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data: companies, error } = useSWR("/api/get-all-companies", fetcher);

  if (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }

  if (!companies) {
    return (
      <div className="mx-auto  w-max h-max mt-40">
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Loading...
        </span>
      </div>
    );
  }

  return <SearchPage companies={companies} />;
};

export default Page;
