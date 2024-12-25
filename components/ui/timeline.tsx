"use client";
import { CompanyData, TimelineEntry } from "@/app/[slug]/page";
import { useScroll, useTransform, motion } from "framer-motion";
import { EllipsisVertical, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Timeline = ({
  data,
  slug,
  userIsCreator,
  dialogOpen,
  setDialogOpen,
}: {
  data: TimelineEntry[];
  slug: string;
  userIsCreator: boolean;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
}) => {
  const [entries, setEntries] = useState(data);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 0.7], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  async function editEntry(entryIndex: number) {
    try {
      const res = await fetch("/api/edit-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, entryIndex }),
      });
      if (!res.ok) {
        console.error("Failed to edit entry");
        toast.error("Failed to edit entry. Please try again.");
        return;
      }
      toast.success("Entry edited successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error editing entry:", error);
      toast.error("Failed to edit entry. Please try again.");
    }
  }

  async function deleteEntry(entryIndex: number) {
    try {
      const response = await fetch("/api/delete-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, entryIndex }),
      });

      if (!response.ok) {
        console.error("Failed to delete entry");
        toast.error("Failed to delete entry. Please try again.");
        return;
      }
      toast.success("Entry deleted successfully!");
      const updatedEntries = entries.filter((_, index) => index !== entryIndex);
      setEntries(updatedEntries);
      router.refresh();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete entry. Please try again.");
    }
  }

  return (
    <div
      className="w-full relative bg-background font-sans pb-40"
      ref={containerRef}
    >
      {/* UPCOMING */}
      {/* <div className="flex justify-start pt-10 md:pt-32 md:gap-10">
        <div className="flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
          <div className="h-6 absolute left-4 md:left-[21px] w-6 rounded-full bg-black flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700 p-1" />
          </div>
          <h3 className="hidden md:block text-lg md:pl-20 md:text-3xl font-semibold text-neutral-500 ">
            Upcoming...
          </h3>
        </div>
        <div className="relative pl-20 pr-4 md:pl-4 w-full">
          <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
            item.title
          </h3>
          item.content
        </div>
      </div> */}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* MAIN TIMELINE */}
        <div className="relative">
          {entries.map((item, index) => (
            <div
              key={index}
              className=" flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Circles on timeline */}
                <div className="size-6 absolute left-[20px] md:left-[21px]  rounded-full bg-black flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700 p-1" />
                </div>
                {/* Date */}
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 ">
                  {item.date}
                </h3>
              </div>

              <div className="relative text-neutral-300 pl-20 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                  {item.date}
                </h3>
                <p className="pr-8 text-neutral-300">{item.text}</p>
                <div className="absolute right-0 top-0">
                  {userIsCreator && (
                    <DropdownMenu
                      key={index}
                      open={openDropdownIndex === index}
                      onOpenChange={(open) => {
                        if (open) setOpenDropdownIndex(index);
                        else setOpenDropdownIndex(null);
                      }}
                    >
                      <DropdownMenuTrigger
                        className="rounded-full text-neutral-400 hover:text-neutral-100 cursor-pointer hover:bg-neutral-700 duration-200 p-2"
                        asChild
                      >
                        <EllipsisVertical size={35} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem
                          onClick={() => {
                            setDialogOpen(true);
                            setOpenDropdownIndex(null);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <MdEdit />
                            Edit entry
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteEntry(index)}>
                          <span className="text-red-500 flex items-center gap-2">
                            <MdDelete />
                            Delete entry
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_50%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-lime-700 to-transparent from-[0%] via-[20%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
