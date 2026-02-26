"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import logoLight from "./assets/logos/logo-light.png";
import logoDark from "./assets/logos/logo-dark.png";

type RecognitionItem = {
  id: string;
  entity: string;
  title: string;
  year: string;
  awardImage: string;
};

type RecognitionProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

// Animation variants untuk subtle prestige
const recognitionVariants = {
  sectionHeader: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 26,
        mass: 1.4,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 28,
        mass: 1.5,
        delay: 0.15,
      },
    },
  },
  column: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  awardRow: {
    hidden: {
      opacity: 0,
      x: -30,
      y: 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 1.3,
      },
    },
  },
  iconBadge: {
    hidden: {
      scale: 0.8,
      rotate: -15,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 16,
        mass: 0.5,
      },
    },
    exit: {
      scale: 0.8,
      rotate: 15,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  },
  certificatePopup: {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
      },
    },
    exit: {
      opacity: 0,
      x: 30,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  },
  mobileBadge: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 18,
        mass: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  },
  footer: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 28,
        mass: 1.5,
        delay: 1.2,
      },
    },
  },
};

export default function Recognition({
  isDarkMode = false,
  locale,
}: RecognitionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [columnsVisible, setColumnsVisible] = useState(false);
  const t = copy[locale]?.home?.recognition ?? copy.en.home.recognition;
  const activeLogo = isDarkMode ? logoLight : logoDark;

  const awards: RecognitionItem[] = [
    {
      id: "1",
      entity: "IPDBA",
      title: "Indonesia Perusahaan Digital Branding Award",
      year: "2018",
      awardImage: "/awards/ipdba-2018.png",
    },
    {
      id: "2",
      entity: "IPDBA",
      title: "Indonesia Perusahaan Digital Branding Award",
      year: "2020",
      awardImage: "/awards/ipdba-2020.png",
    },
    {
      id: "3",
      entity: "MURI",
      title: "Museum Rekor-Dunia Indonesia",
      year: "2023",
      awardImage: "/awards/muri.png",
    },
    {
      id: "4",
      entity: "Champion",
      title: "Marketing Championship Award",
      year: "2023",
      awardImage: "/awards/champion.png",
    },
    {
      id: "5",
      entity: "Excellence",
      title: "Business Excellence Recognition",
      year: "2022",
      awardImage: "/awards/excellence.png",
    },
    {
      id: "6",
      entity: "Pertama",
      title: "Pioneer Innovation Award",
      year: "2021",
      awardImage: "/awards/pertama.png",
    },
  ];

  const leftColumn = awards.slice(0, Math.ceil(awards.length / 2));
  const rightColumn = awards.slice(Math.ceil(awards.length / 2));

  const renderAwardRow = (award: RecognitionItem, index: number) => {
    const isActive = selectedId === award.id || hoveredId === award.id;
    const activeTextOffset = isActive ? 96 : 0;
    const isDesktopViewport =
      typeof window !== "undefined" && window.innerWidth >= 1024;

    return (
      <motion.div
        key={award.id}
        className={`relative border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
        variants={recognitionVariants.awardRow}
        onMouseEnter={() => {
          if (isDesktopViewport) {
            setSelectedId(null);
          }
          setHoveredId(award.id);
        }}
        onMouseLeave={() => {
          if (isDesktopViewport) {
            setHoveredId(null);
          }
        }}
        onClick={() => {
          if (isDesktopViewport) {
            return;
          }
          setSelectedId((prev) => (prev === award.id ? null : award.id));
          setHoveredId(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setSelectedId((prev) => (prev === award.id ? null : award.id));
            setHoveredId(null);
          }
        }}
        role="button"
        tabIndex={0}
        whileHover={{
          backgroundColor: isDarkMode
            ? "rgba(255,255,255,0.02)"
            : "rgba(0,0,0,0.01)",
          transition: {
            duration: 0.2,
          },
        }}
      >
        <div className="relative py-5 md:py-6">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                className="pointer-events-none absolute left-0 top-1 md:top-1/2 md:-translate-y-1/2"
                variants={recognitionVariants.iconBadge}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-[88px] md:w-[96px] flex items-start justify-start">
                  <Image
                    src={activeLogo}
                    alt="Adibayu logo"
                    width={96}
                    height={36}
                    className="mt-0.5 h-auto w-[88px] md:mt-0 md:w-[96px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              x: activeTextOffset,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <motion.p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                }`}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {award.entity}
              </motion.p>

              <h3
                className={`text-base md:text-lg font-medium leading-snug ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {award.title}
              </h3>

              <span
                className={`text-xs md:text-sm sm:ml-auto ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {award.year}
              </span>
            </div>
          </motion.div>

          {/* Desktop: Direct image on hover */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
                variants={recognitionVariants.certificatePopup}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="relative">
                  <Image
                    src={award.awardImage}
                    alt={`${award.title} Award`}
                    width={100}
                    height={140}
                    className="object-contain"
                    style={{ maxHeight: "140px", width: "auto" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile: Direct image on tap */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                className="lg:hidden mt-4"
                variants={recognitionVariants.mobileBadge}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex justify-center">
                  <Image
                    src={award.awardImage}
                    alt={`${award.title} Award`}
                    width={100}
                    height={140}
                    className="object-contain"
                    style={{ maxHeight: "140px", width: "auto" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="recognition"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            variants={recognitionVariants.sectionHeader}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
            variants={recognitionVariants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={columnsVisible ? "visible" : "hidden"}
            variants={recognitionVariants.column}
            onViewportEnter={() => {
              setColumnsVisible(true);
            }}
          >
            {leftColumn.map((award) =>
              renderAwardRow(award, leftColumn.indexOf(award)),
            )}
          </motion.div>

          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={columnsVisible ? "visible" : "hidden"}
            variants={recognitionVariants.column}
          >
            {rightColumn.map((award) =>
              renderAwardRow(award, rightColumn.indexOf(award)),
            )}
          </motion.div>
        </div>

        <motion.div
          className={`mt-8 pt-8 border-t ${
            isDarkMode ? "border-white/10" : "border-gray-200"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={recognitionVariants.footer}
        >
          <p
            className={`text-xs leading-relaxed ${
              isDarkMode ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {t.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
