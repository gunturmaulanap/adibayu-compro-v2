"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  governanceFilterChips,
  governancePillars,
  type GovernancePillar,
} from "@/lib/governance";
import PillarCard from "@/components/governance/PillarCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

export default function GovernancePageClient() {
  const { locale } = useLocale();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeInitialized, setThemeInitialized] = useState(false);

  const [activeFilter, setActiveFilter] =
    useState<(typeof governanceFilterChips)[number]>("All");

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

  const filteredPillars = useMemo<GovernancePillar[]>(() => {
    if (activeFilter === "All") {
      return governancePillars;
    }

    return governancePillars.filter((pillar) => pillar.name === activeFilter);
  }, [activeFilter]);

  const t = copy[locale].governance;

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        solidOnTop
      />
      <section
        id="portfolio"
        className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pt-36 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.06),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl text-left md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
            Adibayu Group
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            {t.subtitle}
          </p>

          <div className="mt-8 max-w-3xl rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#0b1220]/80">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              {t.statement}
            </p>
          </div>
        </div>
      </section>

      <section id="how-we-govern" className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t.howWeGovern}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.principles.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1220]"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio-structure"
        className="bg-[#F6F6F7] px-6 py-16 md:px-10 lg:px-16 dark:bg-[#0b111b]"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t.portfolioTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
            {t.portfolioSubtitle}
          </p>

          <div
            className="mt-7 flex flex-wrap gap-2"
            aria-label="Portfolio structure filters"
          >
            {governanceFilterChips.map((chip) => {
              const isActive = activeFilter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setActiveFilter(chip)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors md:text-sm ${
                    isActive
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "bg-white text-gray-700 ring-1 ring-black/10 hover:bg-gray-50 dark:bg-[#0f172a] dark:text-gray-200 dark:ring-white/15 dark:hover:bg-[#162136]"
                  }`}
                  aria-label={`Filter by ${chip}`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            {filteredPillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#0b1220] md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {t.ctaTitle}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#find-us"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              {t.contactUs}
            </Link>
            <a
              href="mailto:office@adibayu.com"
              className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-white/20 dark:text-gray-200 dark:hover:bg-white/10"
            >
              {t.sendEmail}
            </a>
          </div>
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} locale={locale} />
    </main>
  );
}
