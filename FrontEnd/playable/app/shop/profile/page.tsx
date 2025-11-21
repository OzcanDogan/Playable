"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Login değilse yönlendir
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-10 shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Profilim</h1>

      <div className="space-y-4">
        <div>
          <span className="font-semibold">Ad:</span> {user.name}
        </div>

        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        <div>
          <span className="font-semibold">Rol:</span>{" "}
          <span className="uppercase">{user.role}</span>
        </div>
      </div>

      {/* İşlemler */}
      <div className="mt-8 space-y-3">
        {/* Siparişler */}
        <button
          onClick={() => router.push("/shop/profile/order")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Siparişlerim
        </button>

        {/* Çıkış */}
        <button
          onClick={() => {
            logout();
            router.push("/auth/login");
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
