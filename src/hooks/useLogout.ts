import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch } from "@/store/store";
import { logout } from "@/features/auth/redux/auth.slice";

export type UseLogoutReturn = {
  handleLogout: () => Promise<void>;
};

export const useLogout = (): UseLogoutReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  return { handleLogout };
};