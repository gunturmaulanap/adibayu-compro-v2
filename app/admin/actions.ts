"use server";

import { redirect } from "next/navigation";
import { createPost, deletePost, updatePost } from "@/lib/posts-repository";
import { slugifyTitle } from "@/lib/slug";

function isRedirectErrorLike(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function fail(message: string, redirectPath: string): never {
  redirect(
    `${redirectPath}${redirectPath.includes("?") ? "&" : "?"}error=${encodeURIComponent(message)}`,
  );
}

function success(message: string, redirectPath: string): never {
  redirect(
    `${redirectPath}${redirectPath.includes("?") ? "&" : "?"}success=${encodeURIComponent(message)}`,
  );
}

function normalizePostPayload(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugifyTitle(slugInput || title);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const cover_image_url = String(formData.get("cover_image_url") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const status = String(formData.get("status") || "draft").trim() as
    | "draft"
    | "published";
  const publishedRaw = String(formData.get("published_at") || "").trim();

  return {
    title,
    slug,
    excerpt,
    content,
    cover_image_url,
    category,
    status,
    published_at: publishedRaw || null,
  };
}

function validatePostPayload(payload: ReturnType<typeof normalizePostPayload>) {
  if (!payload.title) return "Title is required.";
  if (!payload.slug) return "Slug is required.";
  if (!payload.excerpt) return "Excerpt is required.";
  if (!payload.content) return "Content is required.";
  if (!payload.cover_image_url) return "Cover image URL is required.";
  if (!/^https?:\/\//.test(payload.cover_image_url)) {
    return "Cover image URL must be a valid http(s) URL.";
  }
  if (!payload.category) return "Category is required.";
  if (!["draft", "published"].includes(payload.status))
    return "Invalid status.";
  return null;
}

export async function createPostAction(formData: FormData) {
  const payload = normalizePostPayload(formData);
  const error = validatePostPayload(payload);
  if (error) fail(error, "/admin/posts/new");

  try {
    await createPost(payload);
  } catch (err) {
    if (isRedirectErrorLike(err)) throw err;
    fail(
      err instanceof Error ? err.message : "Failed to create insight.",
      "/admin/posts/new",
    );
  }

  success("Insight created successfully.", "/admin/posts");
}

export async function updatePostAction(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) fail("Invalid post id.", "/admin/posts");

  const payload = normalizePostPayload(formData);
  const error = validatePostPayload(payload);
  if (error) fail(error, `/admin/posts/${id}/edit`);

  try {
    await updatePost(id, payload);
  } catch (err) {
    if (isRedirectErrorLike(err)) throw err;
    fail(
      err instanceof Error ? err.message : "Failed to update insight.",
      `/admin/posts/${id}/edit`,
    );
  }

  success("Insight updated successfully.", "/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) fail("Invalid post id.", "/admin/posts");

  try {
    await deletePost(id);
  } catch (err) {
    if (isRedirectErrorLike(err)) throw err;
    fail(
      err instanceof Error ? err.message : "Failed to delete insight.",
      "/admin/posts",
    );
  }

  success("Insight deleted successfully.", "/admin/posts");
}
