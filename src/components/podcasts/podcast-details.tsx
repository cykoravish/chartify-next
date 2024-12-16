"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Play, Pause, Clock, Tag, User } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { PodcastDetailsSkeleton } from "./podcast-details-skeleton";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface PodcastDetailsProps {
  id: string;
}

interface Podcast {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  duration: number;
  tags: string[];
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  analytics: {
    listens: number;
    shares: number;
  };
  createdAt: string;
}


interface Analytics {
  totalDownloads: number;
  totalPlays: number;
  listenerDemographics: {
    age: {
      '18-24': number;
      '25-34': number;
      '35-44': number;
      '45-54': number;
      '55+': number;
    };
    gender: {
      male: number;
      female: number;
      other: number;
    };
  };
  geographicalData: Array<{ country: string; count: number }>;
  listeningDuration: {
    total: number;
    average: number;
  };
  deviceInfo: Array<{ device: string; count: number }>;
  platformInfo: Array<{ platform: string; count: number }>;
}


export function PodcastDetails({ id }: PodcastDetailsProps) {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const { data: session } = useSession();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   const fetchPodcast = async () => {
  //     try {
  //       const response = await fetch(`/api/podcasts/${id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch podcast");
  //       }
  //       const data = await response.json();
  //       setPodcast(data);

  //       // Create audio element to get duration
  //       const audio = new Audio(data.fileUrl);
  //       audio.addEventListener('loadedmetadata', () => {
  //         setDuration(Math.round(audio.duration));
  //       });
  //     } catch (error) {
  //       console.error("Error fetching podcast:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to fetch podcast details.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   fetchPodcast();
  // }, [id]);

  useEffect(() => {
    const fetchPodcastAndAnalytics = async () => {
      try {
        const [podcastResponse, analyticsResponse] = await Promise.all([
          fetch(`/api/podcasts/${id}`),
          fetch(`/api/analytics/${id}`)
        ]);

        if (!podcastResponse.ok || !analyticsResponse.ok) {
          throw new Error("Failed to fetch podcast or analytics");
        }

        const podcastData = await podcastResponse.json();
        const analyticsData = await analyticsResponse.json();

        setPodcast(podcastData);
        setAnalytics(analyticsData);

        // Create audio element to get duration
        const audio = new Audio(podcastData.fileUrl);
        audio.addEventListener('loadedmetadata', () => {
          setDuration(Math.round(audio.duration));
        });
      } catch (error) {
        console.error("Error fetching podcast or analytics:", error);
        toast({
          title: "Error",
          description: "Failed to fetch podcast details or analytics.",
          variant: "destructive",
        });
      }
    };

    fetchPodcastAndAnalytics();
  }, [id]);

  useEffect(() => {
    if (podcast) {
      audioRef.current = new Audio(podcast.fileUrl);
    }
  }, [podcast]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlay = async () => {
    togglePlayPause();
    // Record play event
    await fetch(`/api/analytics/${id}/play`, { method: 'POST' });
  };

  const handleDownload = async () => {
    // Record download event
    await fetch(`/api/analytics/${id}/download`, { method: 'POST' });
    // Trigger download
    window.open(podcast?.fileUrl, '_blank');
  };

  const handleShare = async () => {
    if (podcast) {
      const shareUrl = `${window.location.origin}/podcasts/${podcast._id}`;
      try {
        await navigator.share({
          title: podcast.title,
          text: podcast.description,
          url: shareUrl,
        });
        await fetch(`/api/analytics/${id}/share`, { method: 'POST' });
       
        toast({
          title: "Shared successfully",
          description: "The podcast link has been shared.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied",
          description: "The podcast link has been copied to your clipboard.",
        });
      }
    }
  };

  if (!podcast) {
    return <div><PodcastDetailsSkeleton/></div>;
  }

    { console.log("analytics: ", analytics)}
    // Prepare chart data
    const ageData = {
      labels: Object.keys(analytics.listenerDemographics.age),
      datasets: [{
        data: Object.values(analytics.listenerDemographics.age),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    };

    const genderData = {
      labels: Object.keys(analytics.listenerDemographics.gender),
      datasets: [{
        data: Object.values(analytics.listenerDemographics.gender),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }]
    };
  
    const deviceData = {
      labels: analytics.deviceInfo.map(item => item.device),
      datasets: [{
        label: 'Device Usage',
        data: analytics.deviceInfo.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardTitle className="text-3xl font-bold">{podcast.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar className="w-12 h-12 border-2 border-green-500">
                <AvatarImage src={podcast.user.image} alt={podcast.user.name} />
                <AvatarFallback>{podcast.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{podcast.user.name}</p>
                <p className="text-sm text-gray-500">{podcast.user.email}</p>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {podcast.description}
            </motion.p>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={togglePlayPause}
                className="bg-green-500 hover:bg-green-600 transform transition hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="mr-2" />
                ) : (
                  <Play className="mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button 
                onClick={handleShare} 
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 transform transition hover:scale-105"
              >
                <Share2 className="mr-2" />
                Share
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center">
                <Clock className="mr-2 text-green-500" />
                <span>
                  {duration ? `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}` : "Loading..."}
                </span>
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 text-green-500" />
                <span>{podcast.tags.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 text-green-500" />
                <span>{podcast.analytics?.listens || 0} listens</span>
              </div>
              <div className="flex items-center">
                <Share2 className="mr-2 text-green-500" />
                <span>{podcast.analytics?.shares || 0} shares</span>
              </div>
            </motion.div>
          </CardContent>
          <CardContent className="space-y-6 p-6">
            <h3 className="text-2xl font-bold">Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Downloads</CardTitle>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-center">
                  {analytics.totalDownloads}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Plays</CardTitle>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-center">
                  {analytics.totalPlays}
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Age Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie data={ageData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Gender Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie data={genderData} />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={deviceData} />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

