"use client";

import Image from "next/image";
import { useState } from "react";
import type { GovernanceCompany } from "@/lib/governance";
import BrandGrid from "@/components/governance/BrandGrid";

type CompanyCardProps = {
  company: GovernanceCompany;
  mobileCollapsible?: boolean;
  onHoverChange?: (isHovering: boolean) => void;
};

const companyFallbackImages: Record<string, string> = {
  aksamala:
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
  nakama:
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  habbie:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  achievement:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  satyalaksana:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  realhe:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "PT";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

export default function CompanyCard({
  company,
  mobileCollapsible = true,
  onHoverChange,
}: CompanyCardProps) {
  const [imageStage, setImageStage] = useState<
    "jpg" | "png" | "fallback" | "failed"
  >("jpg");
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  const imageSrcJpg = `/images/pt/${company.slug}.jpg`;
  const imageSrcPng = `/images/pt/${company.slug}.png`;
  const imageSrcFallback =
    companyFallbackImages[company.slug] ??
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80";

  const activeImageSrc =
    imageStage === "jpg"
      ? imageSrcJpg
      : imageStage === "png"
        ? imageSrcPng
        : imageSrcFallback;

  return (
    <div
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow duration-200 hover:shadow-md dark:bg-[#0f172a] dark:ring-white/10"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {company.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {company.descriptor}
          </p>
        </div>
      </div>

      <div className="mb-5 overflow-hidden rounded-2xl border border-black/5 bg-[#f0f0f1] dark:border-white/10 dark:bg-[#0b1220]">
        {imageStage !== "failed" ? (
          <Image
            src={activeImageSrc}
            alt={`${company.name} operating company`}
            width={960}
            height={420}
            className="h-36 w-full object-cover sm:h-44"
            unoptimized={imageStage === "fallback"}
            onError={() => {
              if (imageStage === "jpg") {
                setImageStage("png");
                return;
              }
              if (imageStage === "png") {
                setImageStage("fallback");
                return;
              }
              setImageStage("failed");
            }}
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center sm:h-44">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-lg font-semibold text-gray-700 shadow-sm dark:bg-white/10 dark:text-gray-100">
              {getInitials(company.name)}
            </div>
          </div>
        )}
      </div>

      {mobileCollapsible ? (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsBrandsOpen((prev) => !prev)}
            className="mb-3 inline-flex items-center rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-white/20 dark:text-gray-200 dark:hover:bg-white/10"
            aria-expanded={isBrandsOpen}
            aria-label={`Toggle brands for ${company.name}`}
          >
            {isBrandsOpen ? "Hide brands" : "Show brands"}
          </button>
          {isBrandsOpen && <BrandGrid brands={company.brands} />}
        </div>
      ) : null}

      <div className={mobileCollapsible ? "hidden md:block" : "block"}>
        <BrandGrid brands={company.brands} />
      </div>
    </div>
  );
}
