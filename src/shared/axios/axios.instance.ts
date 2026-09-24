import axios from "axios";
import { toast } from "react-toastify";
import { store } from "@/store/store";
import { setAccessToken, clearAuth } from "@/features/auth/redux/auth.slice";
import { API_CONFIG } from "../constants/api.constants";
import { AUTH_API } from "@/features/auth/constants/api";
import { AUTH_PATHS } from "@/features/auth/constants/paths";
import { router } from "@/routes/Router";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const authApi = axios.create({
  baseURL: API_CONFIG.AUTH_BASE,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

const handleForceLogout = (message?: string) => {
  store.dispatch(clearAuth());
  if (message) toast.error(message);
  router.navigate(AUTH_PATHS.LOGIN, { replace: true });
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message;

    const isSuspended = status === 401 && message === "User suspended";
    const isExpired = status === 401 && message === "Access token expired";

    if (isSuspended) {
      handleForceLogout("Your account has been suspended. Contact support.");
      return Promise.reject(error);
    }

    if (!isExpired || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(privateApi(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await authApi.post(AUTH_API.REFRESH_TOKEN);
      const newToken = data.accessToken;

      store.dispatch(setAccessToken(newToken));
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return privateApi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      handleForceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);