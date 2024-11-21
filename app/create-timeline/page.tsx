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

const formSchema = z.object({
  name_2842198923: z.string(),
  name_3214998683: z.string(),
  name_9397180665: z.coerce.date(),
  name_3420235136: z.array(z.string()).nonempty("Please at least one item"),
  name_9202272305: z.tuple([z.string(), z.string().optional()]).optional(),
  name_8372319481: z.string(),
});

export default function MyForm() {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_3420235136: ["test"],
      name_9397180665: new Date(),
    },
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
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name_2842198923"
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

        <FormField
          control={form.control}
          name="name_3214998683"
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

        <FormField
          control={form.control}
          name="name_9397180665"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of establishment</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal border-neutral-800",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-neutral-900 w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date when it all started.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_3420235136"
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
        />

        {/* <FormField
          control={form.control}
          name="name_9202272305"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || "");
                    form.setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    form.setValue(field.name, [
                      countryName || "",
                      state?.name || "",
                    ]);
                  }}
                />
              </FormControl>
              <FormDescription>
                If applicable, add where the company was started
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="name_8372319481"
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
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
