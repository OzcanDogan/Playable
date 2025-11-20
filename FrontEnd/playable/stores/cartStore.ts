import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;

  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ÜRÜN EKLEME
      addToCart: (product) => {
        const items = get().items;
        const exists = items.find((i) => i.product._id === product._id);

        if (exists) {
          exists.quantity++;
          set({ items: [...items] });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      // SİLME
      removeFromCart: (id) =>
        set({
          items: get().items.filter((i) => i.product._id !== id),
        }),

      // ARTTIRMA
      increase: (id) => {
        const items = get().items.map((i) =>
          i.product._id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
        set({ items });
      },

      // AZALTMA
      decrease: (id) => {
        const items = get().items
          .map((i) =>
            i.product._id === id
              ? { ...i, quantity: Math.max(1, i.quantity - 1) }
              : i
          )
          .filter((i) => i.quantity > 0);
        set({ items });
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    { name: "cart-storage" }
  )
);
