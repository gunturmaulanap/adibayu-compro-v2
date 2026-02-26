"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useValueChainNavigation } from "@/lib/useValueChainNavigation";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import Image from "next/image";
import ManufWhite from "@/components/assets/value-chain/manuf-white.svg";
import ManufBlack from "@/components/assets/value-chain/manuf-black.svg";
import TrukBlack from "@/components/assets/value-chain/truk-black.svg";
import TrukWhite from "@/components/assets/value-chain/truk-white.svg";
import RetailWhite from "@/components/assets/value-chain/retail-white.svg";
import RetailBlack from "@/components/assets/value-chain/retail-black.svg";
import WorldWhite from "@/components/assets/value-chain/world-white.svg";
import WorldBlack from "@/components/assets/value-chain/world-black.svg";

type CustomIconProps = { isDarkMode?: boolean; className?: string };
type PillarIcon = LucideIcon | React.ComponentType<CustomIconProps>;

function ManufacturingIcon({ isDarkMode, className }: CustomIconProps) {
  return (
    <Image
      src={isDarkMode ? ManufWhite : ManufBlack}
      alt="Manufacturing Icon"
      className={className}
      priority
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function DistributionIcon({ isDarkMode, className }: CustomIconProps) {
  return (
    <Image
      src={isDarkMode ? TrukWhite : TrukBlack}
      alt="Distribution Icon"
      className={className}
      priority
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function RetailIcon({ isDarkMode, className }: CustomIconProps) {
  return (
    <Image
      src={isDarkMode ? RetailWhite : RetailBlack}
      alt="Retail Icon"
      className={className}
      priority
      style={{ width: "100%", height: "70%" }}
    />
  );
}

function ImpactIcon({ isDarkMode, className }: CustomIconProps) {
  return (
    <Image
      src={isDarkMode ? WorldWhite : WorldBlack}
      alt="Impact Icon"
      className={className}
      priority
      style={{ width: "100%", height: "70%" }}
    />
  );
}

const pillars: Array<{
  id: string;
  title: string;
  description: string;
  icon: PillarIcon;
  isCustomIcon?: boolean;
}> = [
  {
    id: "manufacturing",
    title: "Manufacture",
    description:
      "Engineering excellence and scalable production capabilities driving foundational value.",
    icon: ManufacturingIcon,
    isCustomIcon: true,
  },
  {
    id: "distribution",
    title: "Distribution",
    description:
      "Strategic logistics and supply chain optimization ensuring seamless market access.",
    icon: DistributionIcon,
    isCustomIcon: true,
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Consumer-centric touchpoints delivering premium experiences and market penetration.",
    icon: RetailIcon,
    isCustomIcon: true,
  },
  {
    id: "impact",
    title: "Impact",
    description:
      "Sustainable growth and community empowerment creating long-term societal value.",
    icon: ImpactIcon,
    isCustomIcon: true,
  },
];

type ValueChainProps = {
  isDarkMode: boolean;
  locale: Locale;
};

const variants = {
  header: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 },
    },
  },
  subtitle: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 18, delay: 0.15 },
    },
  },
  pillar: (index: number) => ({
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        mass: 1,
        delay: 0.5 + index * 0.12,
      },
    },
  }),
  mobileCard: {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.9,
        delay: 0.5,
      },
    },
  },
  iconSwap: {
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: -90,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    enter: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
    },
  },
  textSwap: {
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
    enter: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 22,
        mass: 0.8,
        delay: 0.1,
      },
    },
  },
};

export default function ValueChain({ isDarkMode, locale }: ValueChainProps) {
  const ACTIVE_DURATION_MS = 3000;
  const TRANSITION_DURATION_MS = 800;
  const LAST_INDEX = pillars.length - 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobileRef = useRef(false);
  const loadedIconCacheRef = useRef<Set<string>>(new Set());
  const { activePillar: activePillarFromNav } = useValueChainNavigation();

  const getImageSrc = (img: { src: string } | string) =>
    typeof img === "string" ? img : img.src;

  const getPillarIconSrc = (pillarId: string) => {
    const isDark = isDarkMode;

    switch (pillarId) {
      case "manufacturing":
        return getImageSrc(isDark ? ManufWhite : ManufBlack);
      case "distribution":
        return getImageSrc(isDark ? TrukWhite : TrukBlack);
      case "retail":
        return getImageSrc(isDark ? RetailWhite : RetailBlack);
      case "impact":
        return getImageSrc(isDark ? WorldWhite : WorldBlack);
      default:
        return null;
    }
  };

  const ensurePillarIconReady = async (index: number) => {
    if (!isMobileRef.current) return;

    const pillar = pillars[index];
    if (!pillar?.isCustomIcon) return;

    const cacheKey = `${isDarkMode ? "dark" : "light"}-${pillar.id}`;
    if (loadedIconCacheRef.current.has(cacheKey)) return;

    const src = getPillarIconSrc(pillar.id);
    if (!src) return;

    await new Promise<void>((resolve) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;

      if (img.complete) resolve();
    });

    loadedIconCacheRef.current.add(cacheKey);
  };

  const t = useMemo(() => {
    return copy[locale]?.home?.valueChain ?? copy.en.home.valueChain;
  }, [locale]);

  // Track mobile breakpoint status for icon-ready synchronization behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => {
      isMobileRef.current = mediaQuery.matches;
    };

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  // Auto cycle
  useEffect(() => {
    let transitionTimer: number | undefined;
    let cancelled = false;

    const activeTimer = window.setTimeout(() => {
      if (cancelled) return;
      setIsTransitioning(true);

      transitionTimer = window.setTimeout(() => {
        const nextIndex = (activeIndex + 1) % pillars.length;

        const runTransition = async () => {
          await ensurePillarIconReady(nextIndex);
          if (cancelled) return;
          setActiveIndex(nextIndex);
          setIsTransitioning(false);
        };

        void runTransition();
      }, TRANSITION_DURATION_MS);
    }, ACTIVE_DURATION_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(activeTimer);
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [activeIndex, isDarkMode]);

  // Navigation override
  useEffect(() => {
    if (!activePillarFromNav) return;
    let cancelled = false;

    const foundIndex = pillars.findIndex((p) => p.id === activePillarFromNav);
    if (foundIndex === -1 || foundIndex === activeIndex) return;

    const start = window.setTimeout(() => setIsTransitioning(true), 0);
    const timer = window.setTimeout(() => {
      const runTransition = async () => {
        await ensurePillarIconReady(foundIndex);
        if (cancelled) return;
        setActiveIndex(foundIndex);
        setIsTransitioning(false);
      };

      void runTransition();
    }, TRANSITION_DURATION_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [activePillarFromNav, activeIndex, isDarkMode]);

  const progressStep = isTransitioning
    ? Math.min(activeIndex + 1, LAST_INDEX)
    : Math.min(activeIndex, LAST_INDEX);

  const progressPercent = `${(progressStep / LAST_INDEX) * 100}%`;
  const currentPillar = pillars[activeIndex];

  return (
    <section
      id="value-chain"
      className={`py-24 md:py-40 transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Preload all icon variants used by the current theme to avoid first-swap delay on mobile */}
        <div className="sr-only" aria-hidden>
          <Image
            src={isDarkMode ? ManufWhite : ManufBlack}
            alt=""
            width={1}
            height={1}
            priority
          />
          <Image
            src={isDarkMode ? TrukWhite : TrukBlack}
            alt=""
            width={1}
            height={1}
            priority
          />
          <Image
            src={isDarkMode ? RetailWhite : RetailBlack}
            alt=""
            width={1}
            height={1}
            priority
          />
          <Image
            src={isDarkMode ? WorldWhite : WorldBlack}
            alt=""
            width={1}
            height={1}
            priority
          />
        </div>

        {/* Header */}
        <motion.div
          className="mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -100px 0px" }}
        >
          <motion.h2
            className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            variants={variants.header}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
            variants={variants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* MOBILE */}
        <motion.div
          className="md:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -100px 0px" }}
          variants={variants.mobileCard}
        >
          <div className="grid grid-cols-4 gap-2 mb-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={`mobile-step-${pillar.id}`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={variants.pillar(index)}
                className={`text-[11px] tracking-tight ${
                  activeIndex === index
                    ? "opacity-100 font-semibold"
                    : "opacity-40 font-medium"
                } ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {t.pillars[index]}
              </motion.div>
            ))}
          </div>

          <div
            className={`h-px w-full relative overflow-hidden mb-6 ${
              isDarkMode ? "bg-white/20" : "bg-gray-200"
            }`}
          >
            <motion.div
              className={`absolute top-0 left-0 h-full will-change-[width] ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              }`}
              initial={{ width: "0%" }}
              animate={{ width: progressPercent }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 25,
                mass: 0.8,
              }}
            />
          </div>

          <div
            className={`rounded-2xl border px-5 py-5 ${
              isDarkMode ? "border-white/15" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center gap-2 mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mobile-icon-${currentPillar.id}`}
                  variants={variants.iconSwap}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                >
                  {currentPillar.isCustomIcon ? (
                    <currentPillar.icon
                      isDarkMode={isDarkMode}
                      className="w-8 h-8"
                    />
                  ) : (
                    <currentPillar.icon
                      className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      strokeWidth={1}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <motion.h3
                key={`mobile-title-${currentPillar.id}`}
                className={`text-xl font-bold tracking-tight text-center ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                variants={variants.textSwap}
                initial="exit"
                animate="enter"
              >
                {t.pillars[activeIndex]}
              </motion.h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={`mobile-desc-${currentPillar.id}`}
                className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
                variants={variants.textSwap}
                initial="exit"
                animate="enter"
                exit="exit"
              >
                {t.descriptions[activeIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* DESKTOP (rapih + line di bawah icon, size icon tetap w-10 h-10) */}
        <div className="hidden md:block">
          <div className="min-h-[520px] lg:min-h-[580px] flex flex-col justify-center">
            {/* Row 1: Icons */}
            <motion.div
              className="grid grid-cols-4 gap-8 lg:gap-12 items-end pt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
                margin: "0px 0px -100px 0px",
              }}
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={`desktop-icon-${pillar.id}`}
                  custom={index}
                  variants={variants.pillar(index)}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.4,
                      scale: activeIndex === index ? 1 : 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {pillar.isCustomIcon ? (
                      <pillar.icon
                        isDarkMode={isDarkMode}
                        className="w-10 h-10"
                      />
                    ) : (
                      <pillar.icon
                        className={`w-10 h-10 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        strokeWidth={1}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2: Line (fixed under icons) */}
            <div className="relative mt-8 mb-8 h-10 flex items-center">
              <div
                className={`h-px w-full ${isDarkMode ? "bg-white/20" : "bg-gray-200"}`}
              />
              <motion.div
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-px will-change-[width] ${
                  isDarkMode ? "bg-white" : "bg-gray-900"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: progressPercent }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 25,
                  mass: 0.8,
                }}
              />
            </div>

            {/* Row 3: Titles + Descriptions (rapih, tidak loncat) */}
            <div className="grid grid-cols-4 gap-8 lg:gap-12">
              {pillars.map((pillar, index) => (
                <div
                  key={`desktop-text-${pillar.id}`}
                  className="flex flex-col items-start"
                >
                  <motion.h3
                    className={`text-xl mb-3 tracking-tight text-left w-full ${
                      activeIndex === index
                        ? "font-bold opacity-100"
                        : "font-medium opacity-40"
                    } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    animate={{ y: activeIndex === index ? 0 : 4 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    {t.pillars[index]}
                  </motion.h3>

                  <div className="min-h-[96px] w-full">
                    <AnimatePresence mode="wait">
                      {activeIndex === index ? (
                        <motion.p
                          key={`desc-${pillar.id}`}
                          className={`text-sm leading-relaxed text-left ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                          variants={variants.textSwap}
                          initial="exit"
                          animate="enter"
                          exit="exit"
                        >
                          {t.descriptions[index]}
                        </motion.p>
                      ) : (
                        <p className="text-sm leading-relaxed text-left opacity-0 select-none">
                          placeholder
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
