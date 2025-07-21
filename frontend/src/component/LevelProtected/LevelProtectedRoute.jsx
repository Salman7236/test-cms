import { Navigate } from "react-router-dom";

export const LevelProtectedRoute = ({ children, requiredLevel }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userLevel = parseInt(localStorage.getItem("userLevel") || "999", 10);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Lower userLevel numbers have higher privileges
  // If user level is higher than required level, they don't have access
  if (userLevel > requiredLevel) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
