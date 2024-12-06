'use client'

import { motion } from "framer-motion"
import { DashboardContent } from "@/components/DashboardContent"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Podcast Dashboard
          </motion.h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </header>
        <DashboardContent />
      </motion.div>
    </div>
  )
}

