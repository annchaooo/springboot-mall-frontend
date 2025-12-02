// src/api/types.ts

// Define the Product interface to represent product data
// 對應後端 ProductCategory enum
export type ProductCategory =
  | "FOOD"
  | "CAR"
  | "BOOK"
  | "E_BOOK"
  | "CLOTHES"
  | "ELECTRONICS"
  | "HOME"
  | "BEAUTY"
  | "SPORTS"
  | "OTHER";

export interface Product {
  productId: number;
  productName: string;
  category: ProductCategory;
  imageUrl: string;
  price: number;
  stock: number;
  description: string;
  createdDate: string;
  lastModifiedDate: string;
}

/** 後端若回傳分頁結果，推薦長這樣 */
export interface PageResult<T> {
  limit: number;
  offset: number;
  total: number;
  results: T[];
}

/** 查詢參數 */
export interface ProductQueryParams {
  search?: string;
  category?: ProductCategory;
  limit?: number;
  offset?: number;
  orderBy?: string;
  sort?: "asc" | "desc";
}


// 後端 User entity 對應的前端型別
export interface User {
  userId: number;
  email: string;
  createdDate?: string;       // 後端是 Date，前端會看到 ISO 字串
  lastModifiedDate?: string;  // 同上
  // password 在回傳時已經被 @JsonIgnore，不會出現在 JSON 裡
}

// 註冊請求（對應 UserRegisterRequest）
export interface UserRegisterRequest {
  email: string;
  password: string;
  // 你的 UserRegisterRequest 如果還有其他欄位，可以在這裡加
  // name?: string;
}

// 登入請求（對應 UserLoginRequest）
export interface UserLoginRequest {
  email: string;
  password: string;
}

// 訂單項目
export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  amount: number;
  productName: string;
  productImageUrl: string;
}

// 訂單
export interface Order {
  orderId: number;
  userId: number;
  totalAmount: number;
  createdDate: string;       // 後端 Timestamp → 前端會收到 ISO 字串
  lastModifiedDate: string;
  orderItemList: OrderItem[];
}

// 共用的分頁結果：你的 OrderController 已經回傳 Page<Order>
export interface PageResult<T> {
  limit: number;
  offset: number;
  total: number;
  results: T[];
}
