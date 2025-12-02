// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  return (
    <header className="navbar">
      <div className="navbar__left" onClick={() => navigate("/products")}>
        <div className="navbar__logo">ShopMall</div>
      </div>

      <nav className="navbar__center">
        <Link to="/products" className="navbar__link">
          商品
        </Link>
        <Link to="/orders" className="navbar__link">
          訂單
        </Link>
        {/* 之後如果有活動、熱門分類可以加在這裡 */}
      </nav>

      <div className="navbar__right">
        {/* 搜尋欄（只做 UI，不一定要真的搜尋） */}
        <div className="navbar__search">
          <input placeholder="搜尋商品…" />
        </div>

        {/* 之後可以顯示購物車 icon */}
        {/* <button className="navbar__icon-btn">🛒</button> */}

        <div className="navbar__user">
          {userEmail ? (
            <span className="navbar__user-email">{userEmail}</span>
          ) : (
            <>
              <Link to="/login" className="navbar__link">
                登入
              </Link>
              <Link to="/register" className="navbar__link navbar__link--primary">
                註冊
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
