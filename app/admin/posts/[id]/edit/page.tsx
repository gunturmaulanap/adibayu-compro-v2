import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePostAction } from "@/app/admin/actions";
import AdminToast from "@/components/admin/AdminToast";
import PostForm from "@/components/admin/PostForm";
import { getPostById } from "@/lib/posts-repository";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminEditPostPage({
  params,
  searchParams,
}: EditPostPageProps) {
  const { id } = await params;
  const { error, success } = await searchParams;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <div>
      <AdminToast
        message={error || success}
        type={error ? "error" : "success"}
      />

      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <Link
          href="/admin/posts"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Posts
        </Link>
      </div>

      <PostForm
        action={updatePostAction}
        submitLabel="Update Post"
        defaultValues={post}
        postId={post.id}
      />
    </div>
  );
}
