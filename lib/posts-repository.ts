import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  mockAdminPosts,
  mockInsights,
  type AdminPost,
  type Insight,
} from "@/lib/content";

let localPosts: AdminPost[] = [...mockAdminPosts];

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

const fallbackCategories: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Corporate Strategy",
    slug: "corporate-strategy",
    description:
      "Strategic direction, governance, and portfolio orchestration.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Operations",
    slug: "operations",
    description: "Operational excellence across production and distribution.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Market",
    slug: "market",
    description: "Market insights, channel growth, and commercial execution.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Sustainability",
    slug: "sustainability",
    description: "Long-term environmental and social value creation.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

type DbPost = Partial<AdminPost> & Record<string, unknown>;

function normalizeDbPost(row: DbPost): AdminPost {
  const publishedAtValue =
    (row.published_at as string | null | undefined) ??
    (row.updated_at as string | undefined) ??
    null;

  return {
    id: String(row.id ?? `local-${Date.now()}`),
    title: String(row.title ?? "Untitled Insight"),
    slug: String(row.slug ?? "untitled-insight"),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    cover_image_url: String(
      row.cover_image_url ??
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    ),
    category: String(row.category ?? "Corporate Strategy"),
    status: row.status === "published" ? "published" : "draft",
    published_at: publishedAtValue,
    updated_at: String(row.updated_at ?? new Date().toISOString()),
  };
}

function mapPostToInsight(post: AdminPost): Insight {
  const dateSource = post.published_at || post.updated_at;
  const normalizedDate =
    dateSource.length >= 10 ? dateSource.slice(0, 10) : dateSource;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category:
      post.category === "Operations" ||
      post.category === "Market" ||
      post.category === "Sustainability"
        ? post.category
        : "Corporate Strategy",
    date: normalizedDate,
    coverImageUrl: post.cover_image_url,
  };
}

function sortByUpdatedAt(posts: AdminPost[]): AdminPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function listPosts(): Promise<AdminPost[]> {
  if (!isSupabaseConfigured) return sortByUpdatedAt(localPosts);

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase client unavailable");
  }

  const { data, error } = await supabase.from("posts").select("*");

  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch posts");
  }
  return sortByUpdatedAt(data.map((row) => normalizeDbPost(row as DbPost)));
}

export async function getPostById(id: string): Promise<AdminPost | null> {
  if (!isSupabaseConfigured) {
    return localPosts.find((post) => post.id === id) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase client unavailable");
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return normalizeDbPost(data as DbPost);
}

type PostPayload = Omit<AdminPost, "id" | "updated_at">;

export async function createPost(payload: PostPayload): Promise<AdminPost> {
  if (!isSupabaseConfigured) {
    const post: AdminPost = {
      ...payload,
      id: `local-${Date.now()}`,
      updated_at: new Date().toISOString(),
    };
    localPosts = [post, ...localPosts];
    return post;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase client unavailable");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create post");
  }

  return normalizeDbPost(data as DbPost);
}

export async function updatePost(
  id: string,
  payload: PostPayload,
): Promise<AdminPost | null> {
  if (!isSupabaseConfigured) {
    const idx = localPosts.findIndex((post) => post.id === id);
    if (idx < 0) return null;

    const updated: AdminPost = {
      ...localPosts[idx],
      ...payload,
      updated_at: new Date().toISOString(),
    };
    localPosts[idx] = updated;
    return updated;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client unavailable");

  const { data, error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update post");
  }
  return normalizeDbPost(data as DbPost);
}

export async function deletePost(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    localPosts = localPosts.filter((post) => post.id !== id);
    return;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client unavailable");

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    throw new Error(error.message || "Failed to delete post");
  }
}

export async function listPublishedInsights(
  limit?: number,
): Promise<Insight[]> {
  if (!isSupabaseConfigured) {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }

  try {
    const posts = await listPosts();
    const published = posts
      .filter((post) => post.status === "published")
      .sort((a, b) => {
        const dateA = new Date(a.updated_at || a.published_at || 0).getTime();
        const dateB = new Date(b.updated_at || b.published_at || 0).getTime();
        return dateB - dateA;
      });
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  } catch {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }
}

export async function getPublishedInsightBySlug(
  slug: string,
): Promise<Insight | null> {
  const insights = await listPublishedInsights();
  return insights.find((item) => item.slug === slug) ?? null;
}

export async function listCategories(): Promise<CategoryItem[]> {
  if (!isSupabaseConfigured) return fallbackCategories;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallbackCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description,created_at,updated_at")
    .order("name", { ascending: true });

  if (error || !data) return fallbackCategories;
  return data as CategoryItem[];
}
