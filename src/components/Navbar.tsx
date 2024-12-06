"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log("session:", session);
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    closeMenu();
  };

  return (
    <nav className="bg-[#fdfcf8] flex justify-between items-center px-4 py-4 lg:px-8 w-full relative z-50">
      {/* Logo */}
      <Link href="/" className="text-black text-3xl font-cursive">
        Chartify
      </Link>

      {/* Search Input (Visible on larger screens) */}
      <div className="hidden sm:flex items-center">
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
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex space-x-6 text-[#4b9ec1] text-lg items-center">
        {status === "authenticated" && (
          <>
            <Link href="/dashboard" className="hover:underline transition-all">
              Dashboard
            </Link>
            <Link href="/" className="hover:underline transition-all">
              Analytics
            </Link>
          </>
        )}
        <Link href="/" className="hover:underline transition-all">
          Pricing
        </Link>
        {status === "authenticated" ? (
          <>
            <Link href="/" className="hover:underline transition-all">
              <User size={24} />
            </Link>
            <button
              onClick={handleSignOut}
              className="hover:underline transition-all"
            >
              <LogOut size={24} />
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:underline transition-all">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden text-black text-3xl focus:outline-none z-60"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 left-0 w-full h-screen bg-[#fdfcf8] 
          transform transition-transform duration-300 ease-in-out 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          sm:hidden flex flex-col justify-center items-center space-y-6 z-50 p-6
        `}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-[#4b9ec1] focus:outline-none"
          onClick={closeMenu}
        >
          ✖
        </button>

        {/* Mobile Search Input */}
        <div className="w-full max-w-md mb-6 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:border-[#4b9ec1] transition-colors"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
        </div>

        {status === "authenticated" && (
          <>
            <Link
              href="/dashboard"
              className="text-[#4b9ec1] text-2xl hover:underline transition-all"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-[#4b9ec1] text-2xl hover:underline transition-all"
              onClick={closeMenu}
            >
              Analytics
            </Link>
          </>
        )}
        <Link
          href="/"
          className="text-[#4b9ec1] text-2xl hover:underline transition-all"
          onClick={closeMenu}
        >
          Pricing
        </Link>
        {status === "authenticated" ? (
          <>
            <Link
              href="/"
              className="text-[#4b9ec1] text-2xl hover:underline transition-all flex items-center"
              onClick={closeMenu}
            >
              <User size={24} className="mr-2" /> Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="text-[#4b9ec1] text-2xl hover:underline transition-all flex items-center"
            >
              <LogOut size={24} className="mr-2" /> Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-[#4b9ec1] text-2xl hover:underline transition-all"
            onClick={closeMenu}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
