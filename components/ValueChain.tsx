"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Truck, Store, Globe } from "lucide-react";
import { useValueChainNavigation } from "@/lib/useValueChainNavigation";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

const pillars = [
  {
    id: "manufacturing",
    title: "Manufacture",
    description:
      "Engineering excellence and scalable production capabilities driving foundational value.",
    icon: Factory,
  },
  {
    id: "distribution",
    title: "Distribution",
    description:
      "Strategic logistics and supply chain optimization ensuring seamless market access.",
    icon: Truck,
  },
  {
    id: "retail",
    title: "Retail",
    description:
      "Consumer-centric touchpoints delivering premium experiences and market penetration.",
    icon: Store,
  },
  {
    id: "impact",
    title: "Impact",
    description:
      "Sustainable growth and community empowerment creating long-term societal value.",
    icon: Globe,
  },
];

type ValueChainProps = {
  isDarkMode: boolean;
  locale: Locale;
};

// Animation variants untuk directional flow
const valueChainVariants = {
  sectionHeader: {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: 0.15,
      },
    },
  },
  progressLine: {
    hidden: { width: "0%" },
    visible: {
      width: "var(--progress-width)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 25,
        mass: 0.8,
        delay: 0.4,
      },
    },
  },
  pillar: (index: number) => ({
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.95,
    },
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
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 20,
    },
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
  iconTransition: {
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: -90,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    enter: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5,
      },
    },
  },
  textTransition: {
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
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
  const [cycle, setCycle] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { activePillar: activePillarFromNav } = useValueChainNavigation();
  const t = copy[locale]?.home?.valueChain ?? copy.en.home.valueChain;

  useEffect(() => {
    let transitionTimer: number | undefined;

    const activeTimer = window.setTimeout(() => {
      setIsTransitioning(true);

      transitionTimer = window.setTimeout(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % pillars.length;
          if (next === 0) setCycle((current) => current + 1);
          return next;
        });
        setIsTransitioning(false);
      }, TRANSITION_DURATION_MS);
    }, ACTIVE_DURATION_MS);

    return () => {
      window.clearTimeout(activeTimer);
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [activeIndex]);

  const progressStep = isTransitioning
    ? Math.min(activeIndex + 1, LAST_INDEX)
    : Math.min(activeIndex, LAST_INDEX);

  const progressPercent = `${(progressStep / LAST_INDEX) * 100}%`;
  const currentPillar = pillars[activeIndex];

  useEffect(() => {
    if (activePillarFromNav) {
      const foundIndex = pillars.findIndex((p) => p.id === activePillarFromNav);
      if (foundIndex !== -1 && foundIndex !== activeIndex) {
        const transitionStartTimer = window.setTimeout(() => {
          setIsTransitioning(true);
        }, 0);

        const timer = window.setTimeout(() => {
          setActiveIndex(foundIndex);
          setIsTransitioning(false);
        }, TRANSITION_DURATION_MS);

        return () => {
          window.clearTimeout(transitionStartTimer);
          window.clearTimeout(timer);
        };
      }
    }
  }, [activePillarFromNav, activeIndex]);

  return (
    <section
      id="value-chain"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header - Directional Slide */}
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
            variants={valueChainVariants.sectionHeader}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
            variants={valueChainVariants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Desktop Progress Line */}
          <div
            className={`absolute top-24 left-0 w-full h-px hidden md:block ${
              isDarkMode ? "bg-white/20" : "bg-gray-200"
            }`}
          >
            <motion.div
              className={`h-full will-change-[width] ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              }`}
              style={{ width: progressPercent }}
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={valueChainVariants.progressLine}
              onAnimationComplete={() => {
                setHasAnimated(true);
              }}
              custom={{ "--progress-width": progressPercent }}
            />
          </div>

          {/* Mobile Compact Flow */}
          <motion.div
            className="md:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35,
              margin: "0px 0px -100px 0px",
            }}
            variants={valueChainVariants.mobileCard}
          >
            <div className="grid grid-cols-4 gap-2 mb-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={`mobile-step-${pillar.id}`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={valueChainVariants.pillar(index)}
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

            <motion.div
              className={`h-px w-full relative overflow-hidden mb-6 ${
                isDarkMode ? "bg-white/20" : "bg-gray-200"
              }`}
            >
              <motion.div
                style={{ width: progressPercent }}
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
            </motion.div>

            <motion.div
              className={`rounded-2xl border px-5 py-5 ${
                isDarkMode ? "border-white/15" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-icon-${currentPillar.id}`}
                    variants={valueChainVariants.iconTransition}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                  >
                    <currentPillar.icon
                      className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      strokeWidth={1}
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.h3
                  key={`mobile-title-${currentPillar.id}`}
                  className={`text-xl font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  variants={valueChainVariants.textTransition}
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
                  variants={valueChainVariants.textTransition}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                >
                  {t.descriptions[activeIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Desktop Flow */}
          <motion.div
            className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8"
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
                key={pillar.id}
                custom={index}
                variants={valueChainVariants.pillar(index)}
                className="flex flex-col relative"
              >
                <div className="h-24 flex items-center justify-start">
                  <motion.div
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.4,
                      scale: activeIndex === index ? 1 : 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <pillar.icon
                      className={`w-10 h-10 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      strokeWidth={1}
                    />
                  </motion.div>
                </div>

                <div className="h-px w-full mb-6"></div>

                <motion.h3
                  className={`text-xl mb-4 tracking-tight ${
                    activeIndex === index
                      ? "font-bold opacity-100"
                      : "font-medium opacity-40"
                  } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  animate={{
                    x: activeIndex === index ? 0 : -10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  {t.pillars[index]}
                </motion.h3>

                <div className="min-h-[84px]">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.p
                        key={pillar.id}
                        className={`text-sm leading-relaxed pr-4 ${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                        variants={valueChainVariants.textTransition}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        {t.descriptions[index]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
