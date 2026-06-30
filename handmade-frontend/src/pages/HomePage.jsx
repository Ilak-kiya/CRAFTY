import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import CategorySection from "../components/CategorySection/CategorySection";
import ProductCard from "../components/ProductCard/ProductCard";
import { MOCK_PRODUCTS, ARTISANS } from "../constants/data";
import { getProducts } from "../api/productApi";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts]   = useState(MOCK_PRODUCTS);
  const [cart,     setCart]       = useState([]);
  const [wishlist, setWishlist]   = useState([]);
  const [toast,    setToast]      = useState(null);

  // Swap mock data for real API when backend is running
  useEffect(() => {
    getProducts()
      .then((res) => { if (res.data?.length) setProducts(res.data); })
      .catch(() => { /* silently use mock data */ });
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  };

  const handleCart = (p) => {
    setCart((prev) => [...prev, p]);
    showToast(`${p.productName} added to cart 🛒`);
  };
  const handleWishlist = (p) => {
    setWishlist((prev) =>
      prev.find((x) => x.productId === p.productId)
        ? prev.filter((x) => x.productId !== p.productId)
        : [...prev, p]
    );
    showToast("Wishlist updated ♥");
  };

  const featured   = products.slice(0, 4);
  const newArrivals = [...products].reverse().slice(0, 4);

  return (
    <main className="homepage">
      <Hero />
      <CategorySection />

      {/* Featured Products */}
      <section className="hp-section">
        <div className="container">
          <div className="hp-section__header">
            <div>
              <h2 className="section-title">Featured Picks</h2>
              <p className="section-sub">Handpicked gems loved by our community</p>
            </div>
            <Link to="/products" className="btn-outline">View All</Link>
          </div>
          <div className="hp-products__grid">
            {featured.map((p) => (
              <ProductCard
                key={p.productId}
                product={p}
                onAddToCart={handleCart}
                onWishlist={handleWishlist}
                wished={wishlist.some((w) => w.productId === p.productId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="hp-banner">
        <div className="container hp-banner__inner">
          <div className="hp-banner__text">
            <span className="hp-banner__eyebrow">For Artisans</span>
            <h2 className="hp-banner__title">Share Your Craft<br/>with the World</h2>
            <p className="hp-banner__sub">Join 800+ artisans already selling on Crafty. No setup fees, just passion.</p>
            <Link to="/seller/register" className="btn-primary">Start Selling Free</Link>
          </div>
          <div className="hp-banner__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1609527583682-11e0ebe3c39d?w=600&h=400&fit=crop"
              alt="Artisan at work"
              className="hp-banner__img"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="hp-section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="hp-section__header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-sub">Fresh from the artisan's workshop</p>
            </div>
            <Link to="/products?sort=newest" className="btn-outline">See More</Link>
          </div>
          <div className="hp-products__grid">
            {newArrivals.map((p) => (
              <ProductCard
                key={p.productId}
                product={p}
                onAddToCart={handleCart}
                onWishlist={handleWishlist}
                wished={wishlist.some((w) => w.productId === p.productId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Track Order Strip */}
      <section className="hp-track-strip">
        <div className="container hp-track-strip__inner">
          <div className="hp-track-strip__left">
            <span className="hp-track-strip__icon">📦</span>
            <div>
              <h3 className="hp-track-strip__title">Track Your Order</h3>
              <p className="hp-track-strip__sub">Real-time updates from artisan's workshop to your doorstep</p>
            </div>
          </div>
          <Link to="/track" className="btn-primary hp-track-strip__btn">
            Track Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="hp-artisans" id="artisans">
        <div className="container">
          <h2 className="section-title">Meet the Artisans</h2>
          <p className="section-sub">Real people, real craft, real stories</p>
          <div className="hp-artisans__grid">
            {ARTISANS.map((a) => (
              <div key={a.id} className="artisan-card fade-up">
                <img src={a.avatar} alt={a.name} className="artisan-card__avatar" />
                <div className="artisan-card__info">
                  <h3 className="artisan-card__name">{a.name}</h3>
                  <p className="artisan-card__craft">{a.craft}</p>
                  <div className="artisan-card__meta">
                    <span>📍 {a.location}</span>
                    <span>🛒 {a.sales} sales</span>
                  </div>
                </div>
                <Link
                  to={`/products?seller=${encodeURIComponent(a.name)}`}
                  className="artisan-card__btn btn-outline"
                >
                  View Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="toast-wrap">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
