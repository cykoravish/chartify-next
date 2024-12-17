"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Share2,
  Play,
  Pause,
  Download,
  BarChart2,
  Users,
  Globe,
  Clock,
  Smartphone,
  Laptop,
  // WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  // SpotifyIcon,
  InstagramIcon,
  Copy,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FaWhatsapp } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { useAnalytics } from "@/hooks/use-analytics";
import { PodcastDetailsSkeleton } from "./podcast-details-skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

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
  analytics: Analytics;
  createdAt: string;
}

interface Analytics {
  totalDownloads: number;
  totalPlays: number;
  totalShares: number;
  listenerDemographics: {
    age: {
      "18-24": number;
      "25-34": number;
      "35-44": number;
      "45-54": number;
      "55+": number;
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
  dailyListens: Array<{ date: string; count: number }>;
}

export function PodcastDetails({ id }: PodcastDetailsProps) {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { data: session } = useSession();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { updateAnalytics } = useAnalytics();

  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      link: (url: string) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      link: (url: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      link: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "Spotify",
      icon: FaSpotify,
      link: (url: string) =>
        `https://open.spotify.com/search/${encodeURIComponent(
          podcast?.title || ""
        )}`,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      link: (url: string) =>
        `https://www.instagram.com/share?url=${encodeURIComponent(url)}`,
    },
  ];

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`/api/podcasts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch podcast");
        }
        const data = await response.json();
        setPodcast(data);

        const audio = new Audio(data.fileUrl);
        audio.addEventListener("loadedmetadata", () => {
          setDuration(Math.round(audio.duration));
        });

        // Setup audio ref
        audioRef.current = audio;

        // Add event listeners for progress tracking
        audio.addEventListener("timeupdate", () => {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          setProgress(progressPercent);
          setCurrentTime(audio.currentTime);
        });
      } catch (error) {
        console.error("Error fetching podcast:", error);
        toast({
          title: "Error",
          description: "Failed to fetch podcast details.",
          variant: "destructive",
        });
      }
    };

    fetchPodcast();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [id]);

  useEffect(() => {
    if (podcast) {
      audioRef.current = new Audio(podcast.fileUrl);
    }
  }, [podcast]);

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        await updateAnalytics("play", id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = async () => {
    if (podcast) {
      await updateAnalytics("download", id);
      // window.open(podcast.fileUrl, "_blank");
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = podcast.fileUrl;
      link.download = `${podcast.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (podcast) {
      const shareUrl = `${window.location.origin}/podcasts/${podcast._id}`;
      
      // Open share modal instead of direct sharing
      setIsShareModalOpen(true);
      await updateAnalytics("share", id);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Podcast link copied to clipboard.",
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  if (!podcast) {
    return <PodcastDetailsSkeleton />;
  }

  const ageData = {
    labels: Object.keys(podcast.analytics.listenerDemographics.age),
    datasets: [
      {
        data: Object.values(podcast.analytics.listenerDemographics.age),
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

  const genderData = {
    labels: Object.keys(podcast.analytics.listenerDemographics.gender),
    datasets: [
      {
        data: Object.values(podcast.analytics.listenerDemographics.gender),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
      },
    ],
  };

  const deviceData = {
    labels: podcast.analytics.deviceInfo.map((item) => item.device),
    datasets: [
      {
        label: "Device Usage",
        data: podcast.analytics.deviceInfo.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const geographicalData = {
    labels: podcast.analytics.geographicalData.map((item) => item.country),
    datasets: [
      {
        label: "Geographical Distribution",
        data: podcast.analytics.geographicalData.map((item) => item.count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // const dailyListensData = {
  //   labels: podcast.analytics.dailyListens.map((item) => item.date),
  //   datasets: [
  //     {
  //       label: "Daily Listens",
  //       data: podcast.analytics.dailyListens.map((item) => item.count),
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       tension: 0.1,
  //       fill: false,
  //     },
  //   ],
  // };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
{/* Podcast Card with Audio Player */}
<Card className="w-full overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
            <CardTitle className="text-3xl font-bold">{podcast?.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Audio Progress Bar */}
            <div className="w-full h-1.5 bg-green-100 rounded-full mb-4">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                onClick={togglePlayPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isPlaying ? "Pause" : "Play"}
              </motion.button>
              
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center border-2 border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
              >
                <Download className="mr-2" />
                Download
              </motion.button>
              
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center border-2 border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
              >
                <Share2 className="mr-2" />
                Share
              </motion.button>
            </div>
          </CardContent>
        </Card>

         {/* Share Modal */}
         <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                Share Podcast
                <motion.button 
                  onClick={() => setIsShareModalOpen(false)}
                  whileHover={{ rotate: 90 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              {/* URL Copy Section */}
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  readOnly 
                  value={`${window.location.origin}/podcasts/${podcast?._id}`}
                  className="flex-grow p-2 border rounded-md"
                />
                <motion.button
                  onClick={() => copyToClipboard(`${window.location.origin}/podcasts/${podcast?._id}`)}
                  whileHover={{ scale: 1.1 }}
                >
                  <Copy className="h-5 w-5 text-green-500" />
                </motion.button>
              </div>

              {/* Social Share Platforms */}
              <div className="flex justify-center space-x-6 py-4">
                {socialPlatforms.map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.link(`${window.location.origin}/podcasts/${podcast?._id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <platform.icon className="h-8 w-8 text-green-500 hover:text-green-600" />
                  </motion.a>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <BarChart2 className="mr-2" />
                Listening Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Plays</span>
                <span className="text-2xl font-bold text-green-600">
                  {podcast.analytics.totalPlays}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Downloads</span>
                <span className="text-2xl font-bold text-blue-600">
                  {podcast.analytics.totalDownloads}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Listening Duration</span>
                <span className="text-2xl font-bold text-purple-600">
                  {Math.round(podcast.analytics.listeningDuration.average / 60)}{" "}
                  min
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Users className="mr-2" />
                Listener Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Age Distribution
                </h4>
                <Pie
                  data={ageData}
                  options={{ plugins: { legend: { position: "bottom" } } }}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Gender Distribution
                </h4>
                <Pie
                  data={genderData}
                  options={{ plugins: { legend: { position: "bottom" } } }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Globe className="mr-2" />
              Geographical Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={geographicalData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Smartphone className="mr-2" />
                Device Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Bar
                data={deviceData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Clock className="mr-2" />
                  Daily Listens
                </CardTitle>
              </CardHeader>
            </CardContent>
            {/* <CardContent>
              <Line
                data={dailyListensData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                      },
                    },
                  },
                }}
              />
            </CardContent> */}
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
