import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PodcastsList } from "@/components/podcasts/podcasts-list";
import { PodcastsListSkeleton } from "@/components/podcasts/podcasts-list-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload } from "lucide-react";
import Footer from "@/components/Footer";

export default function PodcastsPage() {
  return (
    <>
      <div className="py-6 px-4">
        <DashboardShell>
          <DashboardHeader
            heading="My Podcasts"
            text="View and manage your uploaded podcasts."
          >
            <Link href="/podcasts/upload">
              <button className="bg-green-600 py-2 px-3 rounded-lg text-white hover:bg-green-500 font-medium font-serif">
                <Upload className="w-5 h-5 inline mr-2" /> Upload Podcast
              </button>
            </Link>
          </DashboardHeader>
          <div className="grid gap-8">
            <Suspense
              fallback={
                <div>
                  <PodcastsListSkeleton />
                </div>
              }
            >
              <PodcastsList />
            </Suspense>
          </div>
        </DashboardShell>
      </div>
      <Footer />
    </>
  );
}
