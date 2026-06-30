import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SELLER_ORDERS, ORDER_STAGES } from "../constants/data";
import { fetchOrders, updateOrderStatus, markShipped, markDelivered, deleteOrder } from "../api/orderApi";
import "./SellerDashboardPage.css";

/* ── helpers ── */
const NEXT_STAGE = {
  placed: "payment", payment: "processing", processing: "packed",
  packed: "shipped", shipped: "out", out: "delivered",
};
function stageLabel(k) { return ORDER_STAGES.find((s) => s.key === k)?.label || k; }
function stageIcon(k)  { return ORDER_STAGES.find((s) => s.key === k)?.icon  || "•";  }

const STATUS_COLOR = {
  placed: "#6B7FD7", payment: "#2196F3", processing: "#FF9800",
  packed: "#9C27B0", shipped: "#00BCD4", out: "#FF5722", delivered: "#4CAF50",
  cancelled: "#e53935",
};

/* ── Tracking modal ── */
function ShipModal({ order, onConfirm, onClose }) {
  const [trackingNo, setTrackingNo] = useState("");
  const [courier,    setCourier]    = useState("");
  return (
    <div className="sdp__modal-overlay" onClick={onClose}>
      <div className="sdp__modal" onClick={(e) => e.stopPropagation()}>
        <button className="sdp__modal-close" onClick={onClose}>✕</button>
        <h3 className="sdp__modal-title">🚚 Mark as Shipped</h3>
        <p className="sdp__modal-sub">Order: <strong>{order.orderId}</strong></p>
        <div className="sdp__modal-field">
          <label>Courier Partner</label>
          <input
            type="text"
            placeholder="e.g. BlueDart, Delhivery"
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
          />
        </div>
        <div className="sdp__modal-field">
          <label>Tracking Number</label>
          <input
            type="text"
            placeholder="e.g. BD-99284710"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
          />
        </div>
        <div className="sdp__modal-actions">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            disabled={!trackingNo || !courier}
            onClick={() => (trackingNo && courier) && onConfirm(order.orderId, trackingNo, courier)}
          >
            Confirm Shipment
          </button>
        </div>
      </div>
    </div>
  );
}

function SellerDashboardPage() {
  const [orders,  setOrders]   = useState(SELLER_ORDERS);
  const [filter,  setFilter]   = useState("all");
  const [toast,   setToast]    = useState(null);
  const [shipFor, setShipFor]  = useState(null);   // order to ship

  useEffect(() => {
    fetchOrders()
      .then((res) => { if (res.data?.length) setOrders(res.data); })
      .catch(() => {});
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const advanceStage = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, stage: NEXT_STAGE[o.stage] || o.stage }
          : o
      )
    );
    updateOrderStatus(orderId, NEXT_STAGE[orders.find((o) => o.orderId === orderId)?.stage])
      .catch(() => {});
    showToast(`Order ${orderId} status updated ✓`);
  };

  const handleShipConfirm = (orderId, trackingNo, courier) => {
    setOrders((prev) =>
      prev.map((o) => o.orderId === orderId ? { ...o, stage: "shipped", trackingNo, courier } : o)
    );
    markShipped(orderId, trackingNo).catch(() => {});
    setShipFor(null);
    showToast(`Order ${orderId} marked as shipped 🚚`);
  };

  const handleDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => o.orderId === orderId ? { ...o, stage: "delivered" } : o)
    );
    markDelivered(orderId).catch(() => {});
    showToast(`Order ${orderId} marked as delivered ✅`);
  };

  const handleDelete = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    deleteOrder(orderId).catch(() => {});
    showToast(`Order ${orderId} removed`, "error");
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.stage === filter);

  /* ── Stats ── */
  const stats = [
    { label: "Total Orders",    val: orders.length,                                        icon: "📦" },
    { label: "Processing",      val: orders.filter((o) => ["processing","packed"].includes(o.stage)).length, icon: "⚙️" },
    { label: "In Transit",      val: orders.filter((o) => ["shipped","out"].includes(o.stage)).length,       icon: "🚚" },
    { label: "Delivered",       val: orders.filter((o) => o.stage === "delivered").length, icon: "✅" },
    { label: "Revenue",         val: `₹${orders.reduce((s, o) => s + o.amount, 0).toLocaleString("en-IN")}`, icon: "💰" },
  ];

  return (
    <main className="sdp">
      <div className="container">

        {/* Header */}
        <div className="sdp__header fade-up">
          <div>
            <h1 className="sdp__page-title">Seller Dashboard</h1>
            <p className="sdp__page-sub">Manage your orders and shipments</p>
          </div>
          <Link to="/products" className="btn-outline sdp__back-btn">
            ← Back to Store
          </Link>
        </div>

        {/* Stats */}
        <div className="sdp__stats fade-up">
          {stats.map((s) => (
            <div key={s.label} className="sdp__stat-card">
              <span className="sdp__stat-icon">{s.icon}</span>
              <div>
                <span className="sdp__stat-val">{s.val}</span>
                <span className="sdp__stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="sdp__filter-tabs fade-up">
          {["all", "placed", "processing", "packed", "shipped", "out", "delivered"].map((f) => (
            <button
              key={f}
              className={`sdp__filter-tab${filter === f ? " sdp__filter-tab--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All Orders" : stageIcon(f) + " " + stageLabel(f)}
              <span className="sdp__filter-count">
                {f === "all" ? orders.length : orders.filter((o) => o.stage === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="sdp__table-wrap fade-up">
          {filtered.length === 0 ? (
            <div className="sdp__empty">
              <span>📭</span>
              <p>No orders in this stage</p>
            </div>
          ) : (
            <table className="sdp__table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>City</th>
                  <th>Placed</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.orderId} className="sdp__row">
                    <td>
                      <Link to={`/track/${order.orderId}`} className="sdp__order-id">
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="sdp__td-name">{order.customer}</td>
                    <td className="sdp__td-product">
                      <span className="sdp__product-name">{order.product}</span>
                    </td>
                    <td className="sdp__td-center">{order.qty}</td>
                    <td className="sdp__td-amount">₹{order.amount.toLocaleString("en-IN")}</td>
                    <td>{order.city}</td>
                    <td className="sdp__td-date">{order.placedAt}</td>
                    <td>
                      <span
                        className="sdp__status-badge"
                        style={{ background: STATUS_COLOR[order.stage] + "22", color: STATUS_COLOR[order.stage] }}
                      >
                        {stageIcon(order.stage)} {stageLabel(order.stage)}
                      </span>
                    </td>
                    <td>
                      <div className="sdp__row-actions">
                        {/* Advance stage */}
                        {order.stage !== "delivered" && order.stage !== "shipped" && order.stage !== "out" && order.stage !== "cancelled" && (
                          <button
                            className="sdp__btn sdp__btn--primary"
                            onClick={() => advanceStage(order.orderId)}
                            title={`Mark as ${stageLabel(NEXT_STAGE[order.stage])}`}
                          >
                            → {stageIcon(NEXT_STAGE[order.stage])}
                          </button>
                        )}
                        {/* Mark shipped */}
                        {order.stage === "packed" && (
                          <button
                            className="sdp__btn sdp__btn--ship"
                            onClick={() => setShipFor(order)}
                          >
                            🚚 Ship
                          </button>
                        )}
                        {/* Mark delivered */}
                        {order.stage === "out" && (
                          <button
                            className="sdp__btn sdp__btn--deliver"
                            onClick={() => handleDelivered(order.orderId)}
                          >
                            ✅ Delivered
                          </button>
                        )}
                        {/* Track */}
                        <Link to={`/track/${order.orderId}`} className="sdp__btn sdp__btn--view">
                          👁
                        </Link>
                        {/* Delete */}
                        {order.stage === "delivered" && (
                          <button
                            className="sdp__btn sdp__btn--delete"
                            onClick={() => handleDelete(order.orderId)}
                            title="Remove"
                          >
                            🗑
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {shipFor && (
        <ShipModal
          order={shipFor}
          onConfirm={handleShipConfirm}
          onClose={() => setShipFor(null)}
        />
      )}

      {toast && (
        <div className="toast-wrap">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}
    </main>
  );
}

export default SellerDashboardPage;
