"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { useLocale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";

type NewsDetailPageClientProps = {
  insight: Insight;
  related: Insight[];
};

export default function NewsDetailPageClient({
  insight,
  related,
}: NewsDetailPageClientProps) {
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

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        solidOnTop
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-36">
        <div className="relative h-[320px] md:h-[480px] w-full border border-gray-200 dark:border-white/10 overflow-hidden">
          <Image
            src={insight.coverImageUrl}
            alt={insight.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        <div className="mt-8 md:mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex border border-gray-300 dark:border-white/20 px-2.5 py-1 text-[11px] font-medium text-gray-700 dark:text-gray-200">
              {insight.category}
            </span>
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {insight.date}
            </time>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-4xl">
            {insight.title}
          </h1>

          <div className="mt-8 max-w-3xl space-y-5">
            {insight.content.split("\n\n").map((paragraph, index) => (
              <p
                key={`${insight.id}-${index}`}
                className="text-base text-gray-700 dark:text-gray-300 leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mt-14 md:mt-16 mb-16 md:mb-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
          {locale === "id" ? "Berita Terkait" : "Related News"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {related.map((item) => (
            <NewsCard key={item.id} insight={item} isDarkMode={isDarkMode} />
          ))}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} locale={locale} />
    </main>
  );
}
