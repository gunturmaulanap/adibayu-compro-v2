import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailPageClient from "@/components/pages/NewsDetailPageClient";
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
      title: "News Not Found | Adibayu Group",
    };
  }

  return {
    title: `${insight.title} | News & Updates | Adibayu Group`,
    description: insight.excerpt,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await getPublishedInsightBySlug(slug);

  if (!insight) notFound();

  const allInsights = await listPublishedInsights();
  const related = allInsights
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 3);

  return <NewsDetailPageClient insight={insight} related={related} />;
}
