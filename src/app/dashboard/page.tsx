import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardSkeleton } from "@/components/dashboard/skeleton";
import Link from "next/link";
import { Upload } from 'lucide-react';
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <DashboardShell>
          <DashboardHeader
            heading="Podcast Analytics Dashboard"
            text="Get insights into your podcast performance"
          >
            <Link href="/podcasts/upload">
              <button className="bg-green-600 py-2 px-3 sm:px-4 rounded-lg text-white hover:bg-green-500 font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                Upload Podcast
              </button>
            </Link>
          </DashboardHeader>
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        </DashboardShell>
      </div>
      <Footer />
    </div>
  );
}

