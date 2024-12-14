import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { AdvancedAnalytics } from '@/components/analytics/advanced-analytics'
import { AdvancedAnalyticsSkeleton } from '@/components/analytics/advanced-analytics-skeleton'

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Advanced Analytics"
        text="Dive deep into your podcast performance metrics."
      />
      <Suspense fallback={<AdvancedAnalyticsSkeleton />}>
        <AdvancedAnalytics />
      </Suspense>
    </DashboardShell>
  )
}

