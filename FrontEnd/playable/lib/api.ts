const API_URL = "http://localhost:5000/api";
import { Category, CategoryPayload } from "@/types/category";
import { ProductPayload } from "@/types/product";

// GET ALL CATEGORIES
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories/get-all-categories`, {
    cache: "no-store",
  });

  return res.json();
}

// CREATE CATEGORY
export async function createCategory(body: CategoryPayload) {
  const res = await fetch(`${API_URL}/categories/create-category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}
// GET ALL PRODUCTS
export async function getProducts() {
  const res = await fetch(`${API_URL}/products/get-all-products`, {
    cache: "no-store",
  });
  return res.json();
}

// GET PRODUCT BY ID
export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/get-product/${id}`);
  return res.json();
}

// CREATE PRODUCT
export async function createProduct(body:ProductPayload) {
  const res = await fetch(`${API_URL}/products/create-product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}

