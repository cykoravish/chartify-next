'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const podcasts = [
  {
    id: '1',
    title: 'Tech Talk',
    downloads: 10000,
    thumbnail: '/placeholder.svg?height=100&width=100',
  },
  {
    id: '2',
    title: 'Science Hour',
    downloads: 8000,
    thumbnail: '/placeholder.svg?height=100&width=100',
  },
  {
    id: '3',
    title: 'History Unveiled',
    downloads: 6000,
    thumbnail: '/placeholder.svg?height=100&width=100',
  },
]

const podcastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
}

export function PodcastsList() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setView('grid')}
        >
          Grid
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setView('list')}
        >
          List
        </Button>
      </div>
      <div className={view === 'grid' ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
        {podcasts.map((podcast, i) => (
          <motion.div
            key={podcast.id}
            variants={podcastVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle>{podcast.title}</CardTitle>
                    <CardDescription>{podcast.downloads} downloads</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Add more podcast details here */}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/podcasts/${podcast.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

