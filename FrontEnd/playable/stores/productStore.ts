import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      clearProduct: () => set({ selectedProduct: null }),
    }),
    { name: "selected-product" }
  )
);
