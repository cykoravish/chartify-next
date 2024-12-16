"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Bar, Pie } from "react-chartjs-2";
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
    return (
      <div>
        <DashboardSkeleton />
      </div>
    );
  }

  const totalDownloads = podcasts.reduce(
    (sum, podcast) => sum + podcast.analytics?.totalDownloads,
    0
  );
  const totalPlays = podcasts.reduce(
    (sum, podcast) => sum + podcast.analytics?.totalPlays,
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
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-green-500">
            see your podscasts analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/podcasts">
              <button className="bg-green-500 text-white py-2 px-3 rounded-lg font-medium hover:text-green-600 border border-green-500 hover:bg-green-300">
                see your podscasts analytics
              </button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
          <CardTitle className="text-green-500">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDownloads}</div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
          <CardTitle className="text-green-500">Total Plays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPlays}</div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
          <CardTitle className="text-green-500">Downloads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={downloadData} />
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
          <CardTitle className="text-green-500">Plays by Podcast</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={playData} />
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
          <CardTitle className="text-green-500">Listener Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={demographicData} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
