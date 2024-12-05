'use client'

import { useRef, useEffect } from 'react'

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        controls
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

