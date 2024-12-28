import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { CompanyData } from "@/app/[slug]/page";
import Image from "next/image";
import { useSession } from "next-auth/react";

const CompanyDemoBlock = ({
  company,
  onDelete,
}: {
  company: CompanyData;
  onDelete?: () => void;
}) => {
  const { data: session } = useSession();

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

  return (
    <Link
      href={`/${company.slug}`}
      className="p-6 bg-neutral-800/60 hover:bg-neutral-800/80 transition duration-200 rounded-lg shadow-md border-t-2 border-neutral-800 cursor-pointer flex flex-col"
    >
      <div className="flex items-center mb-8 justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="object-cover rounded-full">
            {renderLogo(company.logo)}
          </div>
          <h2>{company.name}</h2>
        </div>

        {/* Only show the delete button if the user is the creator of the company */}
        {session?.user?.id === company.creator && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full hover:bg-neutral-700 duration-200 p-2"
              asChild
            >
              <EllipsisVertical size={35} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={onDelete}>
                <span className="text-red-500 flex items-center gap-2">
                  <MdDelete />
                  Delete company
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div key={company.slug}>
        <div className="flex flex-col w-full">
          <p className="text-sm">
            {company.description.split(" ").length > 15
              ? company.description.split(" ").slice(0, 25).join(" ") + "..."
              : company.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyDemoBlock;
