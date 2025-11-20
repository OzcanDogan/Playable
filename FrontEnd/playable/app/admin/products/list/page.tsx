import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import Link from "next/link";
export default async function CategoryListPage() {
  const data = await getProducts();

  const products = data.products || [];
  console.log(products)
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
  {products.map((pro: Product) => (
    <tr key={pro._id} className="border-b hover:bg-gray-100 cursor-pointer">
      <td className="py-2 text-gray-600">
        <Link href={`/admin/products/${pro._id}`}>{pro._id}</Link>
      </td>
      <td className="py-2 font-semibold">
        <Link href={`/admin/products/${pro._id}`}>{pro.name}</Link>
      </td>
      <td className="py-2 text-gray-700">
        <Link href={`/admin/products/${pro._id}`}>{pro.description}</Link>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
