import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../constants/data";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [catOpen,     setCatOpen]     = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen,    setAuthOpen]    = useState(false);
  const [query,       setQuery]       = useState("");
  const searchRef  = useRef(null);
  const profileRef = useRef(null);
  const authRef    = useRef(null);
  const navigate   = useNavigate();
  const { user, logout, isCustomer, isSeller, isLoggedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (authRef.current    && !authRef.current.contains(e.target))    setAuthOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  /* ── Avatar initials ── */
  const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0,2).toUpperCase() : "?";

  /* ── Customer logged-in nav ── */
  const CustomerMenu = () => (
    <div className="navbar__profile-dropdown" ref={profileRef}>
      <button className="navbar__avatar" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile menu">
        <span className="navbar__avatar-initials">{initials}</span>
      </button>
      {profileOpen && (
        <div className="navbar__dropdown navbar__dropdown--profile">
          <div className="navbar__dropdown-user">
            <span className="navbar__dropdown-user-name">{user.name}</span>
            <span className="navbar__dropdown-user-email">{user.email}</span>
          </div>
          <div className="navbar__dropdown-divider" />
          {[
            { to: "/profile",  icon: "👤", label: "My Profile"  },
            { to: "/orders",   icon: "📦", label: "My Orders"   },
            { to: "/wishlist", icon: "♥",  label: "Wishlist"    },
            { to: "/cart",     icon: "🛒", label: "Cart"        },
            { to: "/track",    icon: "📍", label: "Track Order" },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
              <span className="navbar__dropdown-icon">{item.icon}</span>
              <span className="navbar__dropdown-name">{item.label}</span>
            </Link>
          ))}
          <div className="navbar__dropdown-divider" />
          <button className="navbar__dropdown-item navbar__dropdown-logout" onClick={handleLogout}>
            <span className="navbar__dropdown-icon">🚪</span>
            <span className="navbar__dropdown-name">Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  /* ── Seller logged-in nav ── */
  const SellerMenu = () => (
    <div className="navbar__profile-dropdown" ref={profileRef}>
      <button className="navbar__avatar navbar__avatar--seller" onClick={() => setProfileOpen(!profileOpen)} aria-label="Seller menu">
        <span className="navbar__avatar-initials">{initials}</span>
      </button>
      {profileOpen && (
        <div className="navbar__dropdown navbar__dropdown--profile">
          <div className="navbar__dropdown-user">
            <span className="navbar__dropdown-user-name">{user.name}</span>
            <span className="navbar__dropdown-user-badge">Seller</span>
          </div>
          <div className="navbar__dropdown-divider" />
          {[
            { to: "/seller/dashboard",       icon: "📊", label: "Dashboard"       },
            { to: "/seller/add-product",     icon: "➕", label: "Add Product"     },
            { to: "/seller/products",        icon: "📦", label: "Manage Products" },
            { to: "/seller/orders",          icon: "🧾", label: "Orders"          },
            { to: "/seller/earnings",        icon: "💰", label: "Earnings"        },
            { to: "/seller/profile",         icon: "👤", label: "Profile"         },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
              <span className="navbar__dropdown-icon">{item.icon}</span>
              <span className="navbar__dropdown-name">{item.label}</span>
            </Link>
          ))}
          <div className="navbar__dropdown-divider" />
          <button className="navbar__dropdown-item navbar__dropdown-logout" onClick={handleLogout}>
            <span className="navbar__dropdown-icon">🚪</span>
            <span className="navbar__dropdown-name">Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  /* ── Guest auth dropdown ── */
  const GuestMenu = () => (
    <div className="navbar__auth-dropdown" ref={authRef}>
      <button className="navbar__avatar" onClick={() => setAuthOpen(!authOpen)} aria-label="Login or signup">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
      {authOpen && (
        <div className="navbar__dropdown navbar__dropdown--auth">
          <p className="navbar__dropdown-auth-title">Customer</p>
          <Link to="/login"          className="navbar__dropdown-item" onClick={() => setAuthOpen(false)}>
            <span className="navbar__dropdown-icon">🔑</span><span className="navbar__dropdown-name">Customer Login</span>
          </Link>
          <Link to="/signup"         className="navbar__dropdown-item" onClick={() => setAuthOpen(false)}>
            <span className="navbar__dropdown-icon">✨</span><span className="navbar__dropdown-name">Customer Sign Up</span>
          </Link>
          <div className="navbar__dropdown-divider" />
          <p className="navbar__dropdown-auth-title">Seller</p>
          <Link to="/seller/login"   className="navbar__dropdown-item" onClick={() => setAuthOpen(false)}>
            <span className="navbar__dropdown-icon">🏪</span><span className="navbar__dropdown-name">Seller Login</span>
          </Link>
          <Link to="/seller/signup"  className="navbar__dropdown-item" onClick={() => setAuthOpen(false)}>
            <span className="navbar__dropdown-icon">🌱</span><span className="navbar__dropdown-name">Seller Sign Up</span>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          <span className="navbar__logo-text">Crafty</span>
        </Link>

        {/* Center Nav */}
        <nav className="navbar__nav">
          <div
            className="navbar__nav-item navbar__nav-item--cat"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <span>Categories</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {catOpen && (
              <div className="navbar__dropdown">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.id} to={`/products?category=${encodeURIComponent(cat.name)}`} className="navbar__dropdown-item">
                    <span className="navbar__dropdown-icon">{cat.icon}</span>
                    <span className="navbar__dropdown-name">{cat.name}</span>
                    <span className="navbar__dropdown-count">{cat.count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/products" className="navbar__nav-item">All Products</Link>
          <Link to="/track"    className="navbar__nav-item">Track Order</Link>
          {isSeller && (
            <Link to="/seller/dashboard" className="navbar__nav-item navbar__nav-item--seller">Dashboard</Link>
          )}
        </nav>

        {/* Search */}
        <form className={`navbar__search${searchOpen ? " navbar__search--open" : ""}`} onSubmit={handleSearch}>
          <button type="button" className="navbar__search-toggle" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <input ref={searchRef} className="navbar__search-input" type="text" placeholder="Search handmade treasures…" value={query} onChange={(e) => setQuery(e.target.value)} />
          {searchOpen && query && <button type="button" className="navbar__search-clear" onClick={() => setQuery("")}>✕</button>}
        </form>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Wishlist & Cart — customer only */}
          {isCustomer && (
            <>
              <Link to="/wishlist" className="navbar__action-btn" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {wishlistCount > 0 && <span className="badge navbar__badge">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="navbar__action-btn" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && <span className="badge navbar__badge">{cartCount}</span>}
              </Link>
            </>
          )}

          {/* Profile / Auth menu */}
          {isLoggedIn
            ? (isSeller ? <SellerMenu /> : <CustomerMenu />)
            : <GuestMenu />
          }

          {/* Hamburger */}
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/products?category=${encodeURIComponent(cat.name)}`} className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>
              {cat.icon} {cat.name}
            </Link>
          ))}
          <div className="navbar__mobile-divider" />
          <Link to="/products" className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🛍 All Products</Link>
          <Link to="/track"    className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>📦 Track Order</Link>
          {!isLoggedIn && (
            <>
              <div className="navbar__mobile-divider" />
              <Link to="/login"         className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🔑 Customer Login</Link>
              <Link to="/signup"        className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>✨ Customer Sign Up</Link>
              <Link to="/seller/login"  className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🏪 Seller Login</Link>
              <Link to="/seller/signup" className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🌱 Seller Sign Up</Link>
            </>
          )}
          {isCustomer && (
            <>
              <div className="navbar__mobile-divider" />
              <Link to="/profile"  className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
              <Link to="/orders"   className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
              <Link to="/wishlist" className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>♥ Wishlist</Link>
              <Link to="/cart"     className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🛒 Cart</Link>
              <button className="navbar__mobile-item navbar__mobile-logout" onClick={handleLogout}>🚪 Logout</button>
            </>
          )}
          {isSeller && (
            <>
              <div className="navbar__mobile-divider" />
              <Link to="/seller/dashboard"   className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>📊 Dashboard</Link>
              <Link to="/seller/add-product" className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>➕ Add Product</Link>
              <Link to="/seller/orders"      className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>🧾 Orders</Link>
              <button className="navbar__mobile-item navbar__mobile-logout" onClick={handleLogout}>🚪 Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
