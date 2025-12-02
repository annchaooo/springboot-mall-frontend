// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import type { Product } from "../api/types";

function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(Number(productId));
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("載入商品失敗，可能是商品不存在");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!product) return <div>找不到此商品</div>;

  return (
    <div>
      <Link to="/products">← 回商品列表</Link>

      <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.productName}
            style={{ width: 300, height: 300, objectFit: "cover" }}
          />
        )}

        <div>
          <h1>{product.productName}</h1>
          <p>分類：{product.category}</p>
          <p>價格：NT$ {product.price}</p>
          <p>庫存：{product.stock}</p>
          <p style={{ marginTop: 16 }}>{product.description}</p>

          <p style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
            建立時間：{new Date(product.createdDate).toLocaleString()}
            <br />
            最後更新：{new Date(product.lastModifiedDate).toLocaleString()}
          </p>

          {/* 之後可以在這裡加「加入購物車」按鈕 */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
