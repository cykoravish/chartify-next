"use client"
import { useEffect, useState } from "react";
import { Line } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PodcastUpload } from "./PodcastUpload";
import { PodcastPlayer } from "./PodcastPlayer";

interface PodcastData {
  totalListeners: number;
  averageListenTime: string;
  topEpisode: string;
  listenerTrend: { date: string; listeners: number }[];
  latestPodcast: {
    title: string;
    url: string;
  } | null;
}

export function DashboardContent() {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/podcast-data");
      const data = await response.json();
      setPodcastData(data);
    };

    fetchData();
  }, []);

  if (!podcastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Listeners</h2>
        <p className="text-3xl font-bold">
          {podcastData.totalListeners.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Average Listen Time</h2>
        <p className="text-3xl font-bold">{podcastData.averageListenTime}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Episode</h2>
        <p className="text-xl">{podcastData.topEpisode}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow col-span-full">
        <h2 className="text-xl font-semibold mb-4">Listener Trend</h2>
        <ChartContainer
          config={{
            listeners: {
              label: "Listeners",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <>
            <Line
              data={podcastData.listenerTrend}
              type="monotone"
              dataKey="listeners"
              stroke="var(--color-listeners)"
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </>
        </ChartContainer>
      </div>
      <div className="col-span-full">
        <PodcastUpload />
      </div>
      {podcastData.latestPodcast && (
        <div className="col-span-full">
          <PodcastPlayer
            src={podcastData.latestPodcast.url}
            title={podcastData.latestPodcast.title}
          />
        </div>
      )}
    </div>
  );
}
