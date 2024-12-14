// components/LoadingPage.tsx
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-black text-white">
      {/* Animated Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center space-y-8"
      >
        {/* Rotating Circle */}
        <motion.div
          className="relative w-40 h-40 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"
          style={{ animationDuration: "2s" }}
        ></motion.div>

        {/* Bouncing Text */}
        <motion.div
          className="text-2xl font-semibold"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Analyzing Your Podcasts...
        </motion.div>

        {/* Analytics Bars */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((bar, idx) => (
            <motion.div
              key={idx}
              className="w-2 bg-purple-500 rounded"
              initial={{ height: "10px" }}
              animate={{ height: ["10px", "50px", "10px"] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: idx * 0.2,
              }}
            ></motion.div>
          ))}
        </div>

        {/* Podcast Icon */}
        <motion.div
          className="text-xl flex items-center justify-center space-x-2"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            type: "spring",
          }}
        >
          🎙️ <span>Loading Insights</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
