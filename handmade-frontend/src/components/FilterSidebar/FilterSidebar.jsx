import { useState } from "react";
import { CATEGORIES, PRICE_RANGES } from "../../constants/data";
import "./FilterSidebar.css";

function FilterSidebar({ filters, onChange, onClear }) {
  const [priceOpen, setPriceOpen]   = useState(true);
  const [catOpen,   setCatOpen]     = useState(true);
  const [ratingOpen,setRatingOpen]  = useState(true);
  const [typeOpen,  setTypeOpen]    = useState(false);

  const toggle = (key, val) => {
    onChange?.({ ...filters, [key]: filters[key] === val ? null : val });
  };

  const Section = ({ label, open, setOpen, children }) => (
    <div className="filter__section">
      <button className="filter__section-header" onClick={() => setOpen(!open)}>
        <span>{label}</span>
        <svg
          width="14" height="14" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && <div className="filter__section-body">{children}</div>}
    </div>
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter__head">
        <h3 className="filter__title">Filters</h3>
        <button className="filter__clear" onClick={onClear}>Clear all</button>
      </div>

      {/* Price */}
      <Section label="Price Range" open={priceOpen} setOpen={setPriceOpen}>
        {PRICE_RANGES.map((r) => (
          <label key={r.label} className="filter__option">
            <input
              type="radio"
              name="price"
              checked={filters.priceRange?.label === r.label}
              onChange={() => toggle("priceRange", r)}
            />
            <span className="filter__option-label">{r.label}</span>
          </label>
        ))}
      </Section>

      {/* Category */}
      <Section label="Category" open={catOpen} setOpen={setCatOpen}>
        {CATEGORIES.map((c) => (
          <label key={c.id} className="filter__option">
            <input
              type="checkbox"
              checked={filters.categories?.includes(c.name) || false}
              onChange={() => {
                const prev = filters.categories || [];
                const next = prev.includes(c.name)
                  ? prev.filter((x) => x !== c.name)
                  : [...prev, c.name];
                onChange?.({ ...filters, categories: next });
              }}
            />
            <span className="filter__option-label">
              {c.icon} {c.name}
              <span className="filter__count">{c.count}</span>
            </span>
          </label>
        ))}
      </Section>

      {/* Rating */}
      <Section label="Minimum Rating" open={ratingOpen} setOpen={setRatingOpen}>
        {[4.5, 4.0, 3.5, 3.0].map((r) => (
          <label key={r} className="filter__option">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => toggle("minRating", r)}
            />
            <span className="filter__option-label filter__stars">
              {"★".repeat(Math.floor(r))}{"☆".repeat(5 - Math.floor(r))}
              <span style={{ color: "var(--gray-lt)", fontSize:"0.75rem" }}> & up</span>
            </span>
          </label>
        ))}
      </Section>

      {/* Handmade type */}
      <Section label="Craft Type" open={typeOpen} setOpen={setTypeOpen}>
        {["Wheel-thrown","Hand-painted","Woven","Forged","Embroidered","Block-printed"].map((t) => (
          <label key={t} className="filter__option">
            <input
              type="checkbox"
              checked={filters.types?.includes(t) || false}
              onChange={() => {
                const prev = filters.types || [];
                const next = prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t];
                onChange?.({ ...filters, types: next });
              }}
            />
            <span className="filter__option-label">{t}</span>
          </label>
        ))}
      </Section>
    </aside>
  );
}

export default FilterSidebar;
