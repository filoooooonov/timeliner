"use client";
import { useState } from "react";
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
import { Textarea } from "./ui/textarea";
import {
  CalendarIcon,
  CalendarDaysIcon,
  CalendarClockIcon,
} from "lucide-react";

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

export default function AddEntryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 !max-w-4xl mx-auto py-10"
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                    </FormControl>
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
                <Textarea
                  placeholder="Type here..."
                  className="resize-none"
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
        <Button type="submit" className="text-black">
          Add entry
        </Button>
      </form>
    </Form>
  );
}
