// src/App.tsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import  OrdersPage from "./pages/OrdersPage";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
        <Link to="/products" style={{ marginRight: 16 }}>
          商品列表
        </Link>
        <Link to="/cart" style={{ marginRight: 16 }}>
          購物車
        </Link>
        <Link to="/orders" style={{ marginRight: 16 }}>
          訂單
        </Link>
        <span style={{ float: "right" }}>
          <Link to="/login" style={{ marginRight: 8 }}>
            登入
          </Link>
          <Link to="/register">註冊</Link>
        </span>
      </nav>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/users/:userId" element={<UserProfilePage />} />
          <Route path="/users/:userId/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
