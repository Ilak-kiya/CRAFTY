import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import { MOCK_PRODUCTS } from "../constants/data";
import { getProducts } from "../api/productApi";
import "./ProductsPage.css";

const SORT_OPTIONS = [
  { val: "default",  label: "Featured"      },
  { val: "newest",   label: "Newest First"  },
  { val: "price-lo", label: "Price: Low → High" },
  { val: "price-hi", label: "Price: High → Low" },
  { val: "rating",   label: "Top Rated"     },
];

function SkeletonCard() {
  return (
    <div className="pp-skeleton">
      <div className="skeleton pp-skeleton__img" />
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="skeleton" style={{ height: "12px", width: "60%", borderRadius: "6px" }} />
        <div className="skeleton" style={{ height: "16px", width: "90%", borderRadius: "6px" }} />
        <div className="skeleton" style={{ height: "12px", width: "45%", borderRadius: "6px" }} />
      </div>
    </div>
  );
}

function ProductsPage() {
  const [searchParams]          = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [sort,     setSort]     = useState("default");
  const [filters,  setFilters]  = useState({ priceRange: null, categories: [], minRating: null, types: [] });
  const [cart,     setCart]     = useState([]);
  const [toast,    setToast]    = useState(null);

  const categoryParam = searchParams.get("category");
  const searchParam   = searchParams.get("search");

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => { setProducts(res.data?.length ? res.data : MOCK_PRODUCTS); })
      .catch(()   => { setProducts(MOCK_PRODUCTS); })
      .finally(()  => setLoading(false));
  }, []);

  // Initialise category filter from URL param
  useEffect(() => {
    if (categoryParam) setFilters((f) => ({ ...f, categories: [categoryParam] }));
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchParam) list = list.filter((p) =>
      p.productName?.toLowerCase().includes(searchParam.toLowerCase()) ||
      p.productDescription?.toLowerCase().includes(searchParam.toLowerCase())
    );
    if (filters.categories?.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.priceRange)         list = list.filter((p) => p.productPrice >= filters.priceRange.min && p.productPrice <= filters.priceRange.max);
    if (filters.minRating)          list = list.filter((p) => (p.rating || 0) >= filters.minRating);
    if (filters.types?.length)      list = list.filter((p) => filters.types.some((t) => p.productDescription?.includes(t)));

    switch (sort) {
      case "price-lo": return list.sort((a, b) => a.productPrice - b.productPrice);
      case "price-hi": return list.sort((a, b) => b.productPrice - a.productPrice);
      case "rating":   return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest":   return list.sort((a, b) => b.productId - a.productId);
      default:         return list;
    }
  }, [products, filters, sort, searchParam]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };
  const clearFilters = () => setFilters({ priceRange: null, categories: [], minRating: null, types: [] });
  const activeCount  = (filters.categories?.length || 0) + (filters.priceRange ? 1 : 0) + (filters.minRating ? 1 : 0) + (filters.types?.length || 0);

  return (
    <main className="pp">
      <div className="container pp__inner">

        {/* Filter Sidebar */}
        <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />

        {/* Main Content */}
        <div className="pp__main">

          {/* Sort bar */}
          <div className="pp__topbar">
            <div className="pp__count">
              {loading ? "Loading…" : (
                <>
                  <strong>{filtered.length}</strong> products
                  {searchParam && <span className="pp__search-label"> for "{searchParam}"</span>}
                  {activeCount > 0 && (
                    <button className="pp__filter-badge" onClick={clearFilters}>
                      {activeCount} filter{activeCount > 1 ? "s" : ""} ✕
                    </button>
                  )}
                </>
              )}
            </div>
            <select
              className="pp__sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="pp__grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="pp__empty">
              <span className="pp__empty-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="pp__grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.productId}
                  product={p}
                  onAddToCart={(p) => { setCart((c) => [...c, p]); showToast(`${p.productName} added to cart 🛒`); }}
                  onWishlist={() => showToast("Wishlist updated ♥")}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="toast-wrap">
          <div className="toast success">{toast}</div>
        </div>
      )}
    </main>
  );
}

export default ProductsPage;
