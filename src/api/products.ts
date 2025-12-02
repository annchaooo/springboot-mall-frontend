// src/api/products.ts
import apiClient from "./client";
import type {
  Product,
  ProductCategory,
  PageResult,
  ProductQueryParams,
} from "./types";

// 取得商品列表（分頁）
// 取得商品列表：回傳 Product[]
export async function fetchProducts(
  params: ProductQueryParams
): Promise<Product[]> {
  const res = await apiClient.get<Product[]>("/products", { params });
  return res.data;
}

// 取得單一商品
export async function fetchProductById(productId: number): Promise<Product> {
  const res = await apiClient.get<Product>(`/products/${productId}`);
  return res.data;
}
