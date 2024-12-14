import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { PodcastsList } from '@/components/podcasts/podcasts-list'
import { PodcastsListSkeleton } from '@/components/podcasts/podcasts-list-skeleton'
import { AddPodcastButton } from '@/components/podcasts/add-podcast-button'

export default function PodcastsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Podcasts" text="Manage your podcasts.">
        <AddPodcastButton />
      </DashboardHeader>
      <Suspense fallback={<PodcastsListSkeleton />}>
        <PodcastsList />
      </Suspense>
    </DashboardShell>
  )
}

