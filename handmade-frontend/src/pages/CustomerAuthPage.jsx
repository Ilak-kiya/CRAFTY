import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { customerLogin, customerSignup } from "../api/customerApi";
import "./AuthPage.css";

/* ── Validation helpers ── */
const validators = {
  name:    (v) => v.trim().length < 2     ? "Full name must be at least 2 characters" : "",
  email:   (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : "",
  phone:   (v) => !/^[6-9]\d{9}$/.test(v.replace(/\s/g,""))  ? "Enter a valid 10-digit Indian mobile number" : "",
  password:(v) => v.length < 8           ? "Password must be at least 8 characters" : "",
  confirm: (v, pw) => v !== pw           ? "Passwords do not match" : "",
  address: (v) => v.trim().length < 10   ? "Please enter a complete address" : "",
};

const EMPTY_SIGNUP = { customerName:"", customerEmail:"", phone:"", customerPass:"", confirm:"", address:"" };
const EMPTY_LOGIN  = { customerEmail:"", customerPass:"" };

function Field({ label, type = "text", name, value, onChange, error, placeholder, autoComplete }) {
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
      {error && <span className="auth-field__error">{error}</span>}
    </div>
  );
}

export default function CustomerAuthPage() {
  const [tab, setTab]       = useState("login");
  const [form, setForm]     = useState(EMPTY_LOGIN);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/";

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

  const validateLogin = () => {
    const e = {};
    e.customerEmail = validators.email(form.customerEmail);
    e.customerPass  = form.customerPass.trim() === "" ? "Password is required" : "";
    return e;
  };

  const validateSignup = () => {
    const e = {};
    e.customerName  = validators.name(form.customerName);
    e.customerEmail = validators.email(form.customerEmail);
    e.phone         = validators.phone(form.phone);
    e.customerPass  = validators.password(form.customerPass);
    e.confirm       = validators.confirm(form.confirm, form.customerPass);
    e.address       = validators.address(form.address);
    return e;
  };

  const hasErrors = (e) => Object.values(e).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = tab === "login" ? validateLogin() : validateSignup();
    if (hasErrors(errs)) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");

    try {
      if (tab === "login") {
        const res = await customerLogin({ customerEmail: form.customerEmail, customerPass: form.customerPass });
        const userData = res.data;
        login({ id: userData.customerId, name: userData.customerName, email: userData.customerEmail, role: "customer", token: userData.token || "mock-token" });
        navigate(from, { replace: true });
      } else {
        const { confirm, phone, address, ...payload } = form;
        const res = await customerSignup({ ...payload, phone, address });
        const userData = res.data;
        login({ id: userData.customerId, name: userData.customerName, email: userData.customerEmail, role: "customer", token: "mock-token" });
        navigate("/", { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "";
      if (err.response?.status === 401 || err.response?.status === 404) {
        setApiError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 409) {
        setApiError("An account with this email already exists.");
      } else if (msg) {
        setApiError(String(msg));
      } else {
        // Backend offline — use mock login for development
        if (tab === "login") {
          login({ id: 1, name: "Demo Customer", email: form.customerEmail, role: "customer", token: "mock-token" });
          navigate(from, { replace: true });
        } else {
          login({ id: 1, name: form.customerName, email: form.customerEmail, role: "customer", token: "mock-token" });
          navigate("/", { replace: true });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">✦ Crafty</Link>
          <h1 className="auth-card__title">
            {tab === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="auth-card__sub">
            {tab === "login" ? "Sign in to your customer account" : "Join thousands of happy customers"}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login"  ? " auth-tab--active" : ""}`} onClick={() => switchTab("login")}>Login</button>
          <button className={`auth-tab${tab === "signup" ? " auth-tab--active" : ""}`} onClick={() => switchTab("signup")}>Sign Up</button>
        </div>

        {/* API Error */}
        {apiError && <div className="auth-api-error">{apiError}</div>}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {tab === "signup" && (
            <>
              <Field label="Full Name"     name="customerName"  value={form.customerName  || ""} onChange={handle} error={errors.customerName}  placeholder="Your full name"       autoComplete="name" />
            </>
          )}
          <Field label="Email Address"   name="customerEmail" value={form.customerEmail} onChange={handle} error={errors.customerEmail} placeholder="you@email.com"          autoComplete="email" type="email" />
          {tab === "signup" && (
            <Field label="Phone Number"  name="phone"         value={form.phone         || ""} onChange={handle} error={errors.phone}         placeholder="10-digit mobile number" autoComplete="tel" />
          )}
          <Field label="Password"        name="customerPass"  value={form.customerPass}  onChange={handle} error={errors.customerPass}  placeholder="Min. 8 characters"      autoComplete={tab === "login" ? "current-password" : "new-password"} type="password" />
          {tab === "signup" && (
            <>
              <Field label="Confirm Password" name="confirm"   value={form.confirm       || ""} onChange={handle} error={errors.confirm}        placeholder="Repeat password"       autoComplete="new-password" type="password" />
              <Field label="Delivery Address" name="address"   value={form.address       || ""} onChange={handle} error={errors.address}        placeholder="Full delivery address"  autoComplete="street-address" />
            </>
          )}

          {tab === "login" && (
            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : (tab === "login" ? "Sign In" : "Create Account")}
          </button>
        </form>

        {/* Switch link */}
        <p className="auth-switch">
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button className="auth-switch__btn" onClick={() => switchTab(tab === "login" ? "signup" : "login")}>
            {tab === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>

        {/* Seller link */}
        <p className="auth-alt-link">
          Are you a seller? <Link to="/seller/login">Seller Login →</Link>
        </p>
      </div>
    </div>
  );
}
