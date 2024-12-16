"use client";

import VideoPlayer from "./VideoComponent";
import { JoinWaitingList } from "./Join-waiting-list-btn";
import { useState } from "react";

const HeroSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-8 px-4 sm:py-12 md:py-16 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-gray-500 text-base sm:text-lg mb-2 font-thin">
              Podcast Analytics Reimagined
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-green-500">
              Chartable is Shutting Down. We&apos;re Your Solution.
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              With Chartable closing on December 12th, 2024, podcasters need a
              powerful new analytics tool. We&apos;re here to fill that gap.
            </p>

            {!submitted ? (
              <JoinWaitingList setSubmitted={setSubmitted} />
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md max-w-md mx-auto lg:mx-0">
                Thank you! you&apos;r added in the waiting list. We&apos;ll update you soon.
              </div>
            )}
          </div>

          {/* Right Video */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 shadow-green-500 shadow-2xl">
            <VideoPlayer src="/charts.mp4" poster="/charts.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
