"use client";

import { useState, useEffect, type MouseEvent } from "react";
import {
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Network,
  Building2,
  Layers3,
  Newspaper,
  Briefcase,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logoLightMode from "./assets/logos/logo-light.png";
import logoDarkMode from "./assets/logos/logo-dark.png";
import { useValueChainNavigation } from "@/lib/useValueChainNavigation";
import { useLocale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type NavbarProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  solidOnTop?: boolean;
};

export default function Navbar({
  isDarkMode,
  onToggleTheme,
  solidOnTop = false,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, toggleLocale } = useLocale();
  const t = copy[locale]?.navbar ?? copy.en.navbar;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateToPillar } = useValueChainNavigation();

  useEffect(() => {
    const getScrollTop = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isTransparentTop = !isScrolled && !solidOnTop;
  const isSolidNav = isScrolled || solidOnTop;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return false;

    const navOffset = window.innerWidth >= 1024 ? 120 : 92;
    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    return true;
  };

  const handleSectionNavigation = (sectionId: string) => {
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const targetHash = `#${sectionId}`;
    const nextUrl = `/${targetHash}`;

    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", nextUrl);
    }

    const didScroll = scrollToSection(sectionId);
    if (!didScroll) {
      router.push(`/#${sectionId}`);
    }

    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash.startsWith("#")) return;

    const sectionId = hash.slice(1);
    const run = () => {
      scrollToSection(sectionId);
    };

    const rafId = window.requestAnimationFrame(run);
    const timeoutId = window.setTimeout(run, 180);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      return;
    }

    if (window.location.pathname === "/" && window.location.hash) {
      window.history.replaceState(null, "", "/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 overflow-visible transition-[background-color,box-shadow] duration-200 ${
    isSolidNav
      ? isDarkMode
        ? "bg-[#090d16]/95 py-3 lg:py-4 shadow-sm backdrop-blur-md"
        : "bg-white py-3 lg:py-4 shadow-sm"
      : "bg-transparent py-3 lg:py-6"
  }`;

  const textClasses = isTransparentTop
    ? "text-white"
    : isDarkMode
      ? "text-white"
      : "text-gray-900";

  const dropdownClasses = isSolidNav
    ? isDarkMode
      ? "bg-[#111827]"
      : "bg-white border-gray-100"
    : "bg-black/60 backdrop-blur-xl";

  const dropdownHoverClasses = isSolidNav
    ? isDarkMode
      ? "hover:bg-white/10"
      : "hover:bg-gray-50"
    : "hover:bg-white/10";

  const dividerClasses = isSolidNav
    ? isDarkMode
      ? "bg-white/10"
      : "bg-gray-100"
    : "bg-white/10";

  const contactButtonClasses = isTransparentTop
    ? "bg-white text-black hover:bg-gray-200"
    : isDarkMode
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800";

  const mobileToggleTrackClasses = isDarkMode
    ? "bg-white/10 border-white/20"
    : "bg-gray-200 border-gray-300";

  const mobileToggleThumbClasses = isDarkMode ? "bg-white" : "bg-gray-900";

  const logoSrc = isTransparentTop
    ? logoLightMode
    : isDarkMode
      ? logoLightMode
      : logoDarkMode;

  const whoWeEmpowerLabel =
    locale === "id" ? "Perusahaan Kami" : "Our Companies";

  const aboutLabel = locale === "id" ? "Tentang Kami" : "About Us";
  const careerLabel = locale === "id" ? "Karir" : "Career";

  const handleToggleLocale = (source: "desktop" | "mobile") => {
    const scrollBefore = window.scrollY;

    if (source === "mobile") {
      setIsMobileMenuOpen(false);
    }

    toggleLocale();

    const restoreScroll = () => {
      window.scrollTo({ top: scrollBefore, behavior: "auto" });
    };

    window.requestAnimationFrame(restoreScroll);
    window.setTimeout(restoreScroll, 180);
  };

  return (
    <nav className={navClasses} onMouseLeave={() => setActiveDropdown(null)}>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 min-h-[56px] lg:min-h-0 flex items-center justify-between">
        <div
          className={`hidden lg:flex items-center gap-8 text-sm font-medium ${textClasses}`}
        >
          <div
            className="relative group cursor-pointer h-full py-2"
            onMouseEnter={() => setActiveDropdown("businesses")}
          >
            <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              {t.businesses} <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            {activeDropdown === "businesses" && (
              <div
                className={`absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden shadow-xl ${dropdownClasses}`}
              >
                <div className="flex flex-col py-3">
                  {t.businessItems.map((item, index) => (
                    <button
                      key={`${item}-${index}`}
                      onClick={() => {
                        const pillarId =
                          index === 0
                            ? "manufacturing"
                            : index === 1
                              ? "distribution"
                              : "retail";

                        if (pathname === "/") {
                          navigateToPillar(pillarId);
                        } else {
                          router.push("/#value-chain");
                        }

                        setActiveDropdown(null);
                      }}
                      className={`px-5 py-2.5 text-sm transition-colors text-left ${dropdownHoverClasses}`}
                    >
                      {item}
                    </button>
                  ))}
                  <div className={`h-px w-full my-2 ${dividerClasses}`}></div>
                  <Link
                    href="/#value-chain"
                    onClick={(event) => {
                      event.preventDefault();
                      handleSectionNavigation("value-chain");
                    }}
                    className={`px-5 py-2.5 text-sm font-semibold transition-colors ${dropdownHoverClasses}`}
                  >
                    {t.exploreValueChain}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative group cursor-pointer h-full py-2"
            onMouseEnter={() => setActiveDropdown("who-we-are")}
          >
            <div className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              {t.whoWeAre} <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            {activeDropdown === "who-we-are" && (
              <div
                className={`absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden shadow-xl ${dropdownClasses}`}
              >
                <div className="flex flex-col py-3">
                  {[
                    { label: aboutLabel, href: "/about-us" },
                    { label: t.governance, href: "/governance" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-5 py-2.5 text-sm transition-colors ${dropdownHoverClasses}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#our-companies"
            onClick={(event) => {
              event.preventDefault();
              handleSectionNavigation("our-companies");
            }}
            className="hover:opacity-70 transition-opacity py-2"
          >
            {whoWeEmpowerLabel}
          </Link>
          <Link
            href="/#latest-insights"
            onClick={(event) => {
              event.preventDefault();
              handleSectionNavigation("latest-insights");
            }}
            className="hover:opacity-70 transition-opacity py-2"
          >
            {t.insights}
          </Link>
          <Link
            href="/career"
            className="hover:opacity-70 transition-opacity py-2"
          >
            {careerLabel}
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex flex-col items-center justify-center group"
          >
            <Image
              src={logoSrc}
              alt="Adibayu logo"
              width={220}
              height={80}
              className="h-18 md:h-22 w-auto"
              priority
            />
          </Link>
        </div>

        <div
          className={`hidden lg:flex items-center gap-6 text-sm font-medium ${textClasses}`}
        >
          <button
            type="button"
            onClick={() => handleToggleLocale("desktop")}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 opacity-70" /> {locale.toUpperCase()}
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="hover:opacity-70 transition-opacity flex items-center justify-center"
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 opacity-70" />
            ) : (
              <Sun className="w-4 h-4 opacity-70" />
            )}
          </button>
          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 font-semibold ${contactButtonClasses}`}
            onClick={() => handleSectionNavigation("find-us")}
          >
            {t.contact}
          </button>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            className={`p-2 ${textClasses}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                  <line x1="6" y1="18" x2="18" y2="6"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-t ${
            isSolidNav
              ? isDarkMode
                ? "bg-[#0B0F19]/95 border-white/10"
                : "bg-white border-gray-200"
              : "bg-black/70 border-white/10 backdrop-blur-md"
          }`}
        >
          <div
            className={`px-6 py-4 flex flex-col gap-3 text-sm font-medium ${textClasses}`}
          >
            <Link
              href="/#value-chain"
              onClick={(event) => {
                event.preventDefault();
                handleSectionNavigation("value-chain");
              }}
              className="py-2 flex items-center gap-2"
            >
              <Network className="w-4 h-4 opacity-70" />
              {t.businesses}
            </Link>
            <Link
              href="/about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 opacity-70" />
              {aboutLabel}
            </Link>
            <Link
              href="/#our-companies"
              onClick={(event) => {
                event.preventDefault();
                handleSectionNavigation("our-companies");
              }}
              className="py-2 flex items-center gap-2"
            >
              <Layers3 className="w-4 h-4 opacity-70" />
              {whoWeEmpowerLabel}
            </Link>
            <Link
              href="/#latest-insights"
              onClick={(event) => {
                event.preventDefault();
                handleSectionNavigation("latest-insights");
              }}
              className="py-2 flex items-center gap-2"
            >
              <Newspaper className="w-4 h-4 opacity-70" />
              {t.insights}
            </Link>
            <Link
              href="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 opacity-70" />
              {careerLabel}
            </Link>
            <Link
              href="/governance"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 opacity-70" />
              {t.governance}
            </Link>
            <div className="pt-1 space-y-3">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 opacity-70" />
                  <span>{locale === "id" ? "Bahasa" : "Language"}</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label="Toggle language"
                  aria-checked={locale === "id"}
                  onClick={() => handleToggleLocale("mobile")}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full border transition-colors duration-300 ${mobileToggleTrackClasses}`}
                >
                  <span
                    className={`absolute left-1 text-[9px] font-semibold ${
                      locale === "id" ? "opacity-30" : "opacity-100"
                    } ${isDarkMode ? "text-white" : "text-gray-700"}`}
                  >
                    EN
                  </span>
                  <span
                    className={`absolute right-1 text-[9px] font-semibold ${
                      locale === "id" ? "opacity-100" : "opacity-30"
                    } ${isDarkMode ? "text-white" : "text-gray-700"}`}
                  >
                    ID
                  </span>
                  <span
                    className={`inline-block h-5 w-5 rounded-full transform transition-transform duration-300 ${mobileToggleThumbClasses} ${
                      locale === "id" ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="w-4 h-4 opacity-70" />
                  ) : (
                    <Sun className="w-4 h-4 opacity-70" />
                  )}
                  <span>{locale === "id" ? "Tema" : "Theme"}</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-label="Toggle theme"
                  aria-checked={isDarkMode}
                  onClick={onToggleTheme}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full border transition-colors duration-300 ${mobileToggleTrackClasses}`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full transform transition-transform duration-300 ${mobileToggleThumbClasses} ${
                      isDarkMode ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <button
              className={`mt-2 px-6 py-2.5 rounded-full transition-all duration-300 font-semibold w-fit ${contactButtonClasses}`}
              onClick={() => handleSectionNavigation("find-us")}
            >
              <span className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t.contact}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
