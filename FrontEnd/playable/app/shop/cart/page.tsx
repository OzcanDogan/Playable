"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { createOrder } from "@/lib/api";

export default function CartPage() {
  const router = useRouter();

  const {
    items,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    total,
  } = useCartStore();

 const user = useAuthStore((s) => s.user)

  // Hata / başarı mesajı için
  const [message, setMessage] = useState<string | null>(null);

  // Yükleniyor kontrolü
  const [loading, setLoading] = useState(false);

  // 🟢 Siparişi Tamamla Fonksiyonu
  async function handleBuy() {
  if (!user) {
    setMessage("Satın almak için giriş yapmalısınız.");
    return;
  }

  const orderPayload = {
    userId: user._id,
    items: items.map(i => ({
      productId: i.product._id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }))
  };
  console.log("ORDER PAYLOAD:", orderPayload); // 🔥 BURASI
  const res = await createOrder(orderPayload);

  if (res.order) {
    setMessage("Sipariş başarıyla tamamlandı!");
    clearCart();
    router.push("/profile/orders");
  } else {
    setMessage(res.message || "Sipariş oluşturulamadı");
  }
}

  // 🟢 Sepet doluysa
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Sepet</h1>

      <div className="space-y-6">
        {items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* Sol */}
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg">
                ₺ {product.price.toLocaleString("tr-TR")}
              </p>
            </div>

            {/* Sağ */}
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

      {/* Butonlar */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={clearCart}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
        >
          Sepeti Temizle
        </button>

        <button
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
          onClick={handleBuy}
          disabled={loading}
        >
          {loading ? "İşleniyor..." : "Satın Al"}
        </button>
      </div>

      {/* Mesaj */}
      {message && (
        <p className="mt-4 text-center font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}
