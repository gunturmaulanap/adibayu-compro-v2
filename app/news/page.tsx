import type { Metadata } from "next";
import NewsPageClient from "@/components/pages/NewsPageClient";
import { listPublishedInsights } from "@/lib/posts-repository";

export const metadata: Metadata = {
  title: "News & Updates | Adibayu Group",
  description: "Latest developments and strategic updates from our ecosystem.",
};

export default async function NewsPage() {
  const insights = await listPublishedInsights();

  return <NewsPageClient insights={insights} />;
}
