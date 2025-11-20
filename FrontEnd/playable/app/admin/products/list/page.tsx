"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { useProductStore } from "@/stores/productStore";

export default function ProductListPage() {
  const router = useRouter();
  const { setSelectedProduct } = useProductStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data.products || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="bg-white p-6 rounded shadow ">
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
              <tr
                key={pro._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(pro); // Zustand store’a yaz
                  router.push(`/admin/products/detail`);
                }}
              >
                <td className="py-2 text-gray-600">{pro._id}</td>
                <td className="py-2 font-semibold">{pro.name}</td>
                <td className="py-2 text-gray-700">{pro.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
