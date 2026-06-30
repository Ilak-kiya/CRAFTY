import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import HomePage            from "./pages/HomePage";
import ProductsPage        from "./pages/ProductsPage";
import ProductDetailPage   from "./pages/ProductDetailPage";
import OrderTrackingPage   from "./pages/OrderTrackingPage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import CustomerAuthPage    from "./pages/CustomerAuthPage";
import SellerAuthPage      from "./pages/SellerAuthPage";

function AppInner() {
  const [cartCount,     setCartCount]     = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />
      <Routes>
        {/* Public */}
        <Route path="/"            element={<HomePage />} />
        <Route path="/products"    element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/track"       element={<OrderTrackingPage />} />
        <Route path="/track/:id"   element={<OrderTrackingPage />} />

        {/* Auth */}
        <Route path="/login"         element={<CustomerAuthPage />} />
        <Route path="/signup"        element={<CustomerAuthPage />} />
        <Route path="/seller/login"  element={<SellerAuthPage />} />
        <Route path="/seller/signup" element={<SellerAuthPage />} />

        {/* Protected — Customer */}
        <Route path="/cart"     element={<ProtectedRoute><OrderTrackingPage /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/orders"   element={<ProtectedRoute><OrderTrackingPage /></ProtectedRoute>} />
        <Route path="/profile"  element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        {/* Protected — Seller */}
        <Route path="/seller/dashboard"   element={<ProtectedRoute requireSeller><SellerDashboardPage /></ProtectedRoute>} />
        <Route path="/seller/add-product" element={<ProtectedRoute requireSeller><ProductsPage /></ProtectedRoute>} />
        <Route path="/seller/products"    element={<ProtectedRoute requireSeller><ProductsPage /></ProtectedRoute>} />
        <Route path="/seller/orders"      element={<ProtectedRoute requireSeller><SellerDashboardPage /></ProtectedRoute>} />
        <Route path="/seller/earnings"    element={<ProtectedRoute requireSeller><SellerDashboardPage /></ProtectedRoute>} />
        <Route path="/seller/profile"     element={<ProtectedRoute requireSeller><SellerDashboardPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
