// src/pages/OrdersPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrdersForUser } from "../api/orders";
import type { Order } from "../api/types";

const PAGE_SIZE = 5;

export function OrdersPage() {
  const navigate = useNavigate();
  const { userId: userIdParam } = useParams<{ userId: string }>();

  const storedUserId = localStorage.getItem("userId");
  const userId =
    userIdParam !== undefined
      ? Number(userIdParam)
      : storedUserId
      ? Number(storedUserId)
      : undefined;

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // 如果沒有 userId，請他去登入
  if (!userId) {
    return (
      <div style={{ padding: 24 }}>
        <h1>訂單列表</h1>
        <p>目前尚未登入，請先登入帳號。</p>
        <button onClick={() => navigate("/login")}>前往登入</button>
      </div>
    );
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * PAGE_SIZE;

        const data = await fetchOrdersForUser(userId, {
          limit: PAGE_SIZE,
          offset,
        });

        setOrders(data.results);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
        setError("載入訂單失敗，請確認後端是否有啟動");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId, page]);

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>我的訂單</h1>

      <div style={{ marginBottom: 16, fontSize: 14, color: "#666" }}>
        目前登入帳號：{localStorage.getItem("userEmail") ?? `User #${userId}`}
      </div>

      {!loading && !error && (
        <div style={{ marginBottom: 16 }}>
          <span>
            共 {total} 筆訂單，第 {page} / {totalPages} 頁
          </span>
          <div style={{ display: "inline-block", marginLeft: 12 }}>
            <button
              onClick={handlePrevPage}
              disabled={page <= 1}
              style={{ marginRight: 8 }}
            >
              上一頁
            </button>
            <button onClick={handleNextPage} disabled={page >= totalPages}>
              下一頁
            </button>
          </div>
        </div>
      )}

      {loading && <div>訂單載入中...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && !error && (
        <>
          {orders.length === 0 ? (
            <div>目前沒有訂單紀錄。</div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>訂單編號</th>
                  <th style={thStyle}>總金額</th>
                  <th style={thStyle}>建立時間</th>
                  <th style={thStyle}>明細</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td style={tdStyle}>{order.orderId}</td>
                    <td style={tdStyle}>NT$ {order.totalAmount}</td>
                    <td style={tdStyle}>
                      {new Date(order.createdDate).toLocaleString()}
                    </td>
                    <td style={tdStyle}>
                      {order.orderItemList && order.orderItemList.length > 0 ? (
                        <ul style={{ paddingLeft: 16, margin: 0 }}>
                          {order.orderItemList.map((item) => (
                            <li key={item.orderItemId}>
                              {item.productName} x {item.quantity}（小計 NT${" "}
                              {item.amount}）
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>無明細</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
  padding: "8px 6px",
  textAlign: "left",
  backgroundColor: "#fafafa",
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px 6px",
};

export default OrdersPage;
