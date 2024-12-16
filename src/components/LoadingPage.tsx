import { motion } from "framer-motion";
import { Headphones, BarChart2, Mic2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-8 max-w-md w-full"
      >
        {/* Logo Animation */}
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0 border-4 border-white rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <Headphones className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Analyzing Your Podcasts
        </motion.h2>

        {/* Progress Bar */}
        <motion.div className="w-full bg-white bg-opacity-30 rounded-full h-2 md:h-3">
          <motion.div
            className="bg-white h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Analytics Icons */}
        <div className="flex justify-center space-x-8">
          {[BarChart2, Mic2, Headphones].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
          ))}
        </div>

        {/* Loading Messages */}
        <motion.div
          className="text-sm md:text-base text-center"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        >
          <p className="mb-2">Crunching numbers...</p>
          <p>Discovering insights...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

