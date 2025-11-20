import { create } from "zustand";

import { Category } from "@/types/category";

interface ProductByCategoryState {
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category) => void;
  clearSelectedCategory: () => void;
}
export const useProductByCategoryStore = create<ProductByCategoryState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  clearSelectedCategory: () => set({ selectedCategory: null }),
}));