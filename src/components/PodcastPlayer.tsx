"use client"

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Slider } from "@/components/ui/slider"

interface PodcastPlayerProps {
  src: string
  title: string
}

export function PodcastPlayer({ src, title }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (newValue: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const [newTime] = newValue
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <audio ref={audioRef} src={src} />
      <div className="flex items-center justify-between mb-4">
        <button onClick={skipBackward} className="p-2">
          <SkipBack className="w-6 h-6" />
        </button>
        <button onClick={togglePlayPause} className="p-2">
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </button>
        <button onClick={skipForward} className="p-2">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center">
        <span className="w-12 text-sm">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
          className="flex-grow mx-4"
        />
        <span className="w-12 text-sm text-right">{formatTime(duration)}</span>
      </div>
    </div>
  )
}

