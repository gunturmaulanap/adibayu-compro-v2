import heroBg from "./assets/hero/adibayu-hero-section.jpg";
import heroBgDark from "./assets/hero/adibayu-hero-section-dark.jpg";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type HeroProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

export default function Hero({ isDarkMode, locale }: HeroProps) {
  const isDark = isDarkMode;
  const t = copy[locale].home.hero;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${isDark ? heroBgDark.src : heroBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 15% Dark Overlay */}
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto mt-20">
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold text-white tracking-tighter leading-[0.95]">
          {t.title1}
          <br />
          {t.title2}
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-[50ch] mx-auto font-medium leading-relaxed">
          {t.subtitle}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {t.cta1}
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
            {t.cta2}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs font-medium tracking-widest uppercase">
          {t.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>
  );
}
