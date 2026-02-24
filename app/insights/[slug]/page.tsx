import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightDetailPageClient from "@/components/pages/InsightDetailPageClient";
import {
  getPublishedInsightBySlug,
  listPublishedInsights,
} from "@/lib/posts-repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getPublishedInsightBySlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found | Adibayu Group",
    };
  }

  return {
    title: `${insight.title} | Insights | Adibayu Group`,
    description: insight.excerpt,
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getPublishedInsightBySlug(slug);

  if (!insight) notFound();

  const allInsights = await listPublishedInsights();
  const related = allInsights
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 3);

  return <InsightDetailPageClient insight={insight} related={related} />;
}
