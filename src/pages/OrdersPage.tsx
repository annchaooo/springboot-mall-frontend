// src/pages/OrdersPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrdersForUser } from "../api/orders";
import type { Order } from "../api/types";
import "./OrdersPage.css";

const PAGE_SIZE = 5;

export function OrdersPage() {
  const navigate = useNavigate();
  const { userId: userIdParam } = useParams<{ userId: string }>();

  // ✅ 保留你原本「URL 有 userId 就用 URL，沒有就用 localStorage」的邏輯
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

  // ✅ 抓訂單的 useEffect：邏輯不變，只多一個 userId 判斷
  useEffect(() => {
    if (!userId) return;

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

  // ✅ 沒登入的畫面：也幫你套上同一種卡片風格
  if (!userId) {
    return (
      <div className="orders-page">
        <div className="orders-card">
          <header className="orders-card__header">
            <div>
              <h1 className="orders-card__title">我的訂單</h1>
              <p className="orders-card__subtitle">
                請先登入帳號，即可查看訂單紀錄。
              </p>
            </div>
          </header>
          <div className="orders-card__body">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              前往登入
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ 已登入的畫面（新版排版）
  return (
    <div className="orders-page">
      <div className="orders-card">
        {/* 🔹 上方標題區 */}
        <header className="orders-card__header">
          <div>
            <h1 className="orders-card__title">我的訂單</h1>
            <p className="orders-card__subtitle">
              查看近期的購買紀錄與每筆訂單明細。
            </p>
          </div>
        </header>

        <div className="orders-card__body">
          {loading && <div>訂單載入中…</div>}

          {error && (
            <div className="orders-message orders-message--error">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="orders-empty">目前尚無訂單紀錄。</div>
          )}

          {!loading && !error && orders.length > 0 && (
            <>
              {/* 🔹 訂單列表 */}
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.orderId} className="order-card">
                    <div className="order-card__header">
                      <div>
                        <div className="order-card__id">
                          訂單編號 #{order.orderId}
                        </div>
                        <div className="order-card__date">
                          建立時間：{order.createdDate}
                        </div>
                      </div>
                      <div className="order-card__total">
                        總金額 NT$ {order.totalAmount}
                      </div>
                    </div>

                    {/* 🔹 若有訂單明細就顯示商品列表 */}
                    {order.orderItemList &&
                      order.orderItemList.length > 0 && (
                        <div className="order-card__items">
                          {order.orderItemList.map((item) => (
                            <div
                              key={`${order.orderId}-${item.productId}`}
                              className="order-item-row"
                            >
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.productName}
                                  className="order-item-row__image"
                                />
                              )}

                              <div className="order-item-row__info">
                                <div className="order-item-row__name">
                                  {item.productName}
                                </div>
                                <div className="order-item-row__meta">
                                  數量 {item.quantity} ・ 小計 NT$ {item.amount}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* 🔹 分頁區（保留你原本的 page 邏輯，只改排版） */}
              <div className="orders-pagination">
                <button
                  className="btn-secondary"
                  disabled={page === 1}
                  onClick={handlePrevPage}
                >
                  上一頁
                </button>
                <span className="orders-pagination__info">
                  第 {page} / {totalPages} 頁
                </span>
                <button
                  className="btn-secondary"
                  disabled={page === totalPages}
                  onClick={handleNextPage}
                >
                  下一頁
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;