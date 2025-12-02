// src/api/orders.ts
import apiClient from "./client";
import type { Order, PageResult } from "./types";

// 查詢訂單列表用的參數
export interface OrderQueryParams {
  limit?: number;
  offset?: number;
}

// GET /users/{userId}/orders
export async function fetchOrdersForUser(
  userId: number,
  params: OrderQueryParams
): Promise<PageResult<Order>> {
  const res = await apiClient.get<PageResult<Order>>(
    `/users/${userId}/orders`,
    { params }
  );
  return res.data;
}
