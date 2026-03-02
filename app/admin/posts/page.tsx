import Link from "next/link";
import { deletePostAction } from "@/app/admin/actions";
import AdminToast from "@/components/admin/AdminToast";
import { PageHeader } from "@/components/admin/PageHeader";
import { MobileCardList } from "@/components/admin/MobileCardList";
import { PostCard } from "@/components/admin/PostCard";
import { listPosts } from "@/lib/posts-repository";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminPostsPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function AdminPostsPage({
  searchParams,
}: AdminPostsPageProps) {
  const { success, error } = await searchParams;
  const posts = await listPosts();

  // Create delete form component for use in cards
  const createDeleteForm = (id: string) => (
    <form action={deletePostAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </button>
    </form>
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <AdminToast
        message={success || error}
        type={error ? "error" : "success"}
      />

      {/* Header Section - Fully Responsive */}
      <PageHeader
        title="Posts"
        description={`Manage and publish your content (${posts.length} total)`}
        actions={
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </Link>
          </Button>
        }
      />

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Updated
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border/70 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="text-sm font-medium text-foreground max-w-md truncate">
                        {post.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {post.updated_at}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </Link>
                      {createDeleteForm(post.id)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <MobileCardList
        empty={
          posts.length === 0 ? (
            <div className="md:hidden text-center py-12">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                No posts yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started by creating your first post.
              </p>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/admin/posts/new">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Link>
              </Button>
            </div>
          ) : null
        }
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} deleteAction={createDeleteForm} />
        ))}
      </MobileCardList>

      {/* Desktop Empty State */}
      {posts.length === 0 && (
        <div className="hidden md:block text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No posts yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Get started by creating your first post.
          </p>
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
