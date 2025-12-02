// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";
import type { UserRegisterRequest } from "../api/types";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<UserRegisterRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (field: keyof UserRegisterRequest, value: string) => {
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
      const user = await registerUser(form);

      setSuccessMsg(`註冊成功！您的 userId 為 ${user.userId}`);
      // 短暫顯示成功訊息後導到登入頁
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("註冊失敗，請確認輸入資料或稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "32px auto" }}>
      <h1 style={{ marginBottom: 16 }}>會員註冊</h1>

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
          {loading ? "註冊中…" : "註冊"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
