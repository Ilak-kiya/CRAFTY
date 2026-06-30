import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, requireSeller = false }) {
  const { isLoggedIn, isSeller } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    const redirect = requireSeller ? "/seller/login" : "/login";
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  if (requireSeller && !isSeller) {
    return <Navigate to="/seller/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
