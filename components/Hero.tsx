"use client";

import { motion } from "framer-motion";
import heroBg from "./assets/hero/adibayu-hero-section.jpg";
import heroBgDark from "./assets/hero/adibayu-hero-section-dark.jpg";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type HeroProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  title: {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1.2,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: 0.2,
      },
    },
  },
  ctaGroup: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.35,
      },
    },
  },
  ctaButton: (index: number) => ({
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
        stiffness: 120,
        damping: 18,
        delay: 0.45 + index * 0.1,
      },
    },
  }),
  scrollIndicator: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 22,
        delay: 0.8,
      },
    },
  },
};

export default function Hero({ isDarkMode, locale }: HeroProps) {
  const isDark = isDarkMode;
  const t = copy[locale]?.home?.hero ?? copy.en.home.hero;

  return (
    <motion.section
      className="relative min-h-screen w-full flex items-center justify-center bg-black"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${isDark ? heroBgDark.src : heroBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto mt-20"
        variants={heroVariants.container}
      >
        <motion.h1
          className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold text-white tracking-tighter leading-[0.95]"
          variants={heroVariants.title}
        >
          {t.title1}
          <br />
          {t.title2}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-white/90 max-w-[50ch] mx-auto font-medium leading-relaxed"
          variants={heroVariants.subtitle}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          variants={heroVariants.ctaGroup}
        >
          <motion.button
            custom={0}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
            variants={heroVariants.ctaButton(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.cta1}
          </motion.button>
          <motion.button
            custom={1}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
            variants={heroVariants.ctaButton(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.cta2}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        variants={heroVariants.scrollIndicator}
        animate={{
          opacity: [1, 0.5, 1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          {t.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </motion.section>
  );
}
