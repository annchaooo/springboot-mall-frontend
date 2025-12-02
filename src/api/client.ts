// src/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 如果後端有用 JWT / Cookie，可以在這邊補 withCredentials 等
  // withCredentials: true,
});

console.log("🔧 API baseURL =", import.meta.env.VITE_API_BASE_URL);

export default apiClient;