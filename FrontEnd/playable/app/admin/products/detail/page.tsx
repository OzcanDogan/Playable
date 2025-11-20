"use client";

import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/productStore";

export default function ProductDetailPage() {
  const router = useRouter();
  const product = useProductStore((state) => state.selectedProduct);

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">Ürün seçilmedi.</p>
        <button
          onClick={() => router.push("/admin/products")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    
 <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Product Detail</h1>

      <div className="space-y-3">
        <div>
          <span className="font-bold">ID: </span>
          {product._id}
        </div>
        <div>
          <span className="font-bold">Name: </span>
          {product.name}
        </div>
        <div>
          <span className="font-bold">Description: </span>
          {product.description}
        </div>
        <div>
          <span className="font-bold">Price: </span>
          {product.price}
        </div>
        <div>
          <span className="font-bold">Category: </span>
          {product.category}
        </div>
        <div>
          <span className="font-bold">Stock: </span>
          {product.stock}
        </div>
      </div>
    </div>
  );
}
