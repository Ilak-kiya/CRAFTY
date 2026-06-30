import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/data";
import "./CategorySection.css";

const CAT_IMAGES = {
  "Home Decor": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
  "Jewelry":    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=200&fit=crop",
  "Pottery":    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=200&fit=crop",
  "Paintings":  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=200&fit=crop",
  "Gifts":      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&h=200&fit=crop",
  "Textiles":   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
};

function CategorySection() {
  return (
    <section className="cat-section">
      <div className="container">
        <div className="cat-section__header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p  className="section-sub">Find handcrafted pieces for every taste</p>
          </div>
          <Link to="/products" className="cat-section__see-all btn-outline">
            View All
          </Link>
        </div>

        <div className="cat-section__grid">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="cat-card fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="cat-card__img-wrap">
                <img
                  src={CAT_IMAGES[cat.name]}
                  alt={cat.name}
                  className="cat-card__img"
                  loading="lazy"
                />
                <div className="cat-card__overlay" />
              </div>
              <div className="cat-card__body">
                <span className="cat-card__icon">{cat.icon}</span>
                <h3 className="cat-card__name">{cat.name}</h3>
                <span className="cat-card__count">{cat.count} items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
