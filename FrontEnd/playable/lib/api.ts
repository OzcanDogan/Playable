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
// GET NEWEST PRODUCTS
export async function getNewestProducts() {
  const res = await fetch(`${API_URL}/products/get-newest-products`, {
    cache: "no-store",
  });
  return res.json();
}


// GET PRODUCT BY Category
export async function getProductsByCategory(id: string) {
  const res = await fetch(`${API_URL}/products/get-products-by-category/${id}`);
  return res.json();
}

// REGISTER
export async function register(payload: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Kayıt başarısız");
  }

  return res.json();
}

// LOGIN
export async function login(payload: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Login failed");
  }

  return res.json(); 
}
export async function createOrder(body: unknown) {
  const res = await fetch(`${API_URL}/orders/create-order`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
export async function getUserOrders(userId: string) {
  const res = await fetch(`${API_URL}/orders/get-user-orders/${userId}`, {
    cache: "no-store",
  });
  return res.json();
}