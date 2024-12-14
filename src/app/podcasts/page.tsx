import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { PodcastsList } from '@/components/podcasts/podcasts-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PodcastsPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="My Podcasts" 
        text="View and manage your uploaded podcasts."
      >
        <Button asChild>
          <Link href="/podcasts/upload">Upload New Podcast</Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <Suspense fallback={<div>Loading podcasts...</div>}>
          <PodcastsList />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

