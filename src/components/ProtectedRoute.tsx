import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

// Generic — just checks if logged in
export const ProtectedRoute = () => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken) return <Navigate to="/login" replace />;
  if (user && user.status === "suspended")
    return <Navigate to="/login" replace />;

  return <Outlet />;
};

// Role-specific — checks
export const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken || !user) return <Navigate to="/login" replace />;
  if (user.status === "suspended") return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "tutor")
      return <Navigate to="/tutor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};