import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  getMe,
  getToken,
} from "../../services/auth";

export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!getToken()) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await getMe();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm font-medium text-slate-500">
          Loading NovaFlow...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}