import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product, ProductCategory } from "../api/types";

const CATEGORY_OPTIONS: { label: string; value?: ProductCategory }[] = [
  { label: "全部商品", value: undefined },
  { label: "食品", value: "FOOD" },
  { label: "汽車", value: "CAR" },
  { label: "書籍", value: "BOOK" },
  { label: "電子書", value: "E_BOOK" },
  { label: "服飾", value: "CLOTHES" },
  { label: "電子產品", value: "ELECTRONICS" },
  { label: "居家用品", value: "HOME" },
  { label: "美妝保養", value: "BEAUTY" },
  { label: "運動用品", value: "SPORTS" },
  { label: "其他", value: "OTHER" },
];

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: any = await fetchProducts({
          search: search || undefined,
          category,
        });

        // 後端如果直接回傳陣列 [ {..}, {..} ]
        if (Array.isArray(data)) {
          setProducts(data as Product[]);
          return;
        }

        // 如果未來後端改成 { results: [...] }，也能支援
        if (data && Array.isArray(data.results)) {
          setProducts(data.results as Product[]);
          return;
        }

        setProducts([]);
      } catch (err) {
        console.error("❌ [ProductListPage] load error =", err);
        setError("載入商品失敗，請確認後端是否有啟動 (http://localhost:8080)");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, category]);

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>商品列表</h1>

      {/* 篩選區 */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="輸入關鍵字搜尋商品名稱"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260, padding: "6px 8px" }}
        />

        <select
          value={category ?? ""}
          onChange={(e) =>
            setCategory(
              e.target.value ? (e.target.value as ProductCategory) : undefined
            )
          }
          style={{ padding: "6px 8px" }}
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.label} value={c.value ?? ""}>
              {c.label}
            </option>
          ))}
        </select>

        {!loading && !error && (
          <span style={{ fontSize: 14, color: "#666" }}>
            共 {products.length} 項商品
          </span>
        )}
      </div>

      {/* 狀態顯示 */}
      {loading && <div>商品載入中...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* 商品表格 */}
      {!loading && !error && (
        <div>
          <h3 style={{ marginBottom: 8 }}>商品清單（表格版）</h3>

          {products.length === 0 ? (
            <div>目前沒有商品資料。</div>
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
                  <th style={thStyle}>名稱</th>
                  <th style={thStyle}>分類</th>
                  <th style={thStyle}>價格</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.productId}>
                    <td style={tdStyle}>{p.productName}</td>
                    <td style={tdStyle}>{p.category}</td>
                    <td style={tdStyle}>NT$ {p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

// 簡單的表頭 / 儲存格樣式
const thStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px 6px",
  textAlign: "left" as const,
  backgroundColor: "#fafafa",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px 6px",
};

export default ProductListPage;
