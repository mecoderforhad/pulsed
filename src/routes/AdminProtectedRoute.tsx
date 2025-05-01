import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../provider/useAuth';

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user} = useAuth();

  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
