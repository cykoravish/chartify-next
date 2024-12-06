'use client'

import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/podback.jpg"
          alt="Podcast Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl relative z-10"
      >
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-center text-3xl font-extrabold text-white"
          >
            Sign in to your Podcast Account
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            className="mt-4 flex justify-center"
          >
            <Image
              src="/podcast-icon.png"
              alt="Podcast Icon"
              width={80}
              height={80}
              className="rounded-full"
            />
          </motion.div>
        </div>
        <LoginForm />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-white text-center"
        >
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-yellow-300 font-semibold hover:text-yellow-100 transition-colors">
            Sign Up
          </Link>
        </motion.h2>
      </motion.div>
    </div>
  );
}

