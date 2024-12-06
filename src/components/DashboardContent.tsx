"use client";
import { useEffect, useState } from "react";

import {
  ChartContainer
} from "@/components/ui/chart";


export function DashboardContent() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Total Listeners</h2>
        <p className="text-3xl font-bold">
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Average Listen Time</h2>
        <p className="text-3xl font-bold"></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Episode</h2>
        <p className="text-xl"></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow col-span-full">
        <h2 className="text-xl font-semibold mb-4">Listener Trend</h2>
        <ChartContainer
          config={{
            listeners: {
              label: "Listeners",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <div>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
