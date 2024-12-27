"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui/autosizeTextarea";
import { TagsInput } from "@/components/ui/tags-input";
import { Loader2, Paperclip, Plus, Upload } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { CompanyData, TimelineEntry } from "@/app/[slug]/page";
import clsx from "clsx";
import Image from "next/image";
import { convertToBase64, generateSlug } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  logo: z.string().optional(),
  founders: z.array(
    z.object({
      name: z.string(),
      job_title: z.string(),
      image: z.string().optional(),
    })
  ),
});

export default function EditCompanyForm({
  companyData,
  className,
}: {
  companyData: CompanyData;
  className?: string;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [logo, setLogo] = useState<string | null>(companyData.logo);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: companyData.name,
      description: companyData.description,
      tags: companyData.tags,
      logo: companyData.logo,
      founders: companyData.founders.length > 0 ? companyData.founders : [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (values.name) {
        const newSlug = generateSlug(values.name);

        const res = await fetch("/api/edit-company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            oldSlug: companyData.slug,
            newSlug: newSlug,
          }),
        });
        if (res.ok) {
          toast.success("Company details updated successfully");
          setLoading(false);
          router.push(`/${newSlug}`);
        } else {
          toast.error("Failed to update company details. Please try again.");
          setLoading(false);
        }
      } else {
        console.error("values.name is undefined");
        setLoading(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setLoading(false);
    }
  }

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: "founders",
  });

  const handleAddFounder = () => {
    append({ name: "", job_title: "", image: "" });
  };

  const handleImageChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      form.setValue(`founders.${index}.image`, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function handleFileChange(files: File[] | null) {
    setFiles(files);
    if (files && files.length > 0) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setLogo(base64);
      form.setValue("logo", base64);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("space-y-8 w-full mx-auto py-10", className)}
      >
        {/* LOGO UPLOAD */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select logo</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={handleFileChange}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-xl p-3 h-max border-dashed border border-neutral-500 bg-neutral-800/50 flex items-center space-x-3"
                >
                  {logo ? (
                    <div className="relative w-32 h-32 bg-neutral-800 rounded-md flex items-center justify-center aspect-square">
                      <Image
                        src={logo}
                        alt="company logo"
                        fill={true}
                        className="rounded-md object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div>
                      <FileInput
                        id="fileInput"
                        className="relative size-32 bg-neutral-800 rounded-md flex items-center justify-center aspect-square"
                      >
                        <Upload className="size-8 w-max text-neutral-700" />
                      </FileInput>
                    </div>
                  )}
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
                        className="bg-neutral-800 text-neutral-400 hover:bg-neutral-700/50 font-semibold text-sm duration-300 w-max px-3 py-2 mb-4 mt-2 rounded-lg"
                      >
                        Choose Image
                      </FileInput>
                    </div>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i} setLogo={setLogo}>
                            <Paperclip className="h-4 w-4 text-neutral-400 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </div>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* COMPANY NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Company name"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* COMPANY DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  placeholder="Type here..."
                  className="resize-y h-[250px] scrollbar-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TAGS */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags related to your company</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>
                Add tags by typing and pressing Enter.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FOUNDERS */}
        <div>
          <p>Founders</p>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mt-2 border-2 border-neutral-800 rounded-xl w-full p-4 flex items-center gap-8"
            >
              <div className="size-20 aspect-square bg-neutral-700/50 rounded-full flex items-center justify-center">
                <FormField
                  control={form.control}
                  name={`founders.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={files}
                          onValueChange={(files) => {
                            if (files && files[0]) {
                              handleImageChange(index, files[0]);
                            }
                          }}
                          dropzoneOptions={{
                            maxFiles: 1,
                            maxSize: 1024 * 1024 * 4,
                            multiple: false,
                          }}
                          className="relative p-3 h-max  flex items-center space-x-3"
                        >
                          {field.value ? (
                            <div className="relative size-16 flex items-center justify-center ">
                              <FileInput
                                id={`upload-${index}`}
                                className="relative size-16 flex items-center justify-center overflow-hidden"
                              >
                                <Image
                                  src={field.value}
                                  alt="founder image"
                                  fill={true}
                                  className="object-contain rounded-full"
                                />
                              </FileInput>
                            </div>
                          ) : (
                            <div>
                              <FileInput
                                id={`upload-${index}`}
                                className="relative size-16 flex items-center justify-center"
                              >
                                <Upload className="size-8 w-max text-neutral-500" />
                              </FileInput>
                            </div>
                          )}
                        </FileUploader>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 relative">
                <FormField
                  control={form.control}
                  name={`founders.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Type here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`founders.${index}.job_title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Type here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  className="absolute right-0 top-0"
                  onClick={() => remove(index)}
                >
                  <RxCross2
                    size={16}
                    className="text-neutral-400 hover:text-white  duration-200"
                  />
                </button>
              </div>
            </div>
          ))}
          <div
            className="mt-4 w-full cursor-pointer py-3 bg-neutral-800 hover:bg-neutral-700/60 text-neutral-400 rounded-lg flex items-center gap-2 justify-center duration-300"
            onClick={handleAddFounder}
          >
            <Plus size={18} />
            Add founder
          </div>
        </div>

        <Button
          type="submit"
          className="button-primary flex items-center gap-2 w-max mx-auto"
        >
          {loading && <Loader2 className="animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
