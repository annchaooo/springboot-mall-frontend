// src/pages/UserProfilePage.tsx
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // 沒有 userId 或沒登入 → 叫他去登入
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!storedUserId) {
      navigate("/login");
    }
  }, [storedUserId, navigate]);

  if (!userId) {
    return (
      <div style={{ padding: 24 }}>
        <h1>會員中心</h1>
        <p>找不到使用者編號。</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>會員中心</h1>
      <p style={{ marginBottom: 8 }}>使用者編號：{userId}</p>
      <p style={{ marginBottom: 16 }}>
        Email：{localStorage.getItem("userEmail") ?? "（未記錄 email）"}
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to={`/users/${userId}/orders`}>
          <button>查看訂單紀錄</button>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            navigate("/login");
          }}
        >
          登出
        </button>
      </div>
    </div>
  );
}
export default UserProfilePage;