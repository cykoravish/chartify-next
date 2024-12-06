"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Search, LogOut, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const menuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NavLink:React.FC<any> = ({ href, children, onClick = () => {} }) => (
    <motion.div variants={linkVariants}>
      <Link
        href={href}
        className="text-[#4b9ec1] text-lg hover:underline transition-all flex items-center"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );

  return (
    <nav className="bg-[#fdfcf8] flex justify-between items-center px-4 py-4 lg:px-8 w-full relative z-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="text-black text-3xl font-cursive">
          Chartify
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden sm:flex items-center"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#4b9ec1] transition-colors"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden sm:flex space-x-6 text-[#4b9ec1] text-lg items-center"
      >
        <NavLink href="/">
          <Home size={20} className="mr-2" /> Home
        </NavLink>
        {status === "authenticated" && (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/analytics">Analytics</NavLink>
          </>
        )}
        <NavLink href="/pricing">Pricing</NavLink>
        {status === "authenticated" ? (
          <button
            onClick={handleSignOut}
            className="text-[#4b9ec1] text-lg hover:underline transition-all flex items-center"
          >
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-[#4b9ec1] text-lg hover:underline transition-all"
          >
            Login
          </button>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="sm:hidden text-black text-3xl focus:outline-none z-60"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 w-full h-screen bg-[#fdfcf8] 
              sm:hidden flex flex-col justify-center items-center space-y-6 z-50 p-6"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 right-6 text-3xl text-[#4b9ec1] focus:outline-none"
              onClick={closeMenu}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              variants={linkVariants}
              className="w-full max-w-md mb-6 relative"
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:border-[#4b9ec1] transition-colors"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
            </motion.div>

            <NavLink href="/" onClick={closeMenu}>
              <Home size={24} className="mr-2" /> Home
            </NavLink>
            {status === "authenticated" && (
              <>
                <NavLink href="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
                <NavLink href="/analytics" onClick={closeMenu}>Analytics</NavLink>
              </>
            )}
            <NavLink href="/pricing" onClick={closeMenu}>Pricing</NavLink>
            {status === "authenticated" ? (
              <motion.div variants={linkVariants}>
                <button
                  onClick={handleSignOut}
                  className="text-[#4b9ec1] text-2xl hover:underline transition-all flex items-center"
                >
                  <LogOut size={24} className="mr-2" /> Logout
                </button>
              </motion.div>
            ) : (
              <motion.div variants={linkVariants}>
                <button
                  onClick={() => signIn()}
                  className="text-[#4b9ec1] text-2xl hover:underline transition-all"
                >
                  Login
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

