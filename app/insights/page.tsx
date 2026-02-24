import type { Metadata } from "next";
import InsightsPageClient from "@/components/pages/InsightsPageClient";
import { listPublishedInsights } from "@/lib/posts-repository";

export const metadata: Metadata = {
  title: "Insights | Adibayu Group",
  description: "Strategic perspectives shaping our industries.",
};

export default async function InsightsPage() {
  const insights = await listPublishedInsights();

  return <InsightsPageClient insights={insights} />;
}
