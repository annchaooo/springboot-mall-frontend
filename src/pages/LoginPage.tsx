// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import type { UserLoginRequest, User } from "../api/types";
import "./LoginPage.css"; // ⭐ 新增這行，載入 CSS

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (field: keyof UserLoginRequest, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!form.email || !form.password) {
      setError("請輸入 Email 與密碼");
      return;
    }

    try {
      setLoading(true);
      const user: User = await loginUser(form);

      // ✅ 保留你原本的登入狀態紀錄
      localStorage.setItem("userId", String(user.userId));
      localStorage.setItem("userEmail", user.email);

      setSuccessMsg(`登入成功，歡迎 ${user.email}`);

      // ✅ 這一行你照「原來的目標路徑」寫就好
      // 如果原本是 /products，就保持 /products
      // 如果原本是 /users/${user.userId}，也可以維持那樣
      setTimeout(() => {
        navigate("/products"); // 或改回你原本那個路徑
      }, 800);
    } catch (err) {
      console.error(err);
      setError("登入失敗，請確認帳號密碼");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">會員登入</h1>
          <p className="auth-card__subtitle">
            歡迎回來，請輸入您的帳號與密碼登入購物商城。
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-field__label">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="auth-field__input"
              placeholder="example@mail.com"
            />
          </div>

          <div className="auth-field">
            <label className="auth-field__label">密碼</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="auth-field__input"
              placeholder="請輸入密碼"
            />
          </div>

          {error && (
            <div className="auth-message auth-message--error">{error}</div>
          )}
          {successMsg && (
            <div className="auth-message auth-message--success">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary auth-form__submit"
          >
            {loading ? "登入中…" : "登入"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
