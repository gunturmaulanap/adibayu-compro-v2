export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Corporate Strategy" | "Operations" | "Market" | "Sustainability";
  date: string;
  coverImageUrl: string;
};

export const mockInsights: Insight[] = [
  {
    id: "ins-1",
    slug: "building-resilient-industrial-value-chains",
    title: "Building Resilient Industrial Value Chains",
    excerpt:
      "How governance alignment and operational discipline reinforce long-term performance across core sectors.",
    content:
      "Resilience in industrial ecosystems is no longer optional. It is built through governance clarity, disciplined investment, and cross-sector collaboration.\n\nAt Adibayu Group, value creation begins with strong operational foundations and clear strategic accountability. We focus on integrating manufacturing, distribution, and retail capabilities so each enterprise contributes to shared strength.\n\nThis approach enables faster adaptation to market shifts while preserving execution quality. By strengthening decision architecture and operating standards, holding structures can turn complexity into coordinated momentum.",
    category: "Corporate Strategy",
    date: "2026-02-10",
    coverImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ins-2",
    slug: "distribution-excellence-in-fragmented-markets",
    title: "Distribution Excellence in Fragmented Markets",
    excerpt:
      "Practical frameworks to improve reliability, speed, and cost control in national distribution networks.",
    content:
      "Distribution performance determines whether strategic intent becomes market reality. In fragmented markets, consistent service levels depend on process standardization and data-led planning.\n\nLeading groups optimize network design, route discipline, and inventory synchronization. They also align commercial and operational teams around measurable service outcomes.\n\nThe result is stronger market access, healthier margins, and improved resilience under demand volatility.",
    category: "Operations",
    date: "2026-02-05",
    coverImageUrl:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ins-3",
    slug: "retail-performance-through-operating-rhythm",
    title: "Retail Performance Through Operating Rhythm",
    excerpt:
      "A disciplined operating cadence helps retail organizations scale quality while protecting brand consistency.",
    content:
      "Retail growth is sustainable when operating rhythm is clear. High-performing organizations maintain governance routines that connect strategy to daily execution.\n\nFrom category planning to in-store standards, each process must support a consistent customer experience. Holdings can accelerate this by sharing best practices and performance playbooks across entities.\n\nConsistency at scale is not achieved through complexity, but through practical systems and accountable leadership.",
    category: "Market",
    date: "2026-01-30",
    coverImageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ins-4",
    slug: "institutional-governance-as-a-growth-multiplier",
    title: "Institutional Governance as a Growth Multiplier",
    excerpt:
      "Strong governance systems create confidence, improve execution quality, and reduce strategic drift.",
    content:
      "Institutional governance supports durable growth by creating clarity in authority, accountability, and oversight.\n\nFor diversified groups, this means balancing strategic direction from the holding level with operating autonomy at each enterprise. When governance is practical and transparent, organizations move faster with lower execution risk.\n\nThe long-term effect is stronger investor confidence and better outcomes across business cycles.",
    category: "Corporate Strategy",
    date: "2026-01-22",
    coverImageUrl:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ins-5",
    slug: "embedding-sustainability-into-core-operations",
    title: "Embedding Sustainability Into Core Operations",
    excerpt:
      "Long-term value emerges when sustainability is integrated into operating decisions, not treated as a side program.",
    content:
      "Sustainability contributes most when embedded into procurement, production, and distribution decisions.\n\nForward-looking groups align environmental and social targets with operational metrics, making progress measurable and actionable.\n\nThis integration strengthens competitiveness, supports risk management, and improves long-term stakeholder trust.",
    category: "Sustainability",
    date: "2026-01-16",
    coverImageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ins-6",
    slug: "from-holding-structure-to-ecosystem-advantage",
    title: "From Holding Structure to Ecosystem Advantage",
    excerpt:
      "How integrated holdings convert portfolio breadth into coordinated strategic advantage.",
    content:
      "A holding structure becomes an ecosystem advantage when it actively orchestrates capabilities across entities.\n\nThis requires clear strategic themes, disciplined resource allocation, and shared operating frameworks that elevate execution quality.\n\nWhen done well, groups improve resilience, accelerate capability building, and capture value beyond standalone performance.",
    category: "Corporate Strategy",
    date: "2026-01-09",
    coverImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
];

export type AdminPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
};

export const mockAdminPosts: AdminPost[] = mockInsights.map((insight) => ({
  id: insight.id,
  title: insight.title,
  slug: insight.slug,
  excerpt: insight.excerpt,
  content: insight.content,
  cover_image_url: insight.coverImageUrl,
  category: insight.category,
  status: "published",
  published_at: insight.date,
  updated_at: insight.date,
}));

export function getInsightBySlug(slug: string): Insight | undefined {
  return mockInsights.find((item) => item.slug === slug);
}
