'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Headphones, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <Headphones className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Oops! Looks like this podcast episode is missing.
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="inline-flex items-center bg-white text-green-600 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-green-100">
            <ArrowLeft className="mr-2" />
            Back to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

