import { getCategories } from "@/lib/api";
import { Category } from "@/types/category";

export default async function CategoryListPage() {
  const data = await getCategories();
  const categories = data || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <div className="bg-white p-6 rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((cat: Category) => (
                <tr key={cat._id} className="border-b">
                  <td className="py-2 text-gray-600">{cat._id}</td>
                  <td className="py-2 font-semibold">{cat.name}</td>
                  <td className="py-2 text-gray-700">{cat.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
