import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { MOCK_PRODUCTS, REVIEWS } from "../constants/data";
import "./ProductDetailPage.css";

function Stars({ rating, size = "1rem" }) {
  return (
    <div className="stars" style={{ fontSize: size }}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#F5A623" : "#D8C3A5" }}>★</span>
      ))}
    </div>
  );
}

function ProductDetailPage() {
  const { id }                    = useParams();
  const [product, setProduct]     = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty]             = useState(1);
  const [tab, setTab]             = useState("description");
  const [added, setAdded]         = useState(false);
  const [wished, setWished]       = useState(false);
  const [toast, setToast]         = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = MOCK_PRODUCTS.find((p) => p.productId === Number(id));
    setProduct(found || MOCK_PRODUCTS[0]);
  }, [id]);

  if (!product) return <div className="pdp__loading">Loading…</div>;

  // Mock multiple images for gallery
  const images = [
    product.image,
    `https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1609527583682-11e0ebe3c39d?w=600&h=600&fit=crop`,
    `https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop`,
  ];

  const similar = MOCK_PRODUCTS.filter((p) => p.productId !== product.productId && p.category === product.category).slice(0, 4);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const handleAddCart = () => {
    setAdded(true);
    showToast(`${product.productName} added to cart 🛒`);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="pdp">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="pdp__breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/products">Products</Link>
          <span>›</span>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span className="pdp__breadcrumb-current">{product.productName}</span>
        </nav>

        {/* Main layout */}
        <div className="pdp__grid">

          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__gallery-main">
              <img
                src={images[activeImg]}
                alt={product.productName}
                className="pdp__gallery-img"
              />
              {product.tag && <span className={`pcard__tag pcard__tag--${product.tag.toLowerCase().replace(" ","")}`}>{product.tag}</span>}
            </div>
            <div className="pdp__gallery-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pdp__thumb${activeImg === i ? " pdp__thumb--active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`View ${i+1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="pdp__info">
            <span className="pdp__category">{product.category}</span>
            <h1 className="pdp__title">{product.productName}</h1>

            <div className="pdp__meta">
              <Stars rating={product.rating} size="1rem" />
              <span className="pdp__review-count">{product.reviews} reviews</span>
              <span className="pdp__dot">•</span>
              <span className="pdp__seller-link">by <Link to={`/products?seller=${product.seller}`}>{product.seller}</Link></span>
            </div>

            <div className="pdp__price-row">
              <span className="pdp__price">₹{product.productPrice?.toLocaleString("en-IN")}</span>
              <span className="pdp__price-sub">Inclusive of all taxes</span>
            </div>

            {/* Qty + Cart */}
            <div className="pdp__actions">
              <div className="pdp__qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="pdp__qty-btn">−</button>
                <span className="pdp__qty-val">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="pdp__qty-btn">+</button>
              </div>
              <button
                className={`btn-primary pdp__cart-btn${added ? " pdp__cart-btn--added" : ""}`}
                onClick={handleAddCart}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
              <button
                className={`pdp__wish-btn${wished ? " pdp__wish-btn--active" : ""}`}
                onClick={() => { setWished(!wished); showToast(wished ? "Removed from wishlist" : "Added to wishlist ♥"); }}
                aria-label="Wishlist"
              >
                {wished ? "♥" : "♡"}
              </button>
            </div>

            {/* Delivery info */}
            <div className="pdp__delivery">
              {[
                { icon: "🚚", label: "Free delivery on orders above ₹2,000"   },
                { icon: "✦",  label: "100% Handmade & Authentic"               },
                { icon: "↩️", label: "Easy 7-day returns"                      },
              ].map((d) => (
                <div key={d.label} className="pdp__delivery-item">
                  <span>{d.icon}</span>
                  <span>{d.label}</span>
                </div>
              ))}
              <div className="pdp__delivery-item pdp__delivery-track">
                <span>📦</span>
                <Link to="/track" className="pdp__track-link">Track your existing orders →</Link>
              </div>
            </div>

            {/* Artisan story */}
            <div className="pdp__artisan-box">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face"
                alt={product.seller}
                className="pdp__artisan-avatar"
              />
              <div>
                <span className="pdp__artisan-label">Crafted by</span>
                <p className="pdp__artisan-name">{product.seller}</p>
                <p className="pdp__artisan-story">
                  A passionate artisan from Rajasthan with 8+ years of experience in traditional craft techniques, blending heritage with contemporary design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pdp__tabs">
          <div className="pdp__tab-nav">
            {["description","reviews","shipping"].map((t) => (
              <button
                key={t}
                className={`pdp__tab-btn${tab === t ? " pdp__tab-btn--active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === "reviews" && <span className="pdp__tab-badge">{REVIEWS.length}</span>}
              </button>
            ))}
          </div>

          <div className="pdp__tab-body">
            {tab === "description" && (
              <div className="pdp__tab-desc fade-in">
                <p>{product.productDescription}</p>
                <ul className="pdp__features">
                  {["Materials: Natural clay / Silver 925 / Organic cotton","Dimensions: 15×12 cm approx.","Care: Wipe clean with damp cloth","Handmade: Each piece is unique, slight variations are natural"].map((f) => (
                    <li key={f}>✦ {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "reviews" && (
              <div className="pdp__reviews fade-in">
                <div className="pdp__review-summary">
                  <span className="pdp__review-score">{product.rating}</span>
                  <div>
                    <Stars rating={product.rating} size="1.1rem" />
                    <span className="pdp__review-total">{product.reviews} customer reviews</span>
                  </div>
                </div>
                <div className="pdp__review-list">
                  {REVIEWS.map((r) => (
                    <div key={r.id} className="pdp__review-item">
                      <div className="pdp__review-avatar">{r.avatar}</div>
                      <div className="pdp__review-content">
                        <div className="pdp__review-header">
                          <span className="pdp__review-user">{r.user}</span>
                          <Stars rating={r.rating} size="0.85rem" />
                          <span className="pdp__review-date">{r.date}</span>
                        </div>
                        <p className="pdp__review-text">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "shipping" && (
              <div className="pdp__tab-desc fade-in">
                <ul className="pdp__features">
                  <li>✦ Ships within 2–3 business days</li>
                  <li>✦ Standard delivery: 5–7 days across India</li>
                  <li>✦ Express delivery available at checkout</li>
                  <li>✦ Free shipping on orders above ₹2,000</li>
                  <li>✦ All items are carefully packed by the artisan</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="pdp__similar">
            <h2 className="section-title">You May Also Like</h2>
            <p className="section-sub">More from {product.category}</p>
            <div className="pdp__similar-grid">
              {similar.map((p) => (
                <ProductCard key={p.productId} product={p} onAddToCart={handleAddCart} />
              ))}
            </div>
          </section>
        )}
      </div>

      {toast && (
        <div className="toast-wrap">
          <div className="toast success">{toast}</div>
        </div>
      )}
    </main>
  );
}

export default ProductDetailPage;
