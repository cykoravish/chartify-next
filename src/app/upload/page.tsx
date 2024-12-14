import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { UploadPodcastForm } from '@/components/upload/upload-podcast-form'

export default function UploadPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Upload Podcast"
        text="Upload a new podcast episode to your channel."
      />
      <UploadPodcastForm />
    </DashboardShell>
  )
}

