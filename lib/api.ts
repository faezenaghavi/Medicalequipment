/**
 * MedEquip API client
 * All requests go through this wrapper; swap baseURL to point at real Django backend.
 */

import { Product, QuoteRequest } from "@/types";
import { PRODUCTS } from "@/data/products";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api";
const TIMEOUT  = 10_000;

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(typeof window !== "undefined" && localStorage.getItem("token")
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
          : {}),
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
  } finally {
    clearTimeout(id);
  }
}

/* ── Products (mock — replace with real API calls) ── */
export const productsApi = {
  list: (params?: { category?: string; search?: string }) => {
    let data = [...PRODUCTS];
    if (params?.category && params.category !== "all")
      data = data.filter((p) => p.category === params.category);
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return Promise.resolve({ count: data.length, results: data });
  },
  get: (id: number): Promise<Product | undefined> =>
    Promise.resolve(PRODUCTS.find((p) => p.id === id)),
};

/* ── Quotes ── */
export const quotesApi = {
  submit: (data: QuoteRequest) =>
    /* real endpoint: POST /api/quotes/ with multipart/form-data */
    new Promise<{ id: string; message: string }>((resolve) => {
      setTimeout(() => resolve({ id: `QR-${Date.now()}`, message: "Quote request received." }), 900);
    }),
};

/* ── Auth ── */
export const authApi = {
  login: (email: string, password: string) =>
    request<{ access: string; refresh: string }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  refresh: (refresh: string) =>
    request<{ access: string }>("/auth/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
    }),
};

export { BASE_URL };