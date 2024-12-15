"use client";

import React from "react";
import SearchPage from "./SearchPage";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data: companies, error } = useSWR("/api/get-all-companies", fetcher);

  if (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }

  if (!companies) {
    return <div>Loading...</div>;
  }

  return <SearchPage companies={companies} />;
};

export default Page;
