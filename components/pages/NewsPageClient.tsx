"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsFilter from "@/components/NewsFilter";
import { useLocale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";

type NewsPageClientProps = {
  insights: Insight[];
};

export default function NewsPageClient({ insights }: NewsPageClientProps) {
  const { locale } = useLocale();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeInitialized, setThemeInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      setThemeInitialized(true);
      return;
    }

    if (savedTheme === "light") {
      setIsDarkMode(false);
      setThemeInitialized(true);
      return;
    }

    setIsDarkMode(document.documentElement.classList.contains("dark"));
    setThemeInitialized(true);
  }, []);

  useEffect(() => {
    if (!themeInitialized) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, themeInitialized]);

  const title = locale === "id" ? "Berita & Pembaruan" : "News & Updates";
  const subtitle =
    locale === "id"
      ? "Perkembangan terbaru dan pembaruan strategis dari ekosistem kami."
      : "Latest developments and strategic updates from our ecosystem.";

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        solidOnTop
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        <NewsFilter insights={insights} isDarkMode={isDarkMode} />
      </section>

      <Footer isDarkMode={isDarkMode} locale={locale} />
    </main>
  );
}
