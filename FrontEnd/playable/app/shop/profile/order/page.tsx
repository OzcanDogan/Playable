"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getUserOrders } from "@/lib/api";
import { Order, OrderItem } from "@/types/order";

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      const res = await getUserOrders(user._id);

      setOrders(res.orders || []);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-10">
        <p className="text-red-600 font-semibold">Siparişleri görmek için giriş yapmalısınız.</p>
      </div>
    );
  }

  if (loading) {
    return <p className="p-10 text-center">Yükleniyor...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Siparişlerim</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">Henüz bir siparişiniz yok.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Sipariş No: {order._id}</span>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <p className="font-medium">Toplam: ₺ {order.totalPrice.toLocaleString("tr-TR")}</p>
              <p className="text-sm text-gray-600 mb-3">Durum: {order.status}</p>

              <div className="ml-4">
                {order.items.map((item:OrderItem) => (
                  <div key={item._id} className="border-t py-2">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">Adet: {item.quantity}</p>
                    <p className="text-sm">Fiyat: {item.price} ₺</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
