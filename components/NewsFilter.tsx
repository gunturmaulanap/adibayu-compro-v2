"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Insight } from "@/lib/content";
import NewsCard from "@/components/NewsCard";

type NewsFilterProps = {
  insights: Insight[];
  isDarkMode?: boolean;
};

export default function NewsFilter({
  insights,
  isDarkMode = false,
}: NewsFilterProps) {
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Corporate Strategy",
    "Operations",
    "Market",
    "Sustainability",
  ] as const;

  const selectedCategoryLabel = category || "All Categories";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredInsights = insights.filter((insight) => {
    const matchesCategory = !category || insight.category === category;

    const matchesSearch =
      !searchQuery ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 mb-8 md:mb-10">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all flex items-center justify-between"
            aria-label="Filter by category"
            aria-expanded={isOpen}
          >
            <span className="truncate">{selectedCategoryLabel}</span>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full mt-2 border border-gray-300 bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setCategory("");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span>All Categories</span>
                {category === "" ? <Check className="h-4 w-4 text-gray-900" /> : null}
              </button>

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between border-t border-gray-100"
                >
                  <span>{item}</span>
                  {category === item ? <Check className="h-4 w-4 text-gray-900" /> : null}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="search"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
        {filteredInsights.map((item) => (
          <NewsCard key={item.id} insight={item} isDarkMode={isDarkMode} />
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No news found matching your criteria.
          </p>
          <button
            onClick={() => {
              setCategory("");
              setSearchQuery("");
            }}
            className="mt-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
