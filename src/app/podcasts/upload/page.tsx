import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { PodcastUpload } from '@/components/podcasts/podcast-upload'

export default function UploadPodcastPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Upload Podcast"
        text="Upload a new podcast episode to your channel."
      />
      <div className="grid gap-8">
        <PodcastUpload />
      </div>
    </DashboardShell>
  )
}

