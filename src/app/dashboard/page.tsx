import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { Dashboard } from '@/components/Dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="View your podcast analytics at a glance."
      >
        <Button asChild>
          <Link href="/podcasts/upload">Upload New Podcast</Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <Suspense fallback={<div>Loading analytics...</div>}>
          <Dashboard />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

