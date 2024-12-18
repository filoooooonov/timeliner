"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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
import { TagsInput } from "@/components/ui/tags-input";
import { CloudUpload, Loader2, Paperclip, Upload } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { CompanyData } from "@/app/[slug]/page";
import clsx from "clsx";
import Image from "next/image";
import useSWR from "swr";
import { generateSlug } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  logo: z.string().optional(),
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

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type here..."
                  className="resize-y h-[250px] scrollbar-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="relative bg-background rounded-lg p-3 h-max border-dashed border border-neutral-500 bg-neutral-800/50 flex items-center space-x-3"
                >
                  <div className="relative w-32 h-32 bg-neutral-700/50 rounded-md flex items-center justify-center aspect-square">
                    <Image
                      src={logo || companyData.logo}
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
        <Button
          type="submit"
          className="button-primary flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
}
