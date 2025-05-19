import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
};