'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Headphones, Zap, Star } from 'lucide-react'
import Image from 'next/image'

const tiers = [
  {
    name: 'Basic',
    price: '$9.99',
    description: 'Perfect for casual listeners',
    features: [
      'Ad-free listening',
      'Unlimited skips',
      'High-quality audio',
    ],
    icon: Headphones,
  },
  {
    name: 'Pro',
    price: '$19.99',
    description: 'For the podcast enthusiasts',
    features: [
      'All Basic features',
      'Exclusive content',
      'Early access to episodes',
      'Offline listening',
    ],
    icon: Zap,
    popular: true,
  },
  {
    name: 'Premium',
    price: '$29.99',
    description: 'The ultimate podcast experience',
    features: [
      'All Pro features',
      'Live Q&A sessions',
      'Personal podcast recommendations',
      'Priority customer support',
    ],
    icon: Star,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
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
          Get ready for an immersive podcast experience. Early subscribers get 20% off premium features!
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🎉 Early Bird Offer: 20% OFF Premium Features 🎉
          </Badge>
        </motion.div>
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
          >
            <Card className={`flex flex-col justify-between h-full ${tier.popular ? 'border-purple-500 dark:border-purple-400 border-2' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <tier.icon className="h-8 w-8 text-purple-500" />
                </div>
                <CardDescription className="text-xl font-semibold">{tier.price}/month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                  {tier.popular ? 'Get Started' : 'Choose Plan'}
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
            <li className="flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              <span>High-quality, curated content</span>
            </li>
            <li className="flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              <span>Exclusive interviews and behind-the-scenes</span>
            </li>
            <li className="flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              <span>Personalized recommendations</span>
            </li>
            <li className="flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              <span>Ad-free listening experience</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

