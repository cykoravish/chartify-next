"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { BarChartIcon as ChartBar, Users, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import EarlyAccessUsers from "@/components/EarlyAccessUsers";
import Footer from "@/components/Footer";

interface EarlyUser {
  id: string;
  email: string;
  name: string;
  image: string;
  subscriptionDate: string;
}

export default function AboutPage() {
  const [earlyUsers, setEarlyUsers] = useState<EarlyUser[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const fetchEarlyUsers = async () => {
      try {
        const response = await fetch("/api/earlyuser", {
          next: { revalidate: 0 },
          cache: "no-store",
        });
        const data = await response.json();
        setEarlyUsers(data);
      } catch (error) {
        console.error("Error fetching early users:", error);
      }
    };

    fetchEarlyUsers();
  }, []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const featureCards = [
    { icon: ChartBar, title: "Comprehensive Analytics", description: "Gain deep insights into your podcast's performance with our advanced analytics tools.", color: "green" },
    { icon: Users, title: "Audience Understanding", description: "Get to know your listeners better with detailed demographic and engagement data.", color: "blue" },
    { icon: Zap, title: "Growth Acceleration", description: "Leverage our tools to accelerate your podcast's growth and reach a wider audience.", color: "yellow" },
    { icon: TrendingUp, title: "Trend Analysis", description: "Stay ahead of the curve with our trend analysis and predictive insights.", color: "purple" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h1
              className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4"
              variants={itemVariants}
            >
              About Chartify
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Empowering podcasters with advanced analytics and insights
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 border border-green-500 hover:shadow-xl`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <feature.icon className={`text-green-500 h-12 w-12 text-${feature.color}-500 mb-4`} />
                <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16 relative overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <h2 className="text-3xl font-bold mb-4 text-center">Why Chartify?</h2>
            <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              As Chartable prepares to shut down, we&apos;ve created Chartify to fill the gap and provide podcasters with an even more powerful analytics tool. Our mission is to empower podcast creators with the insights they need to grow their audience and create impactful content.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With Chartify, you&apos;ll have access to state-of-the-art analytics, audience insights, and growth tools that will take your podcast to the next level. Join us in shaping the future of podcast analytics!
            </p>
            <motion.button
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full inline-flex items-center transition duration-300 hover:from-green-500 hover:to-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "1M+", label: "Podcasts Analyzed" },
                { number: "50B+", label: "Data Points Processed" },
                { number: "100K+", label: "Happy Creators" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-green-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="text-4xl font-bold text-green-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    {stat.number}
                  </motion.span>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <EarlyAccessUsers users={earlyUsers} />
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

