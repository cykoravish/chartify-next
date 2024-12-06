import { Suspense } from 'react'
import { AnalyticsContent } from '@/components/analyticsContent'
import { EmailList } from '@/components/emailList'

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Podcast Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading analytics...</div>}>
            <AnalyticsContent />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading email list...</div>}>
            <EmailList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

