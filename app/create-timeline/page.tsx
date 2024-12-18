"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
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
import { format, set } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle,
  ChevronRight,
  Loader2,
  XCircle,
} from "lucide-react";
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
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CompanyData } from "../[slug]/page";
import { Check, ChevronsUpDown } from "lucide-react";
import { redirect } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Confetti from "react-confetti-boom";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { generateSlug } from "@/utils/utils";

const months = [
  {
    label: "January",
    value: "Jan",
  },
  {
    label: "February",
    value: "Feb",
  },
  {
    label: "March",
    value: "Mar",
  },
  {
    label: "April",
    value: "Apr",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "June",
    value: "Jun",
  },
  {
    label: "July",
    value: "Jul",
  },
  {
    label: "August",
    value: "Aug",
  },
  {
    label: "September",
    value: "Sep",
  },
  {
    label: "October",
    value: "Oct",
  },
  {
    label: "November",
    value: "Nov",
  },
  {
    label: "December",
    value: "Dec",
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

const addCompanyDataToDB = async (formData: CompanyData) => {
  const res = await fetch(`/api/add-company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res;
};

export default function CreateCompanyForm() {
  const { data: session } = useSession();

  const [files, setFiles] = useState<File[] | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  // Store company name to show it in the dialog when the company is created
  const [companyName, setCompanyName] = useState<string | null>(null);

  const form = useForm<CompanyData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      creator: "",
      month_founded: "",
      year_founded: "",
      slug: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Send the data about the company to the database
  const handleFormSubmit = async (data: CompanyData) => {
    setLoading(true);
    setError(null);
    console.log("handleFormSubmit called with data:", data);
    try {
      if (!slug) {
        setError("Slug could not be defined for your company name");
        throw new Error("Slug is not defined. Please check the company name.");
      }

      if (!session) {
        setError("User is not authenticated");
        throw new Error("User is not authenticated.");
      }

      // Convert data.logo to a base64 string and check if it's of appropriate type
      const allowedFileTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/webp",
      ];
      if (files && files.length > 0) {
        const logoFile = files[0];
        if (!allowedFileTypes.includes(logoFile.type)) {
          setError(
            "Invalid file type. Please upload an SVG, PNG, or JPG image"
          );
          setLoading(false);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(logoFile);
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          const response = await addCompanyDataToDB({
            ...data,
            logo: base64String,
            slug,
            creator: session.user.id,
          });

          if (response.ok) {
            setLoading(false);
            setCompanyName(data.name);
            setDialogOpen(true);
          }
        };

        reader.onerror = () => {
          setError(
            "Failed to read the logo image. Please try again or upload another image"
          );
          setLoading(false);
        };
      } else {
        setError("Please upload a company logo");
        setLoading(false);
      }
    } catch (error) {
      setError(
        "Something went wrong while submitting your data. Please, try again"
      );
      console.error("Form submission error:", error);
    }
  };

  // Real-time validation of company name
  const [isChecking, setIsChecking] = useState(false);
  const [nameExists, setNameExists] = useState<boolean | null>(null);
  const checkCompanyName = useDebouncedCallback(async (name: string) => {
    if (!name) return;

    setIsChecking(true);
    try {
      const generatedSlug = generateSlug(name);
      if (!generatedSlug) return;
      setSlug(generatedSlug);

      const response = await fetch(
        `/api/check-company-name?name=${encodeURIComponent(name)}&slug=${encodeURIComponent(generatedSlug)}`
      );
      const data = await response.json();
      setNameExists(data.exists);
    } catch (error) {
      console.error("Error checking company name:", error);
    } finally {
      setIsChecking(false);
    }
  }, 500);

  function handleFileChange(files: File[] | null) {
    setFiles(files);
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  }

  return (
    <main className="relative max-w-xl mx-auto px-4 pt-32">
      {dialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999]">
          <Confetti
            mode="fall"
            particleCount={30}
            shapeSize={15}
            colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
          />
        </div>
      )}
      <FormProvider {...form}>
        <h1 className="text-4xl">
          Let's create your <span className="text-primary">Timeline.</span>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(form.getValues());
          }}
          className="space-y-8 mx-auto py-10"
        >
          {/* Company name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Type here..."
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        checkCompanyName(e.target.value);
                      }}
                      autoComplete="off"
                      className={cn(
                        nameExists && "border-2 border-red-500",
                        isChecking && "border-2 border-yellow-500"
                      )}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  {nameExists === null &&
                    !isChecking &&
                    "Enter your company name."}
                  {isChecking && (
                    <span className="flex items-center gap-2 text-yellow-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking your company name...
                    </span>
                  )}
                  {nameExists === false && !isChecking && field.value && (
                    <span className="flex items-center gap-2 text-green-500">
                      <CheckCircle className="h-4 w-4" />
                      Sounds like a great name!
                    </span>
                  )}

                  {nameExists === true && !isChecking && (
                    <span className="flex items-center gap-2 text-red-500">
                      <XCircle className="h-4 w-4" />
                      This company already exists in Timeliner!
                    </span>
                  )}
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
            <div className="flex flex-col sm:flex-row gap-4">
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
                                  "w-[200px] justify-between bg-neutral-900 border border-neutral-700 !text-white",
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
                                      form.setValue(
                                        "month_founded",
                                        month.value
                                      );
                                    }}
                                    className={cn(
                                      "group cursor-pointer transition duration-100 hover:text-white",
                                      month.value === field.value
                                        ? "bg-neutral-800 text-white"
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
                                "w-[200px] justify-between bg-neutral-900 border border-neutral-700 !text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? years.find(
                                    (year) => year.value === field.value
                                  )?.label
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
                                    "group cursor-pointer transition duration-100 hover:text-white",
                                    year.value === field.value
                                      ? "bg-neutral-800 text-white"
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
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company's logo</FormLabel>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={handleFileChange}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-3 h-max border-dashed border border-neutral-500 bg-neutral-800/50 flex items-center space-x-3"
                  >
                    <div className="relative w-32 h-32 bg-neutral-700 rounded-md flex items-center justify-center aspect-square">
                      <Image
                        src={logo || ""}
                        alt="company logo"
                        fill={true}
                        className="rounded-md object-contain p-4"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col justify-center space-y-2">
                        <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                          SVG, PNG, JPG or WEBP
                        </p>
                        <FileInput
                          id="fileInput"
                          className="button-primary w-max px-2 py-1 mb-4 mt-2"
                        >
                          Choose Image
                        </FileInput>
                      </div>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem
                              key={i}
                              index={i}
                              setLogo={setLogo}
                            >
                              <Paperclip className="h-4 w-4 text-neutral-400 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </div>
                  </FileUploader>
                </FormControl>
                <FormDescription>Upload your company's logo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <button type="submit" className="button-primary px-4 py-2">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating the timeline...
              </div>
            ) : (
              "Create timeline"
            )}
          </button>
          <p className="text-red-500 text-sm flex items-center gap-2">
            {error}
          </p>
        </form>
      </FormProvider>

      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="text-6xl">🎉</div>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              Your company's page has been created! <br />
              Now, you can add additional info and start adding events to your
              timeline in the company's own page!
            </DialogDescription>
          </DialogHeader>
          <Link
            className="button-primary px-4 py-2 w-max mx-auto mt-6 flex items-center gap-2"
            href={`/${slug}`}
          >
            Visit {companyName}&#x27;s page <ChevronRight />
          </Link>
        </DialogContent>
      </Dialog>
    </main>
  );
}
