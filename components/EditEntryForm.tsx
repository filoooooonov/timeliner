"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutosizeTextarea } from "./ui/autosizeTextarea";
import {
  CalendarIcon,
  CalendarDaysIcon,
  CalendarClockIcon,
  Loader2,
} from "lucide-react";
import { CompanyData, TimelineEntry } from "@/app/[slug]/page";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from({ length: 125 }, (_, i) => String(1900 + i)).reverse();

const formSchema = z.object({
  day: z.string().optional(),
  month: z.string(),
  year: z.string(),
  text: z.string(),
});

export default function EditEntryForm({
  companyData,
  setOpen,
  selectedEntry,
}: {
  companyData: CompanyData;
  setOpen: (value: boolean) => void;
  selectedEntry: TimelineEntry;
}) {
  const dateObj = new Date(selectedEntry.dateISO);
  const defaultDay = dateObj.getUTCDate().toString();
  const defaultMonth = dateObj.toLocaleString("en-US", { month: "long" });
  const defaultYear = dateObj.getUTCFullYear().toString();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: selectedEntry.includesDay ? defaultDay : "",
      month: defaultMonth,
      year: defaultYear,
      text: selectedEntry?.text ?? "", // prefilled here
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    function monthIndex(monthName: string) {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(monthName);
    }

    const dateObj = new Date(
      parseInt(values.year),
      monthIndex(values.month),
      values.day ? parseInt(values.day) + 1 : 1 // default day if none selected
    );
    try {
      setLoading(true);

      const res = await fetch("/api/edit-entry", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: companyData.slug,
          entryIndex: selectedEntry.index,
          dateISO: dateObj.toISOString(),
          includesDay: !!values.day,
          text: values.text,
        }),
      });

      if (res.ok) {
        toast.success("Entry edited successfully");
        setLoading(false);
        router.refresh();
        setOpen(false);
      } else {
        setError("Failed to edit entry. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setError("Failed to edit entry. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 !w-6xl mx-auto min-w-full pt-6 pb-12 md:pb-0"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-4 h-4 text-muted-foreground" />
                    Day
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                      <SelectContent className="overflow-y-auto max-h-[20rem]">
                        {days.map((day) => (
                          <SelectItem
                            key={day}
                            value={day}
                            className={
                              field.value === day
                                ? "bg-neutral-800 text-white"
                                : "bg-neutral-900"
                            }
                          >
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    Month<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[20rem]">
                      {months.map((month) => (
                        <SelectItem
                          key={month}
                          value={month}
                          className={
                            field.value === month
                              ? "bg-neutral-800 text-white"
                              : "bg-neutral-900"
                          }
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarClockIcon className="w-4 h-4 text-muted-foreground" />
                    Year<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[20rem]">
                      {years.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className={
                            field.value === year
                              ? "bg-neutral-800 text-white"
                              : "bg-neutral-900"
                          }
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* DESCRIPTION / TEXT */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  placeholder="Type here..."
                  className="resize-none scrollbar-hide"
                  maxHeight={400}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell what memorable and important happened
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500 text-sm flex items-center gap-2 my-1">
          {error}
        </p>

        <Button type="submit" className="text-black" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              Editing entry...
            </span>
          ) : (
            "Edit entry"
          )}
        </Button>
      </form>
    </Form>
  );
}
