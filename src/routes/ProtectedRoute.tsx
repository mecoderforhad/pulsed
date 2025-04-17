import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return children;
};
