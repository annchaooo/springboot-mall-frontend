// src/App.tsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import  OrdersPage from "./pages/OrdersPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import  MainLayout  from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/users/:userId/orders" element={<OrdersPage />} />

        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
