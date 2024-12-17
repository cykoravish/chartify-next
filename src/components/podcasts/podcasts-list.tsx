"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { PodcastsListSkeleton } from "./podcasts-list-skeleton";
import {
  Upload,
  Play,
  Pause,
  BarChart2,
  Download,
  Clock,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Podcast {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  analytics: {
    totalPlays: number;
    totalDownloads: number;
  };
}

export function PodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [duration, setDuration] = useState<{ [key: string]: number }>({});
  const [isMuted, setIsMuted] = useState<{ [key: string]: boolean }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const { updateAnalytics } = useAnalytics();
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

  const togglePlay = (podcast: Podcast) => {
    const audioElement = audioRefs.current[podcast._id];

    if (playingId === podcast._id) {
      audioElement.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing audio
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio && !audio.paused) {
          audio.pause();
        }
      });

      audioElement.play();
      setPlayingId(podcast._id);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeUpdate = (podcast: Podcast) => {
    const audioElement = audioRefs.current[podcast._id];
    const progressPercentage =
      (audioElement.currentTime / audioElement.duration) * 100;
    setProgress((prev) => ({
      ...prev,
      [podcast._id]: progressPercentage,
    }));
  };

  const handleLoadedMetadata = (podcast: Podcast) => {
    const audioElement = audioRefs.current[podcast._id];
    setDuration((prev) => ({
      ...prev,
      [podcast._id]: audioElement.duration,
    }));
  };

  const toggleMute = (podcast: Podcast) => {
    const audioElement = audioRefs.current[podcast._id];
    audioElement.muted = !audioElement.muted;
    setIsMuted((prev) => ({
      ...prev,
      [podcast._id]: audioElement.muted,
    }));
  };

  const handleSeek = (
    podcast: Podcast,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const audioElement = audioRefs.current[podcast._id];
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * audioElement.duration;

    audioElement.currentTime = seekTime;
  };

  if (loading) {
    return <PodcastsListSkeleton />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {podcasts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center"
        >
          <h1 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
            No Podcasts Uploaded
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start sharing your content with the world and track your analytics
            in real-time!
          </p>
          <Link href="/podcasts/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 py-2 px-4 rounded-lg text-white hover:bg-green-500 font-medium transition-all duration-300 transform"
            >
              <Upload className="w-5 h-5 inline mr-2" /> Upload Your First
              Podcast
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        podcasts.map((podcast, index) => (
          <motion.div
            key={podcast._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[podcast._id] = el;
                }}
                src={podcast.fileUrl}
                onTimeUpdate={() => handleTimeUpdate(podcast)}
                onLoadedMetadata={() => handleLoadedMetadata(podcast)}
                onEnded={() => setPlayingId(null)}
              />
              <CardHeader className="relative">
                <CardTitle className="text-xl text-green-600 truncate">
                  {podcast.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 flex items-center justify-between">
                  <span>
                    Uploaded on{" "}
                    {new Date(podcast.createdAt).toLocaleDateString()}
                  </span>
                  {duration[podcast._id] && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">
                        {formatTime(duration[podcast._id])}
                      </span>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {podcast.description}
                  </p>

                  {/* Audio Controls */}
                  <div className="relative mb-4">
                    {/* Progress Bar */}
                    <div
                      className="w-full bg-green-100 h-1.5 rounded-full cursor-pointer"
                      onClick={(e) => handleSeek(podcast, e)}
                    >
                      <motion.div
                        className="bg-green-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress[podcast._id] || 0}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => togglePlay(podcast)}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-500 transition-colors duration-200"
                        >
                          {playingId === podcast._id ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play
                              className="w-6 h-6"
                              onClick={() => updateAnalytics("play", podcast._id)}
                            />
                          )}
                          <span>
                            {playingId === podcast._id ? "Pause" : "Play"}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleMute(podcast)}
                          className="text-green-500 hover:text-green-600"
                        >
                          {isMuted[podcast._id] ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </motion.button>
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Play className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {podcast.analytics.totalPlays}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {podcast.analytics.totalDownloads}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Analytics Button */}
                <div className="flex justify-between items-center mt-4">
                  <Link href={`/podcasts/${podcast._id}`}>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#dcfce7",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200"
                    >
                      <BarChart2 className="w-4 h-4" />
                      <span>View Analytics</span>
                    </motion.button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}
