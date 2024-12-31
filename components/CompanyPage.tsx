"use client";

import { CompanyData, TimelineEntry } from "@/app/[slug]/page";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaAward } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical, Plus } from "lucide-react";
import EditCompanyForm from "./EditCompanyForm";
import AddEntryForm from "./AddEntryForm";
import EditEntryForm from "./EditEntryForm";
import MedalImg from "@/public/medal.png";
import { ResponsiveDialog } from "./ResponsiveDialog";

const CompanyPage = ({ companyData }: { companyData: CompanyData }) => {
  const { data: session, status } = useSession();

  const [logo, setLogo] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [entryDialogOpen, setEntryDialogOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [editEntryDialogOpen, setEditEntryDialogOpen] =
    useState<boolean>(false);

  // maintain a selected entry state to keep track of the entry being edited
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(
    null
  );
  function handleEditClick(entry: TimelineEntry) {
    setSelectedEntry(entry);
    setEditEntryDialogOpen(true);
  }

  const renderLogo = () => {
    if (companyData.logo) {
      return (
        <Image
          src={companyData.logo}
          alt="company logo"
          className="size-16 object-cover rounded-full"
          width={500}
          height={500}
        />
      );
    } else {
      return <div className="bg-neutral-700 size-16 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-background">
      {/* Edit company dialog */}
      <ResponsiveDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        companyData={companyData}
        Form={EditCompanyForm}
        title={`Edit ${companyData.name}`}
        description="Edit your company information."
      />

      {/* Add entry dialog */}
      <ResponsiveDialog
        open={entryDialogOpen}
        setOpen={setEntryDialogOpen}
        companyData={companyData}
        Form={AddEntryForm}
        title="Add Entry"
        description="Add a new timeline entry."
      />

      {/* Edit entry dialog */}
      <ResponsiveDialog
        open={editEntryDialogOpen}
        setOpen={setEditEntryDialogOpen}
        companyData={companyData}
        Form={EditEntryForm}
        title="Edit Entry"
        description="Edit your timeline entry."
        selectedEntry={{
          index: selectedEntry?.index ?? 0,
          dateISO: selectedEntry?.dateISO ?? "",
          includesDay: selectedEntry?.includesDay ?? false,
          text: selectedEntry?.text ?? "",
        }}
      />

      {/* Banner on top */}
      <div className="relative bg-neutral-800 w-full md:h-[16vw] flex items-center py-8 md:py-0">
        <h2 className="text-neutral-700 text-5xl md:text-8xl mx-auto select-none">
          {companyData.name}
        </h2>
        <div className="hidden lg:flex w-full -bottom-16 absolute md:bottom-0 left-1/2 transform -translate-x-1/2 items-end justify-between pb-4 h-full md:w-[65%] mx-auto px-5 md:px-0 ">
          {session?.user.id === companyData.creator && (
            <button
              className="button-secondary flex items-center gap-2"
              onClick={() => setEditDialogOpen(true)}
            >
              <MdEdit />
              Edit company info
            </button>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_PROD_URL}/${companyData.slug}`
              );
              toast.success("Link copied to clipboard!");
            }}
            className="button-secondary flex items-center gap-2 text-!sm"
          >
            <FaRegCopy />
            Copy link
          </button>
        </div>
      </div>

      <div className="px-5 md:px-0 md:w-[65%] mx-auto bg-background pt-8">
        <div className="flex flex-col md:grid md:grid-cols-5">
          <div className="col-span-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                {renderLogo()}
                <h1 className="text-5xl font-semibold text-white">
                  {companyData.name}
                </h1>
              </div>

              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger
                  className="block md:hidden rounded-full hover:bg-neutral-700 duration-200 p-2"
                  asChild
                >
                  <EllipsisVertical size={40} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  {session?.user.id === companyData.creator && (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        setEditDialogOpen(true);
                      }}
                    >
                      <span className="text-neutral-300 flex items-center gap-2">
                        <MdEdit />
                        Edit company
                      </span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <span className="text-neutral-300 flex items-center gap-2">
                      <FaRegCopy />
                      Copy link
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* ESTABLISHED_DATE */}
            <div className="flex lg:hidden w-max items-center bg-neutral-900 px-4 py-2 mt-6 border-2 border-amber-300 rounded-md">
              <p className="font-semibold flex items-center gap-2">
                <FaAward />
                Est. {companyData.month_founded} {companyData.year_founded}
              </p>
            </div>

            <div>
              {/* DESCRIPTION */}
              {companyData.tags && (
                <div className="mt-6 flex flex-row gap-2">
                  {companyData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-neutral-800 w-max text-neutral-300 text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-6">{companyData.description}</p>

              {/* FOUNDERS */}
              <div className="flex flex-col mt-8">
                <div className="flex flex-col gap-2">
                  {companyData.founders.length > 0 && (
                    <>
                      <h2 className="text-base text-neutral-400 mb-2">
                        Founders
                      </h2>

                      <div className="flex flex-row gap-2">
                        {companyData.founders.map((founder, index) => (
                          <HoverCard
                            key={index}
                            openDelay={150}
                            closeDelay={100}
                          >
                            <HoverCardTrigger asChild>
                              {founder.image ? (
                                <div className="relative bg-neutral-800 size-16 rounded-full">
                                  <Image
                                    src={founder.image}
                                    fill={true}
                                    alt="founder image"
                                    className="avatar-image size-16"
                                  />
                                </div>
                              ) : (
                                <div className="bg-neutral-800 size-16 rounded-full cursor-pointer"></div>
                              )}
                            </HoverCardTrigger>

                            <HoverCardContent className="w-max rounded-lg bg-neutral-900 border shadow-sm border-neutral-800">
                              <div className="text-center">
                                <h3 className="text-sm font-medium">
                                  {founder.name}
                                </h3>
                                <span className="text-neutral-400 text-xs">
                                  {founder.job_title}
                                </span>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto w-full flex flex-col col-span-2">
            {/* ESTABLISHED_DATE */}
            <div className="hidden md:flex ml-auto items-center bg-neutral-900 px-4 py-2 rounded-md">
              <p className="font-semibold flex items-center gap-2">
                <FaAward />
                {/* <Image src={MedalImg} alt="medal" className="size-8" /> */}
                Est. {companyData.month_founded} {companyData.year_founded}
              </p>
            </div>
            {/* SOCIALS */}
            {/* <div className="hidden md:block ml-auto bg-neutral-900 rounded-md p-4 h-max min-w-[200px] mt-8">
              <h2 className="text-lg font-medium mb-2 text-zinc-300">
                Follow {companyData.name}
              </h2>
              <ul>
                <li className="text-zinc-400">Facebook</li>
                <li className="text-zinc-400">Instagram</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* SOCIALS on mobile */}
        {/* <div className="block md:hidden ml-auto bg-neutral-900 rounded-md p-4 h-max min-w-[200px] mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-zinc-300">Socials</h2>
          <ul>
            <li className="text-zinc-400">Facebook</li>
            <li className="text-zinc-400">Instagram</li>
          </ul>
        </div> */}

        {companyData.timeline_entries.length > 0 &&
          session?.user.id === companyData.creator && (
            <button
              className="ml-auto button-secondary px-2 py-1 mt-12 mb-12 md:mb-4 md:mt-4"
              onClick={() => setEntryDialogOpen(true)}
            >
              <Plus size={16} /> Add entry
            </button>
          )}

        {companyData.timeline_entries.length > 0 ? (
          <div className=" mb-40">
            <Timeline
              data={companyData.timeline_entries}
              slug={companyData.slug}
              userIsCreator={session?.user.id === companyData.creator}
              dialogOpen={editEntryDialogOpen}
              setDialogOpen={setEditEntryDialogOpen}
              handleEditClick={handleEditClick}
            />
          </div>
        ) : (
          <>
            {companyData.creator === session?.user.id ? (
              <div className="mt-32 mx-auto text-center w-full flex flex-col gap-4 h-[40vh]">
                {companyData.name} does not have a timeline yet.
                <button
                  className="button-secondary px-4 py-2 mx-auto"
                  onClick={() => setEntryDialogOpen(true)}
                >
                  <Plus size={16} />
                  Add the first entry
                </button>
              </div>
            ) : (
              <div className="mt-32 mx-auto text-center w-full flex flex-col gap-4 h-[40vh]">
                {companyData.name} does not have a timeline yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
