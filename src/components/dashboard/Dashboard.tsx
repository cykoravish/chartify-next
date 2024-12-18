"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSkeleton } from "./skeleton";
import Link from "next/link";
import { ArrowUpRight, Headphones, Download, Share2, Users } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const [podcasts, setPodcasts] = useState([]);
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
    return <DashboardSkeleton />;
  }
  console.log("podcasts: ", podcasts);
  const totalDownloads = podcasts.reduce(
    (sum, podcast) => sum + podcast.analytics?.totalDownloads,
    0
  );
  const totalPlays = podcasts.reduce(
    (sum, podcast) => sum + podcast.analytics?.totalPlays,
    0
  );
  const totalShares = podcasts.reduce(
    (sum, podcast) => sum + podcast.analytics?.totalShares,
    0
  );

  const downloadData = {
    labels: podcasts.map((podcast) => podcast.title),
    datasets: [
      {
        label: "Downloads",
        data: podcasts.map((podcast) => podcast.analytics?.totalDownloads),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const playData = {
    labels: podcasts.map((podcast) => podcast.title),
    datasets: [
      {
        label: "Plays",
        data: podcasts.map((podcast) => podcast.analytics?.totalPlays),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const demographicData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        data: [
          podcasts.reduce(
            (sum, podcast) =>
              sum + podcast.analytics?.listenerDemographics.age["18-24"],
            0
          ),
          podcasts.reduce(
            (sum, podcast) =>
              sum + podcast.analytics?.listenerDemographics.age["25-34"],
            0
          ),
          podcasts.reduce(
            (sum, podcast) =>
              sum + podcast.analytics?.listenerDemographics.age["35-44"],
            0
          ),
          podcasts.reduce(
            (sum, podcast) =>
              sum + podcast.analytics?.listenerDemographics.age["45-54"],
            0
          ),
          podcasts.reduce(
            (sum, podcast) =>
              sum + podcast.analytics?.listenerDemographics.age["55+"],
            0
          ),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  const topPodcasts = podcasts
    .sort((a, b) => b.analytics.totalPlays - a.analytics.totalPlays)
    .slice(0, 5);

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-[300px] sm:h-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-green-600">
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Plays</p>
                <p className="text-lg sm:text-2xl font-bold">
                  {totalPlays.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Download className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Total Downloads
                </p>
                <p className="text-lg sm:text-2xl font-bold">
                  {totalDownloads.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Shares</p>
                <p className="text-lg sm:text-2xl font-bold">
                  {totalShares.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-[300px] sm:h-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-green-600">
              Downloads Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px]">
            <Line
              data={downloadData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
              }}
            />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="h-[300px] sm:h-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-green-600">
              Listener Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px]">
            <Doughnut
              data={demographicData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                },
              }}
            />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="h-[300px] sm:h-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-green-600">
              Plays by Podcast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px]">
            <Bar
              data={playData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
              }}
            />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="h-[300px] sm:h-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-green-600">
              Top Performing Podcasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {topPodcasts.map((podcast, index) => (
                <li
                  key={podcast._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base sm:text-lg font-bold text-gray-500">
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm truncate">
                      {podcast.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-medium">
                      {podcast.analytics.totalPlays} plays
                    </span>
                    <Link href={`/podcasts/${podcast._id}`}>
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

