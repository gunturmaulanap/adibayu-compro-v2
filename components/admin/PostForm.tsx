import type { AdminPost } from "@/lib/content";
import SlugField from "@/components/admin/SlugField";

type PostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: Partial<AdminPost>;
  postId?: string;
};

export default function PostForm({
  action,
  submitLabel,
  defaultValues,
  postId,
}: PostFormProps) {
  return (
    <form
      action={action}
      className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
    >
      {postId ? <input type="hidden" name="id" defaultValue={postId} /> : null}

      <SlugField defaultTitle={defaultValues?.title} />

      <div>
        <label
          htmlFor="excerpt"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={defaultValues?.excerpt}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          placeholder="Brief description of the post..."
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Content (Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={defaultValues?.content}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all font-mono"
          placeholder="Write your content in Markdown..."
        />
      </div>

      <div>
        <label
          htmlFor="cover_image_url"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Cover image URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          defaultValue={defaultValues?.cover_image_url}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={defaultValues?.category}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
            placeholder="Corporate Strategy"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "draft"}
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="published_at"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Published at
          </label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            defaultValue={defaultValues?.published_at ?? ""}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
