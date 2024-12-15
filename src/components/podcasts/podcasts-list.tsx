"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PodcastsListSkeleton } from "./podcasts-list-skeleton";
import { DashboardCards } from "../dashboard/cards";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Upload } from "lucide-react";

interface Podcast {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
}

export function PodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await fetch("/api/podcasts");
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <div>
        <PodcastsListSkeleton />
      </div>
    );
  }

  return (
    <div>
      {podcasts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 text-center pt-14 font-serif">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-green-500 shadow-lg max-w-lg w-full"
          >
            <h1 className="text-xl font-semibold text-green-600 dark:text-gray-200 mb-4">
              No Podcasts Uploaded
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              You haven&apos;t uploaded any podcasts yet. Start sharing your
              content with the world! And see the real time analytics.
            </p>

            <Link href="/podcasts/upload">
              <button className="bg-green-600 py-2 px-3 rounded-lg text-white hover:bg-green-500 font-medium font-serif">
                <Upload className="w-5 h-5 inline mr-2" /> Upload Podcast
              </button>
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-16 font-serif">
          {podcasts.map((podcast, index) => (
            <motion.div
              key={podcast._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="truncate text-green-500">
                    {podcast.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {podcast.description}
                  </p>
                  <audio controls className="w-full mb-4">
                    <source src={podcast.fileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      Uploaded on{" "}
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </p>
                    <Link href={`/podcasts/${podcast._id}`}>
                      <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-serif">
                        View Details
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
