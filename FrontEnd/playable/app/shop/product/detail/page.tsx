"use client";

import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/productStore";
import{useCartStore} from "@/stores/cartStore"

export default function UserProductDetailPage() {
  const addToCart = useCartStore((s) => s.addToCart);
  const router = useRouter();
  const product = useProductStore((s) => s.selectedProduct);

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">
          Ürün seçilmedi veya sayfa yenilendi.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow mt-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-blue-600 text-xl font-semibold mb-3">₺ {product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={() => addToCart(product)}
      >
        Sepete Ekle
      </button>
    </div>
  );
}
