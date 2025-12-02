// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import type { UserLoginRequest, User } from "../api/types";

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

      // 紀錄登入狀態（之後購物車 & 訂單會用到 userId）
      localStorage.setItem("userId", String(user.userId));
      localStorage.setItem("userEmail", user.email);

      setSuccessMsg(`登入成功，歡迎 ${user.email}`);

      // ✅ 登入後導到會員中心 /users/{userId}
      setTimeout(() => {
        navigate(`/users/${user.userId}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setError("登入失敗，請確認帳號密碼");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "32px auto" }}>
      <h1 style={{ marginBottom: 16 }}>會員登入</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #eee",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <label>
          Email：
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={{ width: "100%", padding: "6px 8px", marginTop: 4 }}
          />
        </label>

        <label>
          密碼：
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            style={{ width: "100%", padding: "6px 8px", marginTop: 4 }}
          />
        </label>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {successMsg && <div style={{ color: "green" }}>{successMsg}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 8, padding: "8px 12px" }}
        >
          {loading ? "登入中…" : "登入"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
