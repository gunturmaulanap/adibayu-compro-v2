"use client";

import { useState } from "react";
import type { Insight } from "@/lib/content";
import InsightCard from "@/components/InsightCard";

type InsightsFilterProps = {
  insights: Insight[];
  isDarkMode?: boolean;
};

export default function InsightsFilter({
  insights,
  isDarkMode = false,
}: InsightsFilterProps) {
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="Corporate Strategy">Corporate Strategy</option>
          <option value="Operations">Operations</option>
          <option value="Market">Market</option>
          <option value="Sustainability">Sustainability</option>
        </select>

        <input
          type="search"
          placeholder="Search insights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 rounded-xl outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
        {filteredInsights.map((item) => (
          <InsightCard key={item.id} insight={item} isDarkMode={isDarkMode} />
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No insights found matching your criteria.
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
