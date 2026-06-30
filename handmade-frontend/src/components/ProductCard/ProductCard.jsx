import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} stars`}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#F5A623" : "#D8C3A5" }}>★</span>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onWishlist, wished = false }) {
  const [isWished, setIsWished]     = useState(wished);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgError, setImgError]     = useState(false);

  const handleWish = (e) => {
    e.preventDefault();
    setIsWished(!isWished);
    onWishlist?.(product);
  };

  const handleCart = (e) => {
    e.preventDefault();
    setAddedToCart(true);
    onAddToCart?.(product);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <Link to={`/product/${product.productId}`} className="pcard" aria-label={product.productName}>
      {/* Image */}
      <div className="pcard__img-wrap">
        {!imgError ? (
          <img
            src={product.image || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop`}
            alt={product.productName}
            className="pcard__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="pcard__img-fallback">🎨</div>
        )}

        {/* Tag */}
        {product.tag && (
          <span className={`pcard__tag pcard__tag--${product.tag.toLowerCase().replace(" ", "")}`}>
            {product.tag}
          </span>
        )}

        {/* Wishlist */}
        <button className={`pcard__wish${isWished ? " pcard__wish--active" : ""}`} onClick={handleWish} aria-label="Wishlist">
          {isWished ? "♥" : "♡"}
        </button>

        {/* Quick-add hover overlay */}
        <div className="pcard__overlay">
          <button
            className={`pcard__cart-btn${addedToCart ? " pcard__cart-btn--added" : ""}`}
            onClick={handleCart}
          >
            {addedToCart ? "✓ Added!" : "+ Add to Cart"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="pcard__body">
        <span className="pcard__category">{product.category}</span>
        <h3 className="pcard__name">{product.productName}</h3>
        <p  className="pcard__seller">by {product.seller}</p>

        <div className="pcard__footer">
          <div className="pcard__rating">
            <Stars rating={product.rating} />
            <span className="pcard__review-count">({product.reviews})</span>
          </div>
          <span className="pcard__price">₹{product.productPrice?.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
