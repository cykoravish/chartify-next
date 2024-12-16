'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface EarlyUser {
  id: string;
  email: string;
  name: string;
  image: string;
  subscriptionDate: string;
}

interface EarlyAccessUsersProps {
  users: EarlyUser[];
}

export default function EarlyAccessUsers({ users }: EarlyAccessUsersProps) {
  const [selectedUser, setSelectedUser] = useState<EarlyUser | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  const popupVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div
      className="border border-green-500 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Early Access Users</h2>
      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {users.map((user) => (
          <motion.div
            key={user.id}
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative cursor-pointer transform transition-transform duration-200 hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedUser(user)}
            >
              <Image
                src={user.image}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full mb-2"
              />
              <motion.div
                className="absolute inset-0 bg-green-500 bg-opacity-30 rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <p className="text-sm text-center truncate w-full">{user.name}</p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full m-4"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedUser.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Subscribed on: {new Date(selectedUser.subscriptionDate).toLocaleDateString()}
              </p>
              <motion.button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedUser(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

