import { listCategories } from "@/lib/posts-repository";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="mt-2 text-sm text-gray-600">
          Connected to Supabase `categories` table.
        </p>
      </div>

      <div className="border border-gray-200 overflow-x-auto">
        <table className="w-full text-left min-w-[680px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                Slug
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {category.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {category.slug}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {category.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
