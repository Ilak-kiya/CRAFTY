import { Link } from "react-router-dom";
import { useState } from "react";
import "./Footer.css";

function Footer() {
  const [email,  setEmail]  = useState("");
  const [subbed, setSubbed] = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubbed(true); setEmail(""); }
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span style={{ color: "var(--terra)" }}>✦</span> Crafty
          </Link>
          <p className="footer__tagline">
            Connecting artisans with people who value the beauty of handmade.
          </p>
          <p className="footer__tagline-sub">
            Handmade with love. Delivered with care.
          </p>
        </div>

        {/* Shop */}
        <div className="footer__col">
          <h4 className="footer__col-title">Shop</h4>
          <ul className="footer__links">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Home%20Decor">Home Decor</Link></li>
            <li><Link to="/products?category=Jewelry">Jewelry</Link></li>
            <li><Link to="/products?category=Pottery">Pottery</Link></li>
            <li><Link to="/products?category=Paintings">Paintings</Link></li>
            <li><Link to="/products?category=Gifts">Gifts</Link></li>
          </ul>
        </div>

        {/* Sell */}
        <div className="footer__col">
          <h4 className="footer__col-title">Sell</h4>
          <ul className="footer__links">
            <li><Link to="/seller/signup">Become an Artisan</Link></li>
            <li><Link to="/seller/dashboard">Seller Dashboard</Link></li>
            <li><Link to="/seller/login">Seller Login</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4 className="footer__col-title">Support</h4>
          <ul className="footer__links">
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/login">Customer Login</Link></li>
            <li><Link to="/signup">Customer Sign Up</Link></li>
          </ul>
        </div>

        {/* Privacy */}
        <div className="footer__col">
          <h4 className="footer__col-title">Privacy</h4>
          <ul className="footer__links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h4 className="footer__col-title">Artisan Letters</h4>
          <p className="footer__nl-sub">
            Stories, new collections, and exclusive deals in your inbox.
          </p>
          {subbed ? (
            <p className="footer__nl-success">✓ You're on the list!</p>
          ) : (
            <form className="footer__nl-form" onSubmit={handleSub}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer__nl-input"
              />
              <button type="submit" className="footer__nl-btn">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© 2025 Crafty Marketplace. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
