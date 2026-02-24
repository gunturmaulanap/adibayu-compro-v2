"use client";

import Link from "next/link";
import Image from "next/image";
import logoDarkMode from "./assets/logos/dark-mode.png";
import logoLightMode from "./assets/logos/light-mode.png";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { useValueChainNavigation } from "@/lib/useValueChainNavigation";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type FooterProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

type FooterLink = {
  href: string;
  label: string;
};

type LinkColumnProps = {
  title: string;
  links: FooterLink[];
  isDarkMode: boolean;
  businessTitle: string;
  valueEcosystemLabel: string;
};

function LinkColumn({
  title,
  links,
  isDarkMode,
  businessTitle,
  valueEcosystemLabel,
}: LinkColumnProps) {
  const { navigateToPillar } = useValueChainNavigation();

  const handleClick = (index: number) => {
    const pillarId =
      index === 0 ? "manufacturing" : index === 1 ? "distribution" : "retail";
    navigateToPillar(pillarId);
  };

  return (
    <div>
      <h3
        className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          isDarkMode ? "text-neutral-50" : "text-neutral-900"
        }`}
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={`${link.href}-${index}`}>
            {title === businessTitle && link.label !== valueEcosystemLabel ? (
              <button
                onClick={() => handleClick(index)}
                className={`text-sm transition-colors duration-200 hover:underline underline-offset-2 text-left w-full ${
                  isDarkMode
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-200 hover:underline underline-offset-2 ${
                  isDarkMode
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ isDarkMode = false, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = copy[locale].home.footer;

  const footerLinks = {
    businesses: [
      { href: "#value-chain", label: t.businessLinks[0] },
      { href: "#value-chain", label: t.businessLinks[1] },
      { href: "#value-chain", label: t.businessLinks[2] },
      { href: "#value-chain", label: t.businessLinks[3] },
    ],
    whoWeAre: [
      { href: "/who-we-are", label: t.whoLinks[0] },
      { href: "/who-we-are#vision", label: t.whoLinks[1] },
      { href: "/who-we-are#leadership", label: t.whoLinks[2] },
      { href: "/governance", label: t.whoLinks[3] },
    ],
    impact: [
      { href: "#impact", label: t.impactLinks[0] },
      { href: "/#latest-insights", label: t.impactLinks[1] },
      //   { href: "#", label: t.impactLinks[2] },
      //   { href: "#", label: t.impactLinks[3] },
    ],
    legal: [
      { href: "/privacy", label: t.legalLinks[0] },
      { href: "/terms", label: t.legalLinks[1] },
      { href: "/cookies", label: t.legalLinks[2] },
    ],
  };

  return (
    <footer
      className={`w-full transition-colors duration-300 ${
        isDarkMode ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src={logoLightMode}
                alt="Adibayu Group"
                width={360}
                height={120}
                className={`h-16 w-auto ${isDarkMode ? "hidden" : "block"}`}
                priority
              />
              <Image
                src={logoDarkMode}
                alt="Adibayu Group"
                width={360}
                height={120}
                className={`h-16 w-auto ${isDarkMode ? "block" : "hidden"}`}
                priority
              />
            </Link>

            <p
              className={`text-sm leading-relaxed max-w-sm ${
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {t.summary}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition-colors duration-200 ${
                  isDarkMode
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-colors duration-200 ${
                  isDarkMode
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <LinkColumn
              title={t.businesses}
              links={footerLinks.businesses}
              isDarkMode={isDarkMode}
              businessTitle={t.businesses}
              valueEcosystemLabel={t.businessLinks[3]}
            />
            <LinkColumn
              title={t.whoWeAre}
              links={footerLinks.whoWeAre}
              isDarkMode={isDarkMode}
              businessTitle={t.businesses}
              valueEcosystemLabel={t.businessLinks[3]}
            />
            <LinkColumn
              title={t.impactInsights}
              links={footerLinks.impact}
              isDarkMode={isDarkMode}
              businessTitle={t.businesses}
              valueEcosystemLabel={t.businessLinks[3]}
            />
            <LinkColumn
              title={t.legal}
              links={footerLinks.legal}
              isDarkMode={isDarkMode}
              businessTitle={t.businesses}
              valueEcosystemLabel={t.businessLinks[3]}
            />
          </div>
        </div>

        <div
          className={`mt-12 pt-8 border-t transition-colors duration-300 ${
            isDarkMode ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p
              className={`text-sm ${
                isDarkMode ? "text-neutral-500" : "text-neutral-600"
              }`}
            >
              © {currentYear} {t.rights}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href="mailto:office@adibayu.com"
                className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                  isDarkMode
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>office@adibayu.com</span>
              </a>
              <a
                href="tel:+6281127009505"
                className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                  isDarkMode
                    ? "text-neutral-500 hover:text-neutral-300"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+62-811-2700-9505</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
