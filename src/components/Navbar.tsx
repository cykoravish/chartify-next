"use client";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#fdfcf8] flex justify-between items-center px-4 py-4 lg:px-8 w-full relative z-50">
      {/* Logo */}
      <div className="text-black text-3xl font-cursive">Chartify</div>

      {/* Search Input (Visible on larger screens) */}
      <div className="hidden sm:flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-[#4b9ec1] transition-colors"
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:flex space-x-6 text-[#4b9ec1] text-lg">
        <Link href="#" className="hover:underline transition-all">
          Charts
        </Link>
        <Link href="#" className="hover:underline transition-all">
          Network
        </Link>
        <Link href="#" className="hover:underline transition-all">
          Pricing
        </Link>
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
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
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
        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:border-[#4b9ec1] transition-colors"
          />
        </div>

        <a 
          href="#" 
          className="text-[#4b9ec1] text-2xl hover:underline transition-all"
          onClick={closeMenu}
        >
          Charts
        </a>
        <a 
          href="#" 
          className="text-[#4b9ec1] text-2xl hover:underline transition-all"
          onClick={closeMenu}
        >
          Network
        </a>
        <a 
          href="#" 
          className="text-[#4b9ec1] text-2xl hover:underline transition-all"
          onClick={closeMenu}
        >
          Pricing
        </a>
      </div>
    </nav>
  );
};

export default Navbar;