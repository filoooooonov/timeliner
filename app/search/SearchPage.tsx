import React from "react";
import { CompanyData } from "../[slug]/page";
import CompanyDemoBlock from "@/components/ui/CompanyDemoBlock";

const SearchPage = ({
  companies,
  q,
}: {
  companies: CompanyData[];
  q: string | null;
}) => {
  return (
    <main className="px-5 max-w-5xl mx-auto pt-20">
      <h1 className="text-4xl">
        {q ? `Search results for "${q}"` : "All companies"}{" "}
      </h1>
      <div className="mt-12 md:grid md:grid-cols-2 flex flex-col gap-8">
        {companies.map((company) => (
          <CompanyDemoBlock key={company.id} company={company} />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
