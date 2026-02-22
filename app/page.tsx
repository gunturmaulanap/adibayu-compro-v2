"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueChain from "@/components/ValueChain";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19] text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
      <Hero />
      <ValueChain isDarkMode={isDarkMode} />

      <section
        id="section-6"
        className={`h-screen flex flex-col items-center justify-center border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0B0F19] border-white/10"
            : "bg-white border-gray-100"
        }`}
      >
        <h2
          className={`text-4xl font-bold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Impact
        </h2>
        <p
          className={`max-w-md text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Sustainable value creation across core sectors.
        </p>
      </section>

      <section
        id="section-7"
        className={`h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
          isDarkMode ? "bg-[#0B0F19]" : "bg-white"
        }`}
      >
        <h2
          className={`text-4xl font-bold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Find Us
        </h2>
        <p
          className={`max-w-md text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Get in touch with Adibayu Group.
        </p>
      </section>
    </main>
  );
}
