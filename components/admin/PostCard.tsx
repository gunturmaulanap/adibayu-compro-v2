import Link from "next/link";
import { FileText, Calendar, Edit, Trash2 } from "lucide-react";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    status: string;
    updated_at: string;
  };
  deleteAction: (id: string) => React.ReactNode;
};

export function PostCard({ post, deleteAction }: PostCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {post.title}
          </h3>
        </div>
      </div>

      {/* Metadata: Status + Date */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            post.status === "published"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {post.status}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span className="truncate">{post.updated_at}</span>
        </div>
      </div>

      {/* Actions: Full-width buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
        <Link
          href={`/admin/posts/${post.id}/edit`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Link>
        <div className="inline-flex items-center justify-center">
          {deleteAction(post.id)}
        </div>
      </div>
    </div>
  );
}
