import { Link } from "react-router-dom";
import "./Hero.css";

const FEATURES = [
  { icon: "🤝", label: "100% Handmade" },
  { icon: "🌿", label: "Eco Friendly"  },
  { icon: "✦",  label: "Artisan Direct"},
  { icon: "📦", label: "Free Shipping ₹2k+" },
];

function Hero() {
  return (
    <section className="hero">
      {/* Main Banner */}
      <div className="hero__banner">
        <div className="hero__banner-bg" />
        <div className="hero__banner-overlay" />
        <div className="container hero__content fade-up">
          <span className="hero__eyebrow">✦ Handcrafted with love</span>
          <h1 className="hero__title">
            Discover Artisan<br />
            <span className="hero__title-accent">Treasures</span>
          </h1>
          <p className="hero__subtitle">
            Every piece tells a story. Shop unique handmade goods crafted by<br />
            independent artisans across India.
          </p>
          <div className="hero__cta">
            <Link to="/products" className="btn-primary hero__btn-main">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/#artisans" className="btn-outline hero__btn-sec">
              Meet Artisans
            </Link>
          </div>
          {/* Trust badges */}
          <div className="hero__features">
            {FEATURES.map((f) => (
              <div key={f.label} className="hero__feature">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating product cards */}
        <div className="hero__float-cards">
          <div className="hero__float-card hero__float-card--1 fade-up">
            <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop" alt="Pottery" />
            <div className="hero__float-info">
              <span className="hero__float-name">Terracotta Vase</span>
              <span className="hero__float-price">₹1,850</span>
            </div>
          </div>
          <div className="hero__float-card hero__float-card--2 fade-up">
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop" alt="Painting" />
            <div className="hero__float-info">
              <span className="hero__float-name">Botanical Print</span>
              <span className="hero__float-price">₹1,680</span>
            </div>
          </div>
          <div className="hero__float-card hero__float-card--3 fade-up">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop" alt="Jewelry" />
            <div className="hero__float-info">
              <span className="hero__float-name">Silver Leaf Ring</span>
              <span className="hero__float-price">₹1,200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero__stats">
        <div className="container hero__stats-inner">
          {[
            { val: "12,000+", label: "Handmade Products" },
            { val: "800+",    label: "Verified Artisans"  },
            { val: "4.9★",    label: "Average Rating"     },
            { val: "50,000+", label: "Happy Customers"    },
          ].map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-val">{s.val}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
