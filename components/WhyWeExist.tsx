"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, TrendingUp, Leaf, Link2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type WhyWeExistProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

const pillarIcons = [Users, TrendingUp, Leaf, Link2];

// Animation variants untuk subtle prestige
const whyWeExistVariants = {
  leftContent: {
    hidden: {
      opacity: 0,
      x: -35,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 1.2,
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  },
  heading: {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 24,
        mass: 1.3,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 1.2,
        delay: 0.12,
      },
    },
  },
  pillarItem: (index: number) => ({
    hidden: {
      opacity: 0,
      x: -25,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 24,
        mass: 1.1,
        delay: index * 0.15,
      },
    },
  }),
  iconContainer: {
    hidden: {
      scale: 0.85,
      rotate: -12,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
        mass: 0.6,
        delay: 0.2,
      },
    },
  },
  quoteCallout: {
    hidden: {
      opacity: 0,
      scaleX: 0.95,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 26,
        mass: 1.4,
        delay: 0.85,
      },
    },
  },
  rightImage: {
    hidden: {
      opacity: 0,
      scale: 1.08,
      x: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 26,
        mass: 1.5,
        delay: 0.3,
      },
    },
  },
};

export default function WhyWeExist({
  isDarkMode = false,
  locale,
}: WhyWeExistProps) {
  const t = copy[locale]?.home?.whyWeExist ?? copy.en.home.whyWeExist;

  const pillars = [
    ...t.pillars,
    {
      title: locale === "id" ? "Terintegrasi" : "Integration",
      description:
        locale === "id"
          ? "Menghubungkan seluruh ekosistem bisnis untuk sinergi dan dampak yang lebih luas."
          : "Connecting the entire business ecosystem for synergy and broader impact.",
    },
  ];

  return (
    <section
      id="impact"
      className={`py-20 md:py-28 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: isDarkMode ? 0.2 : 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_10%_20%,rgba(15,23,42,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          {/* Left Column - Content with Narrative Flow */}
          <motion.div
            className="order-2 lg:order-1"
            variants={whyWeExistVariants.leftContent}
          >
            <motion.h2
              className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              variants={whyWeExistVariants.heading}
            >
              {t.title}
            </motion.h2>

            <motion.p
              className={`mt-5 text-base leading-relaxed max-w-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
              variants={whyWeExistVariants.subtitle}
            >
              {t.subtitle}
            </motion.p>

            {/* Feature List */}
            <div className="mt-10 space-y-7">
              {pillars.map((pillar, index) => {
                const Icon = pillarIcons[index] || Users;
                return (
                  <div
                    key={`pillar-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-white/5 border border-white/10"
                          : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h3
                        className={`text-base font-semibold tracking-tight ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p
                        className={`mt-1.5 text-sm leading-relaxed max-w-md ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote Callout */}
            <div
              className={`mt-10 pt-8 border-t transition-colors duration-300 ${
                isDarkMode ? "border-white/10" : "border-gray-200"
              }`}
            >
              <p
                key={`quote-${locale}`}
                className={`text-sm leading-relaxed italic max-w-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image with Parallax Scale-In */}
          <motion.div
            className="order-1 lg:order-2"
            variants={whyWeExistVariants.rightImage}
          >
            <motion.div
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 h-[400px] md:h-[720px] lg:min-h-[520px] ${
                isDarkMode
                  ? "border-white/10 shadow-xl shadow-black/30"
                  : "border-gray-200 shadow-lg shadow-gray-300/50"
              }`}
              whileHover={{
                scale: 1.01,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                },
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Modern logistics and industry operations"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
