"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Headphones, Zap, Star } from "lucide-react";
import Image from "next/image";
import PaymentModal from "@/components/PaymentModal";
import Footer from "@/components/Footer";

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for casual listeners",
    features: [
      "Ad-free listening",
      "Unlimited skips",
      "High-quality audio",
      "Basic analytics",
      "24/7 customer support",
    ],
    icon: Headphones,
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "For the podcast enthusiasts",
    features: [
      "All Basic features",
      "Exclusive content",
      "Early access to episodes",
      "Offline listening",
      "Advanced analytics",
      "Collaborative playlists",
    ],
    icon: Zap,
    popular: true,
  },
  {
    name: "Premium",
    price: "$29.99",
    description: "The ultimate podcast experience",
    features: [
      "All Pro features",
      "Live Q&A sessions",
      "Personal podcast recommendations",
      "Priority customer support",
      "Custom branded podcasts",
      "API access",
    ],
    icon: Star,
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Get ready for an immersive podcast experience. Early subscribers get
            20% off premium features!
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <Badge
              variant="secondary"
              className="text-lg px-4 py-2 bg-green-600 hover:bg-green-500 text-white"
            >
              🎉 Early Bird Offer: 20% OFF Premium Features 🎉
            </Badge>
          </motion.div>
          <p className="mt-4 text-red-500 font-semibold">
            Hurry! Offer ends in 24 hours!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 lg:gap-x-8"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`flex flex-col justify-between h-full cursor-pointer ${
                  tier.popular
                    ? "border-green-500 dark:border-green-400 border-2"
                    : ""
                }`}
                onClick={() => handleSelectTier(tier)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">
                      {tier.name}
                    </CardTitle>
                    <tier.icon className="h-8 w-8 text-green-500" />
                  </div>
                  <CardDescription className="text-xl font-semibold">
                    {tier.price}/month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {tier.description}
                  </p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.popular ? "Get Started" : "Choose Plan"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Why Choose Our Platform?
          </h2>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8">
            <Image
              src="/podcast-studio.jpg"
              alt="Podcast Studio"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <ul className="text-left space-y-4">
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Check className="h-6 w-6 text-green-500 mr-2" />
                <span>High-quality, curated content</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Check className="h-6 w-6 text-green-500 mr-2" />
                <span>Exclusive interviews and behind-the-scenes</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Check className="h-6 w-6 text-green-500 mr-2" />
                <span>Personalized recommendations</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Check className="h-6 w-6 text-green-500 mr-2" />
                <span>Ad-free listening experience</span>
              </motion.li>
            </ul>
          </div>
        </motion.div>

        <AnimatePresence>
          {isPaymentModalOpen && selectedTier && (
            <PaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              selectedTier={selectedTier}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
