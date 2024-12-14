"use client";
import { useState } from "react";
import VideoPlayer from "./VideoComponent";
import { LoaderCircle } from "lucide-react";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await fetch("/api/earlyuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#fdfcf8] py-8 px-4 sm:py-12 md:py-16 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-gray-500 text-base sm:text-lg mb-2 font-thin">
              Podcast Analytics Reimagined
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-[#4b9ec1]">
              Chartable is Shutting Down. We&apos;re Your Solution.
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              With Chartable closing on December 12th, 2024, podcasters need a
              powerful new analytics tool. We&apos;re here to fill that gap.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
              >
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none placeholder:text-sm focus:border-[#4b9ec1] text-sm sm:text-base"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#75d156] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#81eb5d] font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Get Early Access"
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md max-w-md mx-auto lg:mx-0">
                Thank you! We&apos;ll keep you updated on our launch.
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-600 max-w-md mx-auto lg:mx-0">
                {error}
              </div>
            )}
          </div>

          {/* Right Video */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <VideoPlayer src="/charts.mp4" poster="/charts.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
