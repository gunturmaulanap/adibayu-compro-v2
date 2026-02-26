"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type FindUsProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

const findUsVariants = {
  sectionHeader: {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 20,
        mass: 1,
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
        stiffness: 80,
        damping: 19,
        mass: 0.95,
        delay: 0.1,
      },
    },
  },
  leftMap: {
    hidden: {
      opacity: 0,
      scale: 1.05,
      x: -35,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 22,
        mass: 1.1,
        delay: 0.2,
      },
    },
  },
  rightCard: {
    hidden: {
      opacity: 0,
      x: 35,
      y: 25,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  },
  contactItem: (index: number) => ({
    hidden: {
      opacity: 0,
      x: 20,
      y: 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.85,
        delay: index * 0.1,
      },
    },
  }),
  icon: {
    hidden: {
      scale: 0.7,
      rotate: -8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 16,
        mass: 0.5,
        delay: 0.15,
      },
    },
  },
  ctaGroup: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 95,
        damping: 19,
        mass: 0.9,
        delay: 0.75,
      },
    },
  },
  ctaButton: (index: number) => ({
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 17,
        mass: 0.75,
        delay: index * 0.08,
      },
    },
  }),
};

export default function FindUs({ isDarkMode = false, locale }: FindUsProps) {
  const t = copy[locale]?.home?.findUs ?? copy.en.home.findUs;

  const locationQuery =
    "Graha Pratama Building Level 19, Jl. Letjen M.T. Haryono No.KAV15, Tebet, Jakarta 12810";

  const mapEmbedPrimaryUrl =
    "https://maps.google.com/maps?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Tebet,%20Jakarta%2012810&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const mapEmbedFallbackUrl =
    "https://www.google.com/maps?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Tebet,%20Jakarta%2012810&output=embed";

  const [mapSrc, setMapSrc] = useState(mapEmbedPrimaryUrl);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [liveDirectionsUrl, setLiveDirectionsUrl] = useState<string | null>(
    null,
  );

  const mapsUrl =
    "https://maps.google.com/?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Jakarta";

  const email = "office@adibayu.com";
  const phone = "+6281127009500";

  useEffect(() => {
    if (!navigator.geolocation) return;

    const timeoutId = window.setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nextUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(locationQuery)}&travelmode=driving`;
          setLiveDirectionsUrl(nextUrl);
        },
        () => {
          setLiveDirectionsUrl(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 60_000,
        },
      );
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [locationQuery]);

  return (
    <section
      id="find-us"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            variants={findUsVariants.sectionHeader}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
            variants={findUsVariants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.7fr_1fr] md:gap-5 lg:grid-cols-[2.1fr_1fr] lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
        >
          <motion.div className="order-1" variants={findUsVariants.leftMap}>
            <motion.div
              className={`h-[360px] w-full overflow-hidden rounded-2xl border shadow-sm md:h-[400px] lg:h-[420px] ${
                isDarkMode
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-neutral-200 bg-white"
              }`}
              whileHover={{
                boxShadow: isDarkMode
                  ? "0 20px 40px -12px rgba(0, 0, 0, 0.4)"
                  : "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                },
              }}
            >
              {!mapLoaded && (
                <div
                  className={`absolute inset-0 z-[1] flex items-center justify-center text-sm ${
                    isDarkMode ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {locale === "id" ? "Memuat peta..." : "Loading map..."}
                </div>
              )}

              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Adibayu Group Location"
                className="w-full h-full"
                onLoad={() => setMapLoaded(true)}
                onError={() => {
                  if (mapSrc !== mapEmbedFallbackUrl) {
                    setMapSrc(mapEmbedFallbackUrl);
                    setMapLoaded(false);
                  }
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div className="order-2" variants={findUsVariants.rightCard}>
            <div
              className={`rounded-3xl border p-5 shadow-sm md:p-6 lg:p-7 ${
                isDarkMode
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <div className="space-y-4">
                <motion.div
                  custom={0}
                  variants={findUsVariants.contactItem(0)}
                  className="flex items-start gap-3"
                >
                  <motion.div variants={findUsVariants.icon}>
                    <Mail
                      className={`mt-0.5 h-4 w-4 ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    />
                  </motion.div>
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      EMAIL
                    </p>
                    <motion.a
                      href={`mailto:${email}`}
                      className={`mt-1 inline-block text-sm font-semibold ${
                        isDarkMode
                          ? "text-neutral-100 hover:text-white"
                          : "text-neutral-900 hover:text-black"
                      } transition-colors`}
                      whileHover={{
                        x: 3,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                        },
                      }}
                    >
                      {email}
                    </motion.a>
                  </div>
                </motion.div>

                <div
                  className={`h-px ${isDarkMode ? "bg-neutral-800" : "bg-neutral-200"}`}
                />

                <motion.div
                  custom={1}
                  variants={findUsVariants.contactItem(1)}
                  className="flex items-start gap-3"
                >
                  <motion.div variants={findUsVariants.icon}>
                    <Phone
                      className={`mt-0.5 h-4 w-4 ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    />
                  </motion.div>
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      PHONE
                    </p>
                    <motion.a
                      href={`tel:${phone.replace(/-/g, "")}`}
                      className={`mt-1 inline-block text-sm font-semibold ${
                        isDarkMode
                          ? "text-neutral-100 hover:text-white"
                          : "text-neutral-900 hover:text-black"
                      } transition-colors`}
                      whileHover={{
                        x: 3,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                        },
                      }}
                    >
                      {phone}
                    </motion.a>
                  </div>
                </motion.div>

                <div
                  className={`h-px ${isDarkMode ? "bg-neutral-800" : "bg-neutral-200"}`}
                />

                <motion.div
                  custom={2}
                  variants={findUsVariants.contactItem(2)}
                  className="flex items-start gap-3"
                >
                  <motion.div variants={findUsVariants.icon}>
                    <MapPin
                      className={`mt-0.5 h-4 w-4 ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    />
                  </motion.div>
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      LOCATION
                    </p>
                    <address
                      className={`mt-1 not-italic text-sm leading-6 ${
                        isDarkMode ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      <div>Graha Pratama Building Level 19</div>
                      <div>Jl. Letjen M.T. Haryono No.KAV15, RT.11/RW.5</div>
                      <div>Tebet Barat, Tebet, Kota Jakarta Selatan</div>
                      <div>DKI Jakarta 12810</div>
                    </address>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-6 space-y-2.5"
                variants={findUsVariants.ctaGroup}
              >
                <motion.a
                  custom={0}
                  href={liveDirectionsUrl ?? mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={findUsVariants.ctaButton(0)}
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 ${
                    isDarkMode
                      ? "bg-neutral-100 text-neutral-900 hover:bg-white"
                      : "bg-neutral-900 text-white hover:bg-black"
                  }`}
                  whileHover={{
                    y: -3,
                    transition: {
                      type: "spring",
                      stiffness: 250,
                      damping: 18,
                    },
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  {t.openMaps}
                </motion.a>

                <motion.a
                  custom={1}
                  href={`mailto:${email}`}
                  variants={findUsVariants.ctaButton(1)}
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-all duration-200 ${
                    isDarkMode
                      ? "border-neutral-700 text-neutral-100 hover:bg-neutral-800"
                      : "border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                  }`}
                  whileHover={{
                    y: -3,
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.3)",
                    transition: {
                      type: "spring",
                      stiffness: 250,
                      damping: 18,
                    },
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Mail className="w-4 h-4" />
                  {t.sendEmail}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
