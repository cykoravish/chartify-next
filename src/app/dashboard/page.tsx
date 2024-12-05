import { Suspense } from 'react'
import { DashboardHeader } from '@/components/DashboardHeader'
import { DashboardContent } from '@/components/DashboardContent'
import { DashboardSkeleton } from '@/components/DashboardSkeleton'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Podcast Analytics Dashboard</h1>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  )
}

