import Link from 'next/link'

export function DashboardHeader() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-[#4b9ec1]">
          PodcastAnalytics
        </Link>
        <div>
          <Link href="/profile" className="text-gray-600 hover:text-gray-900 mr-4">
            Profile
          </Link>
          <button className="text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

