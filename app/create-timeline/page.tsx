"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
// import LocationSelector from "@/components/ui/location-input";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CompanyData } from "../timeline/[slug]/page";
import { Check, ChevronsUpDown } from "lucide-react";

const production = "https://timeliner-demo.vercel.app";
const development = "http://localhost:3000";
const URL = process.env.NODE_ENV === "development" ? development : production;

const months = [
  {
    label: "January",
    value: "jan",
  },
  {
    label: "February",
    value: "feb",
  },
  {
    label: "March",
    value: "mar",
  },
  {
    label: "April",
    value: "apr",
  },
  {
    label: "May",
    value: "may",
  },
  {
    label: "June",
    value: "jun",
  },
  {
    label: "July",
    value: "jul",
  },
  {
    label: "August",
    value: "aug",
  },
  {
    label: "September",
    value: "sep",
  },
  {
    label: "October",
    value: "oct",
  },
  {
    label: "November",
    value: "nov",
  },
  {
    label: "December",
    value: "dec",
  },
] as const;
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i)
  .map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }))
  .reverse();

const formSchema = z.object({
  company_name: z.string(),
  company_description: z.string(),
  company_tags: z.array(z.string()).nonempty("Please at least one item"),
  company_image: z.string(),
  month_founded: z.string(),
  year_founded: z.string(),
});

const dropZoneConfig = {
  maxFiles: 1,
  maxSize: 1024 * 1024 * 4,
  multiple: false,
};

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const addCompanyDataToDB = async (formData: CompanyData) => {
  const response = await fetch(`${URL}/api/add-company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    console.log("Company added successfully");
  } else {
    console.error("API Error:", response.statusText);
  }
};

export default function MyForm() {
  const [files, setFiles] = useState<File[] | null>(null);
  const form = useForm<CompanyData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      month_founded: "",
      year_founded: "",
      slug: "",
    },
  });

  const onSubmit = form.handleSubmit((data: CompanyData) => {
    console.log("ONSUBMIT");
    try {
      console.log(data);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      );
      const slug = generateSlug(data.name);
      addCompanyDataToDB({ ...data, slug });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-8 max-w-3xl mx-auto py-10">
        {/* Company name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." type="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public company name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company description */}
        <FormField
          control={form.control}
          name="description"
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
                Tell the world about your company.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company tags */}
        {/* <FormField
            control={form.control}
            name="company_tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Enter your tags"
                  />
                </FormControl>
                <FormDescription>
                  Summarize what you do in 2-3 words.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

        {/* Month and year founded */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="month_founded"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex flex-row gap-4">
                    <Popover>
                      <div className="flex flex-col gap-2">
                        <FormLabel>Month</FormLabel>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between bg-neutral-900 border border-neutral-700 text-white",
                                !field.value && "text-muted-foreground "
                              )}
                            >
                              {field.value
                                ? months.find(
                                    (month) => month.value === field.value
                                  )?.label
                                : "Select month"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                      </div>
                      <PopoverContent className="w-[200px] p-0 bg-neutral-900">
                        <Command>
                          <CommandInput
                            className="outline-none focus:outline-none"
                            placeholder="Search month..."
                          />
                          <CommandList>
                            <CommandGroup>
                              {months.map((month) => (
                                <CommandItem
                                  value={month.label}
                                  key={month.value}
                                  onSelect={() => {
                                    form.setValue("month_founded", month.value);
                                  }}
                                  className={cn(
                                    "group cursor-pointer transition duration-100",
                                    month.value === field.value
                                      ? "bg-neutral-800"
                                      : "hover:bg-neutral-800"
                                  )}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 transition duration-100",
                                      month.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {month.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_founded"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  {/* Year founded */}
                  <Popover>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Year</FormLabel>

                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between bg-neutral-900 border border-neutral-700 text-white",
                              !field.value && "text-muted-foreground "
                            )}
                          >
                            {field.value
                              ? years.find((year) => year.value === field.value)
                                  ?.label
                              : "Select year"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-[200px] p-0 bg-neutral-900">
                      <Command>
                        <CommandInput
                          className="outline-none focus:outline-none"
                          placeholder="Search year..."
                        />
                        <CommandList>
                          <CommandGroup>
                            {years.map((year) => (
                              <CommandItem
                                value={year.label}
                                key={year.value}
                                onSelect={() => {
                                  form.setValue("year_founded", year.value);
                                }}
                                className={cn(
                                  "group cursor-pointer transition duration-100",
                                  year.value === field.value
                                    ? "bg-neutral-800"
                                    : "hover:bg-neutral-800"
                                )}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 transition duration-100",
                                    year.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {year.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription>
            The month and year your company was founded.
          </FormDescription>
        </div>

        {/* Company's logo */}
        {/* <FormField
            control={form.control}
            name="company_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company's logo</FormLabel>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormDescription>Select your company's logo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

        <Button type="submit" className="button-primary">
          Create timeline
        </Button>
      </form>
    </FormProvider>
  );
}
