// import { useTheme } from "next-themes"
// const { theme, setTheme } = useTheme()




import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { DashboardCards } from '@/components/dashboard/cards'
import { MonthlyGrowthChart } from '@/components/dashboard/monthly-growth'
import { TopEpisodes } from '@/components/dashboard/top-episodes'
import { DashboardSkeleton } from '@/components/dashboard/skeleton'
export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="View your podcast analytics at a glance."
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <MonthlyGrowthChart className="col-span-4" />
          <TopEpisodes className="col-span-3" />
        </div>
      </Suspense>
    </DashboardShell>
  )
}

