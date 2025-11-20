"use client";

import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const {
    items,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    total,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-3">Sepetiniz boş 🛒</h2>
        <p>Ürün eklemek için mağazaya dönün.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Sepet</h1>

      <div className="space-y-6">
        {items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* Sol Kısım - Ürün bilgisi */}
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg">
                ₺ {product.price.toLocaleString("tr-TR")}
              </p>
            </div>

            {/* Sağ Kısım - Miktar ve işlemler */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrease(product._id)}
                className="px-3 py-1 bg-gray-200 rounded text-lg"
              >
                -
              </button>

              <span className="text-xl font-semibold">{quantity}</span>

              <button
                onClick={() => increase(product._id)}
                className="px-3 py-1 bg-gray-200 rounded text-lg"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(product._id)}
                className="text-red-600 font-semibold"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toplam Fiyat */}
      <div className="mt-8 text-right text-2xl font-bold">
        Toplam: ₺ {total().toLocaleString("tr-TR")}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={clearCart}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
        >
          Sepeti Temizle
        </button>

        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">
          Satın Al
        </button>
      </div>
    </div>
  );
}
