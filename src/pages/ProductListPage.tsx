// src/pages/ProductListPage.tsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product, ProductCategory } from "../api/types";
import "./ProductListPage.css";

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

        if (Array.isArray(data)) {
          setProducts(data as Product[]);
          return;
        }

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
  <div className="product-page">
    <h1 className="product-page__title">商品列表</h1>

    <div className="product-page__layout">
      {/* 🧱 左側分類側邊欄 */}
      <aside className="product-page__sidebar">
        <h3 className="product-page__sidebar-title">商品分類</h3>
        <ul className="product-page__category-list">
          {CATEGORY_OPTIONS.map((c) => {
            const isActive =
              category === c.value || (!category && c.value === undefined);
            return (
              <li key={c.label}>
                <button
                  type="button"
                  className={
                    "product-page__category-btn" +
                    (isActive ? " product-page__category-btn--active" : "")
                  }
                  onClick={() => setCategory(c.value)}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>

        {!loading && !error && (
          <div className="product-page__summary">
            共 {products.length} 項商品
          </div>
        )}
      </aside>

      {/* 📦 右側商品列表 */}
      <section className="product-page__main">
        {/* 🔍 搜尋列：放在主內容上方，靠左，寬度約兩張卡片 */}
        <div className="product-page__search-row">
          <div className="product-page__search-box">
            <span className="product-page__search-icon">🔍</span>
            <input
              className="product-page__search-input"
              placeholder="輸入關鍵字搜尋商品名稱"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && <div>商品載入中...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div>目前沒有商品資料。</div>
            ) : (
              <div className="product-page__grid">
                {products.map((p) => (
                  <div key={p.productId} className="product-card">
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt={p.productName}
                        className="product-card__image"
                      />
                    )}

                    <div className="product-card__body">
                      <div className="product-card__name">
                        {p.productName}
                      </div>
                      <div className="product-card__category">
                        分類：{p.category}
                      </div>

                      <div className="product-card__footer">
                        <div className="product-card__price">
                          NT$ {p.price}
                        </div>
                        <button className="btn-primary product-card__btn">
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  </div>
);

}

export default ProductListPage;
