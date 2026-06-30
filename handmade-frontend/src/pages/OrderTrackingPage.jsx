import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OrderTimeline from "../components/OrderTimeline/OrderTimeline";
import { MOCK_ORDERS, ORDER_STAGES } from "../constants/data";
import { fetchOrderById, cancelOrder, returnOrder } from "../api/orderApi";
import "./OrderTrackingPage.css";

/* ── helpers ── */
function fmt(iso, opts) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    ...opts,
  });
}
function fmtFull(iso) {
  return fmt(iso, { hour: "2-digit", minute: "2-digit", hour12: true });
}
function stageLabel(key) {
  return ORDER_STAGES.find((s) => s.key === key)?.label || key;
}
function stageColor(key) {
  const map = {
    placed: "#6B7FD7", payment: "#2196F3", processing: "#FF9800",
    packed: "#9C27B0", shipped: "#00BCD4", out: "#FF5722", delivered: "#4CAF50",
  };
  return map[key] || "var(--forest)";
}

/* ── Cancel Modal ── */
function CancelModal({ onConfirm, onClose }) {
  return (
    <div className="otp__modal-overlay" onClick={onClose}>
      <div className="otp__modal" onClick={(e) => e.stopPropagation()}>
        <button className="otp__modal-close" onClick={onClose}>✕</button>
        <div className="otp__modal-icon">⚠️</div>
        <h3 className="otp__modal-title">Cancel Order?</h3>
        <p className="otp__modal-text">
          Are you sure you want to cancel this order? The refund will be processed within 5–7 business days.
        </p>
        <div className="otp__modal-actions">
          <button className="btn-outline" onClick={onClose}>Keep Order</button>
          <button className="btn-primary otp__modal-danger" onClick={onConfirm}>Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ── Return Modal ── */
function ReturnModal({ onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  const reasons = ["Wrong item delivered", "Damaged product", "Quality not as expected", "Changed my mind", "Other"];
  return (
    <div className="otp__modal-overlay" onClick={onClose}>
      <div className="otp__modal" onClick={(e) => e.stopPropagation()}>
        <button className="otp__modal-close" onClick={onClose}>✕</button>
        <div className="otp__modal-icon">↩️</div>
        <h3 className="otp__modal-title">Request Return</h3>
        <p className="otp__modal-text">Select a reason for return:</p>
        <div className="otp__return-reasons">
          {reasons.map((r) => (
            <label key={r} className="otp__return-reason">
              <input type="radio" name="reason" value={r} onChange={() => setReason(r)} />
              <span>{r}</span>
            </label>
          ))}
        </div>
        <div className="otp__modal-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            disabled={!reason}
            onClick={() => reason && onConfirm(reason)}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
function OrderTrackingPage() {
  const { id }                    = useParams();
  const [order, setOrder]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [toast, setToast]         = useState(null);
  const [searchId, setSearchId]   = useState(id || "");
  const [inputId, setInputId]     = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const loadOrder = (orderId) => {
    setLoading(true);
    fetchOrderById(orderId)
      .then((res) => setOrder(res.data))
      .catch(() => {
        const found = MOCK_ORDERS.find(
          (o) => o.orderId.toLowerCase() === orderId.toLowerCase()
        );
        setOrder(found || null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchId) loadOrder(searchId);
    else { setLoading(false); setOrder(MOCK_ORDERS[0]); }
  }, [searchId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputId.trim()) setSearchId(inputId.trim());
  };

  const handleCancel = () => {
    cancelOrder(order.orderId)
      .catch(() => {})
      .finally(() => {
        setOrder((o) => ({ ...o, currentStage: "cancelled", canCancel: false }));
        setShowCancel(false);
        showToast("Order cancelled. Refund will be processed in 5–7 days.");
      });
  };

  const handleReturn = (reason) => {
    returnOrder(order.orderId, reason)
      .catch(() => {})
      .finally(() => {
        setOrder((o) => ({ ...o, canReturn: false }));
        setShowReturn(false);
        showToast("Return request submitted! Seller will contact you shortly.");
      });
  };

  const handleDownloadInvoice = () => {
    showToast("Invoice downloaded as PDF 📄");
  };

  if (loading) {
    return (
      <main className="otp">
        <div className="container otp__loading">
          <div className="otp__loading-spinner" />
          <p>Fetching your order…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="otp">
      <div className="container">

        {/* ── Search bar ── */}
        <div className="otp__search-wrap fade-up">
          <h1 className="otp__page-title">Track Your Order</h1>
          <p className="otp__page-sub">Enter your Order ID to get live status updates</p>
          <form className="otp__search-form" onSubmit={handleSearch}>
            <input
              className="otp__search-input"
              type="text"
              placeholder="e.g. CRF-2025-001"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <button type="submit" className="btn-primary otp__search-btn">
              Track
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>
          {/* Quick-pick links */}
          <div className="otp__quick-picks">
            {MOCK_ORDERS.map((o) => (
              <button
                key={o.orderId}
                className={`otp__quick-btn${order?.orderId === o.orderId ? " otp__quick-btn--active" : ""}`}
                onClick={() => { setSearchId(o.orderId); setInputId(o.orderId); }}
              >
                {o.orderId}
              </button>
            ))}
          </div>
        </div>

        {!order ? (
          <div className="otp__not-found fade-up">
            <span className="otp__not-found-icon">📦</span>
            <h3>Order Not Found</h3>
            <p>We couldn't find an order with that ID. Please check and try again.</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <div className="otp__layout fade-up">

            {/* ── LEFT COLUMN ── */}
            <div className="otp__left">

              {/* Status hero card */}
              <div className="otp__status-card">
                <div className="otp__status-card-bg" style={{ background: `linear-gradient(135deg, var(--forest) 0%, #163d2e 100%)` }} />
                <div className="otp__status-card-content">
                  <div className="otp__status-badge" style={{ background: stageColor(order.currentStage) }}>
                    <span>{ORDER_STAGES.find((s) => s.key === order.currentStage)?.icon}</span>
                    {stageLabel(order.currentStage)}
                  </div>
                  <div className="otp__status-meta">
                    <div className="otp__status-meta-item">
                      <span className="otp__status-meta-label">Order ID</span>
                      <span className="otp__status-meta-val">{order.orderId}</span>
                    </div>
                    <div className="otp__status-meta-divider" />
                    <div className="otp__status-meta-item">
                      <span className="otp__status-meta-label">Placed On</span>
                      <span className="otp__status-meta-val">{fmt(order.placedAt)}</span>
                    </div>
                    <div className="otp__status-meta-divider" />
                    <div className="otp__status-meta-item">
                      <span className="otp__status-meta-label">Est. Delivery</span>
                      <span className="otp__status-meta-val otp__status-meta-val--accent">
                        {fmt(order.estimatedDelivery)}
                      </span>
                    </div>
                  </div>
                  <p className="otp__last-updated">
                    Last updated: {fmtFull(order.lastUpdated)}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">📍</span> Order Journey
                </h2>
                <OrderTimeline
                  currentStage={order.currentStage}
                  timeline={order.timeline}
                />
              </div>

              {/* Actions */}
              <div className="otp__actions-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">⚡</span> Order Actions
                </h2>
                <div className="otp__actions-grid">
                  {order.canCancel && (
                    <button className="otp__action-btn otp__action-btn--danger" onClick={() => setShowCancel(true)}>
                      <span className="otp__action-icon">✕</span>
                      <div>
                        <span className="otp__action-label">Cancel Order</span>
                        <span className="otp__action-sub">Before shipment only</span>
                      </div>
                    </button>
                  )}
                  {order.canReturn && (
                    <button className="otp__action-btn otp__action-btn--warn" onClick={() => setShowReturn(true)}>
                      <span className="otp__action-icon">↩️</span>
                      <div>
                        <span className="otp__action-label">Return Request</span>
                        <span className="otp__action-sub">Within 7 days of delivery</span>
                      </div>
                    </button>
                  )}
                  <button className="otp__action-btn" onClick={handleDownloadInvoice}>
                    <span className="otp__action-icon">📄</span>
                    <div>
                      <span className="otp__action-label">Download Invoice</span>
                      <span className="otp__action-sub">PDF format</span>
                    </div>
                  </button>
                  <a href={`mailto:${order.seller?.contact}`} className="otp__action-btn">
                    <span className="otp__action-icon">💬</span>
                    <div>
                      <span className="otp__action-label">Contact Seller</span>
                      <span className="otp__action-sub">{order.seller?.name}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="otp__right">

              {/* Product card */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">🛍️</span> Order Summary
                </h2>
                <div className="otp__product">
                  <img src={order.product.image} alt={order.product.productName} className="otp__product-img" />
                  <div className="otp__product-info">
                    <span className="otp__product-cat">{order.product.category}</span>
                    <h3 className="otp__product-name">{order.product.productName}</h3>
                    <div className="otp__product-meta">
                      <span>Qty: <strong>{order.product.quantity}</strong></span>
                      <span className="otp__product-price">₹{(order.product.productPrice * order.product.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
                <div className="otp__summary-rows">
                  <div className="otp__summary-row">
                    <span>Item Total</span>
                    <span>₹{(order.product.productPrice * order.product.quantity).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="otp__summary-row">
                    <span>Delivery</span>
                    <span className="otp__free">FREE</span>
                  </div>
                  <div className="otp__summary-row otp__summary-row--total">
                    <span>Total Paid</span>
                    <span>₹{(order.product.productPrice * order.product.quantity).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">📍</span> Delivery Address
                </h2>
                <div className="otp__address">
                  <p className="otp__address-name">{order.shipping.name}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state} — {order.shipping.pin}</p>
                  <p className="otp__address-phone">📞 {order.shipping.phone}</p>
                </div>
              </div>

              {/* Payment */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">💳</span> Payment Details
                </h2>
                <div className="otp__payment">
                  <div className="otp__payment-row">
                    <span>Method</span>
                    <span className="otp__payment-method">{order.payment.method}</span>
                  </div>
                  <div className="otp__payment-row">
                    <span>Transaction ID</span>
                    <span className="otp__payment-id">{order.payment.id}</span>
                  </div>
                  <div className="otp__payment-row">
                    <span>Paid At</span>
                    <span>{fmtFull(order.payment.paidAt)}</span>
                  </div>
                </div>
              </div>

              {/* Courier */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">🚚</span> Delivery Partner
                </h2>
                <div className="otp__courier">
                  <div className="otp__courier-logo">{order.courier.name[0]}</div>
                  <div className="otp__courier-info">
                    <p className="otp__courier-name">{order.courier.name}</p>
                    <p className="otp__courier-tracking">
                      Tracking No:&nbsp;
                      <strong className="otp__courier-tracking-no">{order.courier.trackingNo}</strong>
                    </p>
                    <a href={`tel:${order.courier.contact}`} className="otp__courier-contact">
                      📞 {order.courier.contact}
                    </a>
                  </div>
                </div>
              </div>

              {/* Seller */}
              <div className="otp__section-card">
                <h2 className="otp__section-title">
                  <span className="otp__section-icon">✦</span> Seller Info
                </h2>
                <div className="otp__seller">
                  <div className="otp__seller-avatar">{order.seller.name[0]}</div>
                  <div>
                    <p className="otp__seller-name">{order.seller.name}</p>
                    <a href={`mailto:${order.seller.contact}`} className="otp__seller-link">{order.seller.contact}</a>
                    <a href={`tel:${order.seller.phone}`}    className="otp__seller-link">{order.seller.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCancel && <CancelModal onConfirm={handleCancel} onClose={() => setShowCancel(false)} />}
      {showReturn && <ReturnModal onConfirm={handleReturn} onClose={() => setShowReturn(false)} />}

      {/* Toast */}
      {toast && (
        <div className="toast-wrap">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}
    </main>
  );
}

export default OrderTrackingPage;
