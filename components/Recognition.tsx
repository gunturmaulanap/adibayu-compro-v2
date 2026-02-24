"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Trophy, Target, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type RecognitionItem = {
  id: string;
  entity: string;
  title: string;
  year: string;
  icon: React.ComponentType<{ className?: string }>;
  certificateImage: string;
};

type RecognitionProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

export default function Recognition({
  isDarkMode = false,
  locale,
}: RecognitionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = copy[locale].home.recognition;

  const awards: RecognitionItem[] = [
    {
      id: "1",
      entity: "Adibayu Group",
      title: "Great Place to Work Certification",
      year: "2023",
      icon: Award,
      certificateImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      entity: "Adibayu Manufacturing",
      title: "Industry Excellence Recognition",
      year: "2022",
      icon: Trophy,
      certificateImage:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      entity: "Adibayu Retail",
      title: "Top Emerging Consumer Brand",
      year: "2023",
      icon: Target,
      certificateImage:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      entity: "Adibayu Distribution",
      title: "Supply Chain Innovation Award",
      year: "2023",
      icon: Sparkles,
      certificateImage:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "5",
      entity: "Adibayu Group",
      title: "Sustainability Leadership",
      year: "2022",
      icon: Award,
      certificateImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "6",
      entity: "Adibayu Manufacturing",
      title: "Quality Excellence Standard",
      year: "2021",
      icon: Trophy,
      certificateImage:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Split awards into two columns
  const leftColumn = awards.slice(0, Math.ceil(awards.length / 2));
  const rightColumn = awards.slice(Math.ceil(awards.length / 2));

  const AwardRow = ({ award }: { award: RecognitionItem }) => {
    const Icon = award.icon;
    const isActive = hoveredId === award.id; // hover on desktop, click on mobile

    return (
      <div
        className={`relative border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
        onMouseEnter={() => setHoveredId(award.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => setHoveredId(isActive ? null : award.id)}
        role="button"
        tabIndex={0}
      >
        <div className="relative py-5 md:py-6">
          {/* Floating Logo Badge (doesn't take layout space) */}
          <div
            className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              isActive
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-1 scale-95"
            }`}
          >
            <div
              className={`h-9 w-9 md:h-10 md:w-10 rounded-xl flex items-center justify-center ${
                isDarkMode ? "bg-white" : "bg-gray-900"
              } shadow-lg`}
            >
              <Icon
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  isDarkMode ? "text-gray-900" : "text-white"
                }`}
              />
            </div>
          </div>

          {/* Content wrapper: default rata kiri, shift kanan hanya saat badge muncul */}
          <div
            className={`transition-all duration-300 ${
              isActive ? "pl-12 md:pl-14" : "pl-0"
            }`}
          >
            {/* Mobile-first: stack. Desktop: row */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {/* Entity */}
              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {award.entity}
              </p>

              {/* Title */}
              <h3
                className={`text-base md:text-lg font-medium leading-snug ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {award.title}
              </h3>

              {/* Year: di mobile turun ke bawah (karena flex-col). Di desktop ke kanan */}
              <span
                className={`text-xs md:text-sm sm:ml-auto ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {award.year}
              </span>
            </div>
          </div>

          {/* Certificate Popup — only desktop */}
          {isActive && (
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
              <div className="relative animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="relative w-48 h-96 rounded-xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src={award.certificateImage}
                    alt={`${award.title} Certificate`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-medium text-center ${
                    isDarkMode
                      ? "bg-black/70 text-white"
                      : "bg-white/90 text-gray-900"
                  }`}
                >
                  {award.year} Certificate
                </div>
              </div>
            </div>
          )}

          {/* Mobile: show a small preview badge when active */}
          {isActive && (
            <div className="lg:hidden mt-3">
              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 animate-in fade-in zoom-in-95 duration-300 ${
                  isDarkMode
                    ? "bg-white/10 text-white"
                    : "bg-gray-900/10 text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">Tap again to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="section-8"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0B0F19]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h2>
          <p
            className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Awards Grid - 2 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
          {/* Left Column */}
          <div className="space-y-0">
            {leftColumn.map((award) => (
              <AwardRow key={award.id} award={award} />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-0">
            {rightColumn.map((award) => (
              <AwardRow key={award.id} award={award} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div
          className={`mt-8 pt-8  ${
            isDarkMode ? "border-white/10" : "border-gray-200"
          }`}
        >
          <p
            className={`text-xs leading-relaxed ${
              isDarkMode ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
