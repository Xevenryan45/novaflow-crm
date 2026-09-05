// src/components/auth/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

export default function ProtectedRoute() {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}