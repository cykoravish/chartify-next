import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { PodcastUpload } from '@/components/podcasts/podcast-upload'

export default function UploadPodcastPage() {
  return (
    <div className='px-2 py-8'>
    <DashboardShell>
      <div className='ml-4'>
      <DashboardHeader
        heading="Upload Podcast"
        text="Upload a new podcast episode to your channel. The upload file must be a .mp3 or .wav file"
      />

      </div>
      <div className="py-5">
        <PodcastUpload />
      </div>
    </DashboardShell>

    </div>
  )
}

