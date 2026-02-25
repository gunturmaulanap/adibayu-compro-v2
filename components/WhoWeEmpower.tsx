"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Factory, Truck, Store } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

const entities = [
  {
    name: "Manufacturing",
    description:
      "Strengthening production systems through governance, quality discipline, and scale readiness.",
    icon: Factory,
  },
  {
    name: "Distribution",
    description:
      "Enabling reliable market reach with strategic logistics planning and operational coordination.",
    icon: Truck,
  },
  {
    name: "Retail",
    description:
      "Supporting customer-facing excellence with brand consistency and channel performance oversight.",
    icon: Store,
  },
];

type WhoWeEmpowerProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

const whoWeEmpowerVariants = {
  leftImage: {
    hidden: {
      opacity: 0,
      scale: 1.1,
      x: -30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 22,
        mass: 1,
      },
    },
  },
  rightContent: {
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  heading: {
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
        damping: 18,
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
        stiffness: 90,
        damping: 18,
        mass: 0.9,
      },
    },
  },
  entityCard: (index: number) => ({
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 30,
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
        delay: index * 0.1,
      },
    },
  }),
  iconContainer: {
    hidden: {
      scale: 0.8,
      rotate: -15,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.5,
        delay: 0.15,
      },
    },
  },
};

export default function WhoWeEmpower({
  isDarkMode = false,
  locale,
}: WhoWeEmpowerProps) {
  const t = copy[locale]?.home?.whoWeEmpower ?? copy.en.home.whoWeEmpower;

  return (
    <section
      id="our-companies"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
        >
          <motion.div
            className={`relative min-h-[300px] md:min-h-[420px] w-full overflow-hidden border rounded-2xl ${
              isDarkMode ? "border-white/15" : "border-gray-200"
            }`}
            variants={whoWeEmpowerVariants.leftImage}
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
              alt="Modern corporate headquarters building"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            {isDarkMode && (
              <motion.div
                className="absolute inset-0 bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            variants={whoWeEmpowerVariants.rightContent}
          >
            <motion.h2
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              variants={whoWeEmpowerVariants.heading}
            >
              {t.title}
            </motion.h2>

            <motion.p
              className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
              variants={whoWeEmpowerVariants.subtitle}
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={whoWeEmpowerVariants.rightContent}
            >
              {entities.map((entity, index) => {
                const Icon = entity.icon;
                return (
                  <motion.article
                    key={entity.name}
                    custom={index}
                    variants={whoWeEmpowerVariants.entityCard(index)}
                    className={`border p-5 transition-colors duration-300 rounded-xl ${
                      isDarkMode
                        ? "border-white/15 hover:bg-white/5"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    whileHover={{
                      y: -4,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-white/5 border border-white/10"
                            : "bg-gray-100 border border-gray-200"
                        }`}
                        variants={whoWeEmpowerVariants.iconContainer}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <div className="flex-1 pt-0.5">
                        <h3
                          className={`text-base font-semibold tracking-tight ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {t.entities[index]?.name ?? entity.name}
                        </h3>
                        <p
                          className={`mt-1.5 text-sm leading-relaxed ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {t.entities[index]?.description ?? entity.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
