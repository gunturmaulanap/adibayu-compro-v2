"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { mockInsights, type Insight } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type LatestInsightsProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

// Animation variants for elegant grid reveal
const latestInsightsVariants = {
  sectionHeader: {
    hidden: {
      opacity: 0,
      y: 35,
      x: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 20,
        mass: 1,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 18,
        mass: 0.9,
        delay: 0.12,
      },
    },
  },
  cardContainer: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  },
  cardItem: {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        mass: 0.9,
      },
    },
  },
  ctaButton: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 20,
        mass: 0.8,
        delay: 0.7,
      },
    },
  },
};

export default function LatestInsights({
  isDarkMode,
  locale,
}: LatestInsightsProps) {
  const [latest, setLatest] = useState<Insight[]>(mockInsights.slice(0, 3));
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLatest = async () => {
      try {
        const response = await fetch("/api/news?limit=3", {
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

  const t = copy[locale]?.home?.insights ?? copy.en.home.insights;

  return (
    <section
      id="news-updates"
      className={`py-20 md:py-24 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header - Slide Reveal */}
        <motion.div
          className="mb-10 md:mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              variants={latestInsightsVariants.sectionHeader}
            >
              {t.title}
            </motion.h2>
            <motion.p
              className={`mt-3 text-base md:text-lg leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
              variants={latestInsightsVariants.subtitle}
            >
              {t.subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* News Cards Grid - Staggered Scale Reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
          initial="hidden"
          animate={gridVisible ? "visible" : "hidden"}
          variants={latestInsightsVariants.cardContainer}
          onViewportEnter={() => setGridVisible(true)}
        >
          {latest.map((item) => (
            <motion.div
              key={item.id}
              variants={latestInsightsVariants.cardItem}
              whileHover={{
                y: -8,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                  mass: 0.8,
                },
              }}
            >
              <NewsCard insight={item} isDarkMode={isDarkMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Bounce Entry */}
        <motion.div
          className="mt-8 md:mt-10 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={latestInsightsVariants.ctaButton}
        >
          <Link
            href="/news"
            className={`inline-flex items-center border px-5 py-2.5 text-sm font-medium transition-colors rounded-full ${
              isDarkMode
                ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                : "border-gray-300 text-gray-900 hover:border-gray-900"
            }`}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{ transition: "transform 0.2s ease" }}
          >
            {t.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
