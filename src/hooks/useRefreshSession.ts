import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, clearAuth } from "@/features/auth/redux/auth.slice";
import { authApi } from "@/shared/axios/axios.instance";
import { AUTH_API } from "@/features/auth/constants/api";

export const useRefreshSession = () => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await authApi.post(AUTH_API.REFRESH_TOKEN);
        dispatch(setAccessToken(data.accessToken));
      } catch {
        dispatch(clearAuth());
      } finally {
        setIsRefreshing(false);
      }
    };

    initAuth();
  }, [dispatch]);

  return { isRefreshing };
};