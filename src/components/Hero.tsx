"use client";
import Image from "next/image";
import computerImage from "/public/charts.png";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement actual email collection logic
    setSubmitted(true);
  };

  return (
    <section className="bg-[#fdfcf8] py-10 px-4 lg:py-20 lg:px-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left Content */}
      <div className="text-left lg:w-1/2 mb-8 lg:mb-0">
        <h1 className="text-gray-500 text-lg mb-2 font-thin">
          Podcast Analytics Reimagined
        </h1>
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-[#4b9ec1]">
          Chartable is Shutting Down. We&apos;re Your Solution.
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          With Chartable closing on December 12th, 2024, podcasters need a
          powerful new analytics tool. We&apos;re here to fill that gap.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email for early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#4b9ec1]"
            />
            <button
              type="submit"
              className="bg-[#75d156] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#81eb5d] font-semibold"
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
            Thank you! We&apos;ll keep you updated on our launch.
          </div>
        )}
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2">
        <Image
          src={computerImage}
          alt="Computer with podcast analytics charts"
          className="w-full max-w-md mx-auto"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
