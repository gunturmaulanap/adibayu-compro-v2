"use client";

import Image from "next/image";
import { Users, TrendingUp, Leaf } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type WhyWeExistProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

const pillars = [
  {
    title: "People",
    description:
      "Developing talent, strengthening communities, and creating opportunities across our ecosystem.",
    icon: Users,
  },
  {
    title: "Progress",
    description:
      "Driving operational excellence, innovation, and long-term competitiveness across our enterprises.",
    icon: TrendingUp,
  },
  {
    title: "Sustainability",
    description:
      "Ensuring responsible growth through efficient resource use and future-oriented business practices.",
    icon: Leaf,
  },
];

export default function WhyWeExist({
  isDarkMode = false,
  locale,
}: WhyWeExistProps) {
  const t = copy[locale].home.whyWeExist;
  const purposeQuote =
    locale === "id"
      ? "Adibayu Group hadir untuk mendorong pertumbuhan terintegrasi lintas industri yang memberi manfaat bagi masyarakat, memperkuat pasar, dan berkontribusi pada kemajuan sosial jangka panjang."
      : "Adibayu Group exists to enable integrated growth across industries that benefits people, strengthens markets, and contributes to long-term societal progress.";
  return (
    <section
      id="impact"
      className={`py-20 md:py-24 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_10%_20%,rgba(15,23,42,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h2>
          <p
            className={`mt-4 text-base md:text-lg leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="relative mt-10 md:mt-12 h-[360px] md:h-[420px] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
            alt="People and industry collaboration"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/35 dark:bg-[#020617]/45" />
          <div className="relative h-full w-full flex items-center justify-center px-6 md:px-14 text-center">
            <p
              className={`max-w-4xl text-2xl md:text-4xl leading-snug tracking-tight font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              “{purposeQuote}”
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative">
            {pillars.map((pillar, index) => {
              return (
                <article
                  key={pillar.title}
                  className={`group relative border rounded-2xl p-6 transition-all duration-300 motion-safe:duration-500 ${
                    isDarkMode
                      ? "border-white/10 bg-[#10141d]"
                      : "border-gray-200 bg-white"
                  } hover:-translate-y-0.5`}
                >
                  <div className="flex items-start gap-3">
                    <pillar.icon
                      className={`w-5 h-5 mt-0.5 transition-transform duration-300 group-hover:scale-105 ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                      strokeWidth={1.7}
                    />
                    <div>
                      <h3
                        className={`text-lg font-semibold tracking-tight ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t.pillars[index]?.title ?? pillar.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {t.pillars[index]?.description ?? pillar.description}
                      </p>
                    </div>
                  </div>

                  {index < pillars.length - 1 ? (
                    <span
                      className={`hidden md:block absolute top-1/2 -right-2 w-4 h-px transition-colors duration-300 group-hover:bg-sky-400/60 ${
                        isDarkMode ? "bg-white/25" : "bg-gray-300"
                      }`}
                    />
                  ) : null}

                  {index < pillars.length - 1 ? (
                    <span
                      className={`md:hidden absolute left-1/2 -bottom-3 h-3 w-px ${
                        isDarkMode ? "bg-white/20" : "bg-gray-300"
                      }`}
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
