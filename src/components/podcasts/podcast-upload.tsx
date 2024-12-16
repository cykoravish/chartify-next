/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useAnimation } from "framer-motion";
import { useDropzone } from "react-dropzone";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";

// Option 1: Disable caching for the specific route
export const dynamic = "force-dynamic";

// Option 2: For API routes, explicitly disable caching
export const revalidate = 0;

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  tags: z
    .string()
    .refine((value) => value.split(",").every((tag) => tag.trim().length > 0), {
      message: "Each tag must not be empty",
    }),
});

export function PodcastUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  // New state for upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressControls = useAnimation();

  // Effect to animate progress bar
  useEffect(() => {
    progressControls.start({ width: `${uploadProgress}%` });
  }, [uploadProgress, progressControls]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB max size
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  // Simulated upload progress function
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 95) {
        clearInterval(interval);
        setUploadProgress(99);
      } else {
        setUploadProgress(Math.min(progress, 99));
      }
    }, 500);
    return interval;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      toast.error("Please upload a podcast file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("tags", values.tags);
    console.log("formDATA: ", formData);
    try {
      setIsLoading(true);
      setUploadProgress(0);

      // Start simulated progress
      const progressInterval = simulateProgress();
      console.log("response test 1:", progressInterval);
      const response = await fetch("/api/podcasts", {
        method: "POST",
        body: formData,
        cache: "no-store",
        next: { revalidate: 0 },
      });
      console.log("response test 2:", response);
      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Failed to upload podcast");
      }

      const data = await response.json();

      setUploadProgress(100);

      toast.success("Your podcast has been uploaded.", {
        style: {
          border: "1px solid #008000",
          padding: "16px",
          color: "#008000",
        },
        iconTheme: {
          primary: "#008000",
          secondary: "#FFFAEE",
        },
      });
      router.push("/podcasts");
    } catch (error) {
      console.error("Error uploading podcast:", error);
      toast.error("Failed to upload podcast. Please try again.");
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* File upload area */}
              {/* @ts-ignore */}
              <motion.div
                {...getRootProps()}
                className={`border border-dashed rounded-md p-10 text-center cursor-pointer border-green-500 ${
                  isDragActive && "bg-green-100 text-green-500"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="flex flex-col items-center justify-center rounded-lg">
                    <Upload
                      className={`w-10 h-10 mb-2 text-gray-400 ${
                        file && "text-green-500"
                      }`}
                    />
                    <p className="text-gray-400 text-sm text-center">
                      Drop the audio file here ...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg">
                    <Upload
                      className={`w-10 h-10 mb-2 text-gray-400 ${
                        file && "text-green-500"
                      }`}
                    />
                    <p className="text-gray-400 text-sm text-center">
                      Drag your audio file or just click here. (.mp3 and .wav
                      files supported only)
                    </p>
                  </div>
                )}
                {file && (
                  <p className="mt-2 text-green-500">
                    Selected file: {file.name}
                  </p>
                )}
              </motion.div>

              {/* Form fields */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-600 font-serif text-lg">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter podcast title"
                        className="font-serif text-gray-700"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the title of your podcast episode.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-600 font-serif text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter podcast description"
                        className="resize-none font-serif text-gray-700"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of your podcast episode.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-600 font-serif text-lg">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags (comma-separated)"
                        className="font-serif text-gray-700"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add relevant tags to help categorize your podcast.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New: Progress bar */}
              {isLoading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-green-600 h-full"
                    initial={{ width: 0 }}
                    animate={progressControls}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white font-serif transition-all duration-300 ${
                  isLoading
                    ? "cursor-not-allowed opacity-80"
                    : "hover:bg-green-500"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading... {Math.round(uploadProgress)}%</span>
                  </>
                ) : (
                  <span>Upload Podcast</span>
                )}
              </motion.button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
