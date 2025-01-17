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
  handleEditClick,
}: {
  data: TimelineEntry[];
  slug: string;
  userIsCreator: boolean;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  handleEditClick: (entry: TimelineEntry) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      const minHeight = window.innerHeight; // Minimum height to ensure the timeline reaches the end
      setHeight(Math.max(document.documentElement.scrollHeight, minHeight));
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  async function deleteEntry(entryIndex: number) {
    setDeletingIndex(entryIndex);

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

      router.refresh();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete entry. Please try again.");
    }
    setDeletingIndex(null);
  }

  return (
    <div className="w-full relative bg-background font-sans" ref={containerRef}>
      {/* UPCOMING */}
      {/* <div className="flex justify-start py-8 border border-neutral-700 border-dashed md:gap-10 bg-neutral-900 rounded-lg">
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

      <div ref={ref} className="relative max-w-7xl mx-auto overflow-hidden">
        {/* MAIN TIMELINE */}
        <div className="relative">
          {data.map((item, index) => {
            const dateObj = new Date(item.dateISO);
            const day = dateObj.getUTCDate().toString();
            const month = dateObj.toLocaleString("en-US", { month: "long" });
            const year = dateObj.getUTCFullYear().toString();
            return (
              <div
                key={index}
                className=" flex justify-start md:pt-20 pb-0 md:gap-10"
              >
                <div
                  className={`md:sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full ${deletingIndex === index && "brightness-50 animate-pulse"}`}
                >
                  {/* Circles on timeline */}
                  <div className="size-6 absolute left-[20px] md:left-[21px]  rounded-full bg-black flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700 p-1" />
                  </div>
                  {/* Date */}
                  <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500 ">
                    {item.includesDay && day} {month} {year}
                  </h3>
                </div>

                <div className="relative text-neutral-300 pl-20 md:pl-4 w-full">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                    {item.includesDay && day} {month} {year}
                  </h3>
                  <p
                    className={`pr-8 text-neutral-300 md:max-w-[85%] ${deletingIndex === index && "brightness-50 animate-pulse"}`}
                  >
                    {item.text}
                  </p>
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
                          className="rounded-full text-neutral-400 hover:text-neutral-100 cursor-pointer hover:bg-neutral-800 duration-200 p-2"
                          asChild
                        >
                          <EllipsisVertical size={35} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                          <DropdownMenuItem
                            onClick={() => {
                              handleEditClick({ index, ...item });
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
            );
          })}
        </div>
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 max-h-[96%] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-neutral-700 to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-lime-700 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
