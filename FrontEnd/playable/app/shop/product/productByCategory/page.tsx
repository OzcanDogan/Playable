"use client";


import { useProductByCategoryStore } from "@/stores/productByCategoryStore";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProductsByCategory } from "@/lib/api";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "next/navigation";

export default function GetProductByCategory() {
  const router= useRouter();
  const [data, setData] = useState<Product[]>([]);
    const setSelectedProduct = useProductStore((s) => s.setSelectedProduct);

  const selectedCategoryId = useProductByCategoryStore(
    (s) => s.selectedCategory?._id
  );
  
  function handleClickInspect(product: Product) {
  setSelectedProduct(product);
  router.push("/shop/product/detail");
}
  
  useEffect(() => {
    const load = async () => {
      if (!selectedCategoryId) return;

      try {
        const res = await getProductsByCategory(selectedCategoryId);

        console.log("CATEGORY PRODUCT RESPONSE:", res);

        // 3 olası backend response'u kontrol
        const products =
          res?.products ||
          res?.data ||
          (Array.isArray(res) ? res : []) ||
          [];

        setData(products);
      } catch (err) {
        console.error("Kategoriye göre ürün alınamadı:", err);
      }
    };

    load();
  }, [selectedCategoryId]); // KESİNLİKLE BURADA OLMALI !!!

  return (
   <div>
  {data.length === 0 ? (
    <p className="text-gray-500 text-center py-10 text-lg">
      Bu kategoride ürün yok.
    </p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
      {data.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition shadow-gray-200 p-4 cursor-pointer transform hover:-translate-y-1"
        >
          {/* IMAGE PLACEHOLDER */}
          <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image</span>
          </div>

          {/* NAME */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>

          {/* PRICE */}
          <p className="text-blue-600 font-bold text-lg mt-1">
            ₺ {product.price.toLocaleString("tr-TR")}
          </p>

          {/* STOCK */}
          <p className="text-gray-500 text-sm mt-1">
            Son <span className="font-semibold text-gray-700">{product.stock}</span> adet
          </p>

          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            onClick={() => handleClickInspect(product) }>
            İncele
          </button>
        </div>
      ))}
    </div>
  )}
</div>

  );
}