"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/shop")}
      >
        Playable Shop
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Admin Panel Button (admin ise görünsün) */}
        {isAuthenticated && user?.role === "admin" && (
          <button
            onClick={() => router.push("/admin")}
            className="text-sm font-medium hover:text-blue-600"
          >
            Admin Panel
          </button>
        )}

        {/* Cart Button */}
        <button
          onClick={() => router.push("/shop/cart")}
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Profile (Sadece giriş yaptıysa) */}
        {isAuthenticated ? (
          <button
            onClick={() => router.push("shop/profile")}
            className="relative"
          >
            <User className="w-6 h-6 hover:text-blue-600 transition" />
          </button>
        ) : (
          <>
            {/* Giriş Yap */}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-sm font-medium hover:text-blue-600"
            >
              Giriş Yap
            </button>

            {/* Kayıt Ol */}
            <button
              onClick={() => router.push("/auth/register")}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Kayıt Ol
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
