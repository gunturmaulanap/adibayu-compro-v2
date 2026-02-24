"use client";

import { useEffect, useState } from "react";
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

export default function ValueChain({ isDarkMode, locale }: ValueChainProps) {
  const ACTIVE_DURATION_MS = 3000;
  const TRANSITION_DURATION_MS = 800;
  const TRANSITION_DURATION_SEC = TRANSITION_DURATION_MS / 1000;
  const LAST_INDEX = pillars.length - 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const { activePillar: activePillarFromNav } = useValueChainNavigation();
  const t = copy[locale].home.valueChain;

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

  // Handle external navigation
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
      className={`py-20 md:py-24 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Desktop Progress Line */}
          <div
            className={`absolute top-24 left-0 w-full h-px hidden md:block ${
              isDarkMode ? "bg-white/20" : "bg-gray-200"
            }`}
          >
            <div
              style={{ width: progressPercent }}
              className={`h-full will-change-[width] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              }`}
            />
          </div>

          {/* Mobile Compact Flow */}
          <div className="md:hidden">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {pillars.map((pillar, index) => (
                <div
                  key={`mobile-step-${pillar.id}`}
                  className={`text-[11px] tracking-tight transition-opacity duration-500 ${
                    activeIndex === index
                      ? "opacity-100 font-semibold"
                      : "opacity-40 font-medium"
                  } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {t.pillars[index]}
                </div>
              ))}
            </div>

            <div
              className={`h-px w-full relative overflow-hidden mb-6 ${
                isDarkMode ? "bg-white/20" : "bg-gray-200"
              }`}
            >
              <div
                style={{ width: progressPercent }}
                className={`absolute top-0 left-0 h-full will-change-[width] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDarkMode ? "bg-white" : "bg-gray-900"
                }`}
              />
            </div>

            <div
              className={`rounded-2xl border px-5 py-5 ${
                isDarkMode ? "border-white/15" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div key={`mobile-icon-${currentPillar.id}`}>
                  <currentPillar.icon
                    className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    strokeWidth={1}
                  />
                </div>

                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t.pillars[activeIndex]}
                </h3>
              </div>

              <p
                key={`mobile-desc-${currentPillar.id}`}
                className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {t.descriptions[activeIndex]}
              </p>
            </div>
          </div>

          {/* Desktop Flow */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div key={pillar.id} className="flex flex-col relative">
                {/* Icon Area */}
                <div className="h-24 flex items-center justify-start">
                  <div
                    className={
                      activeIndex === index ? "opacity-100" : "opacity-40"
                    }
                  >
                    <pillar.icon
                      className={`w-10 h-10 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      strokeWidth={1}
                    />
                  </div>
                </div>

                {/* Desktop Spacer for the absolute line */}
                <div className="h-px w-full mb-6"></div>

                {/* Text Area */}
                <h3
                  className={`text-xl mb-4 tracking-tight transition-opacity duration-700 ${
                    activeIndex === index
                      ? "font-bold opacity-100"
                      : "font-medium opacity-40"
                  } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {t.pillars[index]}
                </h3>

                <div className="min-h-[84px]">
                  {activeIndex === index && (
                    <p
                      key={pillar.id}
                      className={`text-sm leading-relaxed pr-4 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {t.descriptions[index]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
