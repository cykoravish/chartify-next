import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { MonthlyGrowthChart } from "@/components/dashboard/monthly-growth";
import { DashboardSkeleton } from "@/components/dashboard/skeleton";
import { DashboardCards } from "@/components/dashboard/cards";
import { TopEpisodes } from "@/components/dashboard/top-episodes";
import Link from "next/link";
import { Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="pt-8 px-2">
      <DashboardShell>
        <DashboardHeader
          heading="Dashboard"
          text="View your podcast analytics at a glance."
        >
          <Link href="/podcasts/upload">
            <button className="bg-green-600 py-2 px-3 rounded-lg text-white hover:bg-green-500 font-medium">
            <Upload className="w-5 h-5 inline mr-2" />
            Upload Podcast
            </button>
          </Link>
        </DashboardHeader>
        <div className="grid gap-8">
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
            {/* <MonthlyGrowthChart/>
          <DashboardCards/>
          <TopEpisodes/> */}
          </Suspense>
        </div>
      </DashboardShell>
    </div>
  );
}
