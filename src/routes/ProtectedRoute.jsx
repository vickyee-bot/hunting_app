import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  console.log("Checking authentication in ProtectedRoute...");
  console.log("Token found:", token);

  if (loading) {
    console.log("Waiting for authentication state...");
    return <div>Loading...</div>; // Prevents flashing login page too early
  }

  if (!token) {
    console.log("No valid session, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
