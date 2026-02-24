import Link from "next/link";
import { createPostAction } from "@/app/admin/actions";
import AdminToast from "@/components/admin/AdminToast";
import PostForm from "@/components/admin/PostForm";

type AdminNewPostPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminNewPostPage({
  searchParams,
}: AdminNewPostPageProps) {
  const { error, success } = await searchParams;

  return (
    <div>
      <AdminToast
        message={error || success}
        type={error ? "error" : "success"}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </Link>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Create Post
        </h1>
        <p className="mt-2 text-gray-600">
          Write and publish new content
        </p>
      </div>

      <PostForm action={createPostAction} submitLabel="Create Post" />
    </div>
  );
}
