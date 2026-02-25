"use client";

import { useEffect, useState } from "react";
import { LayoutGroup } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueChain from "@/components/ValueChain";
import WhoWeEmpower from "@/components/WhoWeEmpower";
import WhyWeExist from "@/components/WhyWeExist";
import LatestInsights from "@/components/LatestInsights";
import BrandsEcosystem from "@/components/BrandsEcosystem";
import Recognition from "@/components/Recognition";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";

export default function HomePageClient() {
  const { locale } = useLocale();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const navEntry = performance.getEntriesByType("navigation").at(0) as
      | PerformanceNavigationTiming
      | undefined;
    if (navEntry?.type === "reload") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

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

      {/* LayoutGroup untuk sinkronisasi animasi antar section */}
      <LayoutGroup>
        <Hero isDarkMode={isDarkMode} locale={locale} />
        <ValueChain isDarkMode={isDarkMode} locale={locale} />
        <WhoWeEmpower isDarkMode={isDarkMode} locale={locale} />
        <BrandsEcosystem isDarkMode={isDarkMode} locale={locale} />
        <LatestInsights isDarkMode={isDarkMode} locale={locale} />
        <WhyWeExist isDarkMode={isDarkMode} locale={locale} />
        <Recognition isDarkMode={isDarkMode} locale={locale} />
        <FindUs isDarkMode={isDarkMode} locale={locale} />
      </LayoutGroup>

      <Footer isDarkMode={isDarkMode} locale={locale} />
    </main>
  );
}
