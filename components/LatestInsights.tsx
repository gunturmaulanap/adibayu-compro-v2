"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InsightCard from "@/components/InsightCard";
import { mockInsights, type Insight } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type LatestInsightsProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

export default function LatestInsights({
  isDarkMode,
  locale,
}: LatestInsightsProps) {
  const [latest, setLatest] = useState<Insight[]>(mockInsights.slice(0, 3));

  useEffect(() => {
    let isMounted = true;

    const loadLatest = async () => {
      try {
        const response = await fetch("/api/insights?limit=3", {
          cache: "no-store",
        });
        if (!response.ok) return;

        const payload = (await response.json()) as { items?: Insight[] };
        if (isMounted && Array.isArray(payload.items)) {
          setLatest(payload.items);
        }
      } catch {
        // Keep fallback mock insights when API is unavailable
      }
    };

    void loadLatest();

    return () => {
      isMounted = false;
    };
  }, []);

  const t = copy[locale].home.insights;

  return (
    <section
      id="latest-insights"
      className={`py-20 md:py-24 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div>
            <h2
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t.title}
            </h2>
            <p
              className={`mt-3 text-base md:text-lg leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          <Link
            href="/insights"
            className={`inline-flex items-center border px-5 py-2.5 text-sm font-medium transition-colors rounded-full ${
              isDarkMode
                ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                : "border-gray-300 text-gray-900 hover:border-gray-900"
            }`}
          >
            {t.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {latest.map((item) => (
            <InsightCard key={item.id} insight={item} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
