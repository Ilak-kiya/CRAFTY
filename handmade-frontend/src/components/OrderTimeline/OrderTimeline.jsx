import { ORDER_STAGES } from "../../constants/data";
import "./OrderTimeline.css";

function fmt(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function OrderTimeline({ currentStage, timeline = [] }) {
  const stageKeys   = ORDER_STAGES.map((s) => s.key);
  const currentIdx  = stageKeys.indexOf(currentStage);
  const progressPct = Math.round((currentIdx / (stageKeys.length - 1)) * 100);

  const getEntry = (key) => timeline.find((t) => t.stage === key);

  return (
    <div className="otl">
      {/* Top progress bar */}
      <div className="otl__bar-wrap">
        <div className="otl__bar-track">
          <div className="otl__bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="otl__bar-labels">
          <span>Order Placed</span>
          <span>In Transit</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="otl__steps">
        {ORDER_STAGES.map((stage, idx) => {
          const done    = idx < currentIdx;
          const active  = idx === currentIdx;
          const pending = idx > currentIdx;
          const entry   = getEntry(stage.key);
          const stateClass = done ? "done" : active ? "active" : "pending";

          return (
            <div key={stage.key} className={`otl__step otl__step--${stateClass}`}>
              {/* Connector line */}
              {idx > 0 && (
                <div className={`otl__connector${done || active ? " otl__connector--filled" : ""}`} />
              )}

              {/* Circle */}
              <div className="otl__circle">
                {done   ? <span className="otl__check">✓</span>  : null}
                {active ? <span className="otl__pulse" />         : null}
                {pending? <span className="otl__icon">{stage.icon}</span> : null}
                {done   ? null : active ? <span className="otl__icon otl__icon--active">{stage.icon}</span> : null}
              </div>

              {/* Label */}
              <div className="otl__label-wrap">
                <span className="otl__label">{stage.label}</span>
                {entry && (
                  <span className="otl__time">{fmt(entry.time)}</span>
                )}
                {!entry && !pending && (
                  <span className="otl__desc">{stage.desc}</span>
                )}
                {entry?.note && (
                  <span className="otl__note">{entry.note}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderTimeline;
