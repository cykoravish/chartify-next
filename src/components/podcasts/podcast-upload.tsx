/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
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
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a podcast file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("tags", values.tags);

    try {
      setIsLoading(true);
      const response = await fetch("/api/podcasts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload podcast");
      }

      const data = await response.json();

      toast({
        title: "Success",
        description: "Your podcast has been uploaded.",
      });
      router.push("/podcasts");
    } catch (error) {
      console.error("Error uploading podcast:", error);
      toast({
        title: "Error",
        description: "Failed to upload podcast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    Drag your audio file or just click here.
                  </p>
                </div>
              )}
              {file && (
                <p className="mt-2 text-green-500">
                  Selected file: {file.name}
                </p>
              )}
            </motion.div>

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
                  <span>Uploading...</span>
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
