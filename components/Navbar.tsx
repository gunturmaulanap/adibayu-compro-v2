"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sun, Moon, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoLightMode from "./assets/logos/light-mode.png";
import logoDarkMode from "./assets/logos/dark-mode.png";

type NavbarProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
    isScrolled
      ? isDarkMode
        ? "bg-[#0B0F19]/95 border-white/10 py-4 shadow-sm backdrop-blur-md"
        : "bg-white border-gray-200 py-4 shadow-sm"
      : isDarkMode
      ? "bg-transparent border-white/10 py-6"
      : "bg-transparent border-white/20 py-6"
  }`;

  const textClasses = isScrolled
    ? isDarkMode
      ? "text-white"
      : "text-gray-900"
    : "text-white";

  const dropdownClasses = isScrolled
    ? isDarkMode
      ? "bg-[#111827] border-white/10"
      : "bg-white border-gray-100"
    : "bg-black/60 backdrop-blur-xl border-white/10";

  const dropdownHoverClasses = isScrolled
    ? isDarkMode
      ? "hover:bg-white/10"
      : "hover:bg-gray-50"
    : "hover:bg-white/10";

  const dividerClasses = isScrolled
    ? isDarkMode
      ? "bg-white/10"
      : "bg-gray-100"
    : "bg-white/10";

  const contactButtonClasses = isScrolled
    ? isDarkMode
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800"
    : "bg-white text-black hover:bg-gray-200";

  return (
    <nav className={navClasses} onMouseLeave={() => setActiveDropdown(null)}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Navigation */}
        <div
          className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textClasses}`}
        >
          <div
            className="relative group cursor-pointer h-full py-2"
            onMouseEnter={() => setActiveDropdown("businesses")}
          >
            <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              Businesses <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            <AnimatePresence>
              {activeDropdown === "businesses" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl border ${dropdownClasses}`}
                >
                  <div className="flex flex-col py-3">
                    {["Manufacturing", "Distribution", "Retail"].map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className={`px-5 py-2.5 text-sm transition-colors ${dropdownHoverClasses}`}
                      >
                        {item}
                      </Link>
                    ))}
                    <div className={`h-px w-full my-2 ${dividerClasses}`}></div>
                    <Link
                      href="#section-3"
                      className={`px-5 py-2.5 text-sm font-semibold transition-colors ${dropdownHoverClasses}`}
                    >
                      Explore Value Chain
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative group cursor-pointer h-full py-2"
            onMouseEnter={() => setActiveDropdown("who-we-are")}
          >
            <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              Who We Are <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            <AnimatePresence>
              {activeDropdown === "who-we-are" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden shadow-xl border ${dropdownClasses}`}
                >
                  <div className="flex flex-col py-3">
                    {[
                      "About Adibayu Group",
                      "Vision & Mission",
                      "Leadership",
                    ].map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className={`px-5 py-2.5 text-sm transition-colors ${dropdownHoverClasses}`}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="#section-6"
            className="hover:opacity-70 transition-opacity py-2"
          >
            Impact
          </Link>
          <Link
            href="#section-7"
            className="hover:opacity-70 transition-opacity py-2"
          >
            Find Us
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center justify-center group`}
          >
            <Image
              src={isDarkMode ? logoDarkMode : logoLightMode}
              alt="Adibayu logo"
              width={140}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Right: Utilities */}
        <div
          className={`hidden lg:flex items-center gap-6 text-sm font-medium ${textClasses}`}
        >
          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
            <Globe className="w-4 h-4 opacity-70" /> EN
          </div>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="hover:opacity-70 transition-opacity flex items-center justify-center"
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 opacity-70" />
            ) : (
              <Sun className="w-4 h-4 opacity-70" />
            )}
          </button>
          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 font-semibold ${contactButtonClasses}`}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button className={`p-2 ${textClasses}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
