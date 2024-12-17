import React, { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PodcastDetails } from "@/components/podcasts/podcast-details";
import { PodcastDetailsSkeleton } from "@/components/podcasts/podcast-details-skeleton";
import Footer from "@/components/Footer";

export default function PodcastDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = React.use(params)
  return (
    <div className="px-4">
      <DashboardShell>
        <DashboardHeader
          heading="Podcast Details"
          text={`View details and analytics for this podcast`}
        />
        <Suspense fallback={<PodcastDetailsSkeleton />}>
          <PodcastDetails id={id} />
        </Suspense>
      </DashboardShell>
      <Footer/>
    </div>
  );
}

