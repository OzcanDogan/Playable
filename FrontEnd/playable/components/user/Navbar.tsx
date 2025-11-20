"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Playable Shop
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-6">
        
        {/* Cart Button */}
        <button
          onClick={() => router.push("/shop/cart")}
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />

          {cartCount >= 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
