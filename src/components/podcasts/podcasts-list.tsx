'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Podcast {
  _id: string
  title: string
  description: string
  fileUrl: string
  createdAt: string
}

export function PodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await fetch('/api/podcasts')
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts')
        }
        const data = await response.json()
        setPodcasts(data)
      } catch (error) {
        console.error('Error fetching podcasts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPodcasts()
  }, [])

  if (loading) {
    return <div>Loading podcasts...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {podcasts.map((podcast, index) => (
        <motion.div
          key={podcast._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="truncate">{podcast.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{podcast.description}</p>
              <audio controls className="w-full mb-4">
                <source src={podcast.fileUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  Uploaded on {new Date(podcast.createdAt).toLocaleDateString()}
                </p>
                <Button asChild size="sm">
                  <Link href={`/podcasts/${podcast._id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

