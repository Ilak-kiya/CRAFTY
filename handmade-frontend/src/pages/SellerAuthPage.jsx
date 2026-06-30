import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sellerLogin, sellerSignup } from "../api/sellerApi";
import "./AuthPage.css";

/* ── Validation ── */
const validators = {
  name:     (v) => v.trim().length < 2      ? "Name must be at least 2 characters" : "",
  business: (v) => v.trim().length < 2      ? "Business name is required" : "",
  email:    (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : "",
  phone:    (v) => !/^[6-9]\d{9}$/.test(v.replace(/\s/g,""))  ? "Enter a valid 10-digit Indian mobile number" : "",
  password: (v) => v.length < 8             ? "Password must be at least 8 characters" : "",
  confirm:  (v, pw) => v !== pw             ? "Passwords do not match" : "",
  address:  (v) => v.trim().length < 10     ? "Please enter a complete address" : "",
  gst:      (v) => !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v.trim().toUpperCase())
    ? "Enter a valid 15-character GST number (e.g. 22AAAAA0000A1Z5)" : "",
};

const EMPTY_SIGNUP = { sellerName:"", businessName:"", sellerEmail:"", phone:"", sellerPass:"", confirm:"", address:"", gst:"" };
const EMPTY_LOGIN  = { sellerEmail:"", sellerPass:"" };

function Field({ label, type = "text", name, value, onChange, error, placeholder, autoComplete, hint }) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div className={`auth-field${error ? " auth-field--error" : ""}`}>
      <label className="auth-field__label">{label}</label>
      <div className="auth-field__wrap">
        <input
          className="auth-field__input"
          type={isPass && show ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPass && (
          <button type="button" className="auth-field__eye" onClick={() => setShow(!show)} tabIndex={-1}>
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {hint  && !error && <span className="auth-field__hint">{hint}</span>}
      {error && <span className="auth-field__error">{error}</span>}
    </div>
  );
}

export default function SellerAuthPage() {
  const [tab, setTab]         = useState("login");
  const [form, setForm]       = useState(EMPTY_LOGIN);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/seller/dashboard";

  const switchTab = (t) => {
    setTab(t);
    setForm(t === "login" ? EMPTY_LOGIN : EMPTY_SIGNUP);
    setErrors({});
    setApiError("");
  };

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setApiError("");
  };

  const validateLogin = () => ({
    sellerEmail: validators.email(form.sellerEmail),
    sellerPass:  form.sellerPass.trim() === "" ? "Password is required" : "",
  });

  const validateSignup = () => ({
    sellerName:   validators.name(form.sellerName),
    businessName: validators.business(form.businessName),
    sellerEmail:  validators.email(form.sellerEmail),
    phone:        validators.phone(form.phone),
    sellerPass:   validators.password(form.sellerPass),
    confirm:      validators.confirm(form.confirm, form.sellerPass),
    address:      validators.address(form.address),
    gst:          validators.gst(form.gst),
  });

  const hasErrors = (e) => Object.values(e).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = tab === "login" ? validateLogin() : validateSignup();
    if (hasErrors(errs)) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");

    try {
      if (tab === "login") {
        const res = await sellerLogin({ sellerEmail: form.sellerEmail, sellerPass: form.sellerPass });
        const d = res.data;
        login({ id: d.sellerId, name: d.sellerName, email: d.sellerEmail, role: "seller", token: d.token || "mock-token" });
        navigate(from, { replace: true });
      } else {
        const { confirm, ...payload } = form;
        const res = await sellerSignup({ sellerName: payload.sellerName, sellerEmail: payload.sellerEmail, sellerPass: payload.sellerPass, businessName: payload.businessName, phone: payload.phone, address: payload.address, gst: payload.gst });
        const d = res.data;
        login({ id: d.sellerId, name: d.sellerName, email: d.sellerEmail, role: "seller", token: "mock-token" });
        navigate("/seller/dashboard", { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "";
      if (err.response?.status === 401 || err.response?.status === 404) {
        setApiError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 409) {
        setApiError("A seller account with this email already exists.");
      } else if (msg) {
        setApiError(String(msg));
      } else {
        // Backend offline — mock login
        if (tab === "login") {
          login({ id: 1, name: "Demo Seller", email: form.sellerEmail, role: "seller", token: "mock-token" });
          navigate(from, { replace: true });
        } else {
          login({ id: 1, name: form.sellerName, email: form.sellerEmail, role: "seller", token: "mock-token" });
          navigate("/seller/dashboard", { replace: true });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page--seller">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">✦ Crafty</Link>
          <div className="auth-card__role-badge">Seller Portal</div>
          <h1 className="auth-card__title">
            {tab === "login" ? "Welcome back, Artisan" : "Start selling today"}
          </h1>
          <p className="auth-card__sub">
            {tab === "login" ? "Sign in to your seller account" : "Join 800+ artisans already on Crafty"}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login"  ? " auth-tab--active" : ""}`} onClick={() => switchTab("login")}>Login</button>
          <button className={`auth-tab${tab === "signup" ? " auth-tab--active" : ""}`} onClick={() => switchTab("signup")}>Sign Up</button>
        </div>

        {apiError && <div className="auth-api-error">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {tab === "signup" && (
            <>
              <div className="auth-form__row">
                <Field label="Seller / Artisan Name" name="sellerName"   value={form.sellerName   || ""} onChange={handle} error={errors.sellerName}   placeholder="Your full name"      autoComplete="name" />
                <Field label="Business / Shop Name"  name="businessName" value={form.businessName || ""} onChange={handle} error={errors.businessName} placeholder="Your brand or shop"   autoComplete="organization" />
              </div>
            </>
          )}

          <Field label="Email Address" name="sellerEmail" value={form.sellerEmail} onChange={handle} error={errors.sellerEmail} placeholder="seller@email.com" autoComplete="email" type="email" />

          {tab === "signup" && (
            <Field label="Phone Number" name="phone" value={form.phone || ""} onChange={handle} error={errors.phone} placeholder="10-digit mobile number" autoComplete="tel" />
          )}

          <Field label="Password" name="sellerPass" value={form.sellerPass} onChange={handle} error={errors.sellerPass} placeholder="Min. 8 characters" autoComplete={tab === "login" ? "current-password" : "new-password"} type="password" />

          {tab === "signup" && (
            <>
              <Field label="Confirm Password" name="confirm"  value={form.confirm  || ""} onChange={handle} error={errors.confirm}  placeholder="Repeat password"        autoComplete="new-password" type="password" />
              <Field label="Business Address" name="address"  value={form.address  || ""} onChange={handle} error={errors.address}  placeholder="Full business address"  autoComplete="street-address" />
              <Field
                label="GST Number"
                name="gst"
                value={(form.gst || "").toUpperCase()}
                onChange={handle}
                error={errors.gst}
                placeholder="e.g. 22AAAAA0000A1Z5"
                autoComplete="off"
                hint="15-character GST Identification Number"
              />
            </>
          )}

          {tab === "login" && (
            <div className="auth-forgot"><a href="#">Forgot password?</a></div>
          )}

          <button type="submit" className="btn-primary auth-submit auth-submit--seller" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : (tab === "login" ? "Sign In" : "Register as Seller")}
          </button>
        </form>

        <p className="auth-switch">
          {tab === "login" ? "Don't have a seller account? " : "Already have an account? "}
          <button className="auth-switch__btn" onClick={() => switchTab(tab === "login" ? "signup" : "login")}>
            {tab === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        <p className="auth-alt-link">
          Shopping instead? <Link to="/login">Customer Login →</Link>
        </p>
      </div>
    </div>
  );
}
