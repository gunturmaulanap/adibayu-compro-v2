import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/lib/content";

type InsightCardProps = {
  insight: Insight;
  isDarkMode?: boolean;
};

export default function InsightCard({ insight, isDarkMode }: InsightCardProps) {
  return (
    <article
      className={`h-full border transition duration-300 hover:-translate-y-0.5 rounded-xl overflow-hidden ${
        isDarkMode
          ? "border-white/10 hover:border-white/30 bg-[#1a1d26]"
          : "border-gray-200 hover:border-gray-900 bg-white"
      }`}
    >
      <Link href={`/insights/${insight.slug}`} className="block h-full">
        <div className="relative h-96 md:h-[28rem] w-full overflow-hidden">
          <Image
            src={insight.coverImageUrl}
            alt={insight.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="p-5 md:p-6 min-h-[210px] md:min-h-[230px]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span
              className={`inline-flex border px-2.5 py-1 text-[11px] font-medium rounded-md ${
                isDarkMode
                  ? "border-white/20 text-gray-300"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {insight.category}
            </span>
            <time
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {insight.date}
            </time>
          </div>

          <h3
            className={`text-xl font-semibold tracking-tight leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {insight.title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed line-clamp-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {insight.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
