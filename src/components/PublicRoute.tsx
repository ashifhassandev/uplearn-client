import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export const PublicRoute = () => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (accessToken && user) {
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "tutor")
      return <Navigate to="/tutor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};