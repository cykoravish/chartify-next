import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PodcastDetails } from "@/components/podcasts/podcast-details";
import { PodcastDetailsSkeleton } from "@/components/podcasts/podcast-details-skeleton";

export default function PodcastDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Podcast Details"
        text={`View performance metrics for podcast ID: ${params.id}`}
      />
      <Suspense fallback={<PodcastDetailsSkeleton />}>
        <PodcastDetails id={params.id} />
      </Suspense>
    </DashboardShell>
  );
}
