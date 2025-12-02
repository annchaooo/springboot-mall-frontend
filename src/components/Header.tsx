// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__left" onClick={() => navigate("/products")}>
        <div className="header__logo">ShopMall</div>
      </div>

      <nav className="header__nav">
        <Link to="/products" className="header__link">
          商品
        </Link>
        {userId && (
          <Link to={`/users/${userId}/orders`} className="header__link">
            訂單
          </Link>
        )}
      </nav>

      <div className="header__right">
        {userEmail ? (
          <>
            <span className="header__user">{userEmail}</span>
            <button className="header__btn-outline" onClick={handleLogout}>
              登出
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header__link">
              登入
            </Link>
            <Link to="/register" className="header__btn-primary">
              註冊
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
