// src/api/users.ts
import apiClient from "./client";
import type {
  User,
  UserRegisterRequest,
  UserLoginRequest,
} from "./types";

// 註冊：POST /users/register
export async function registerUser(payload: UserRegisterRequest): Promise<User> {
  const res = await apiClient.post<User>("/users/register", payload);
  return res.data;
}

// 登入：POST /users/login
export async function loginUser(payload: UserLoginRequest): Promise<User> {
  const res = await apiClient.post<User>("/users/login", payload);
  return res.data;
}