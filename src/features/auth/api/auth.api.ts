import { authApi, privateApi } from "@/shared/axios/axios.instance";
import { AUTH_API } from "../constants/api";
import type { SignupPayload, LoginPayload } from "../types/auth.types";

export const signupApi = async (data: SignupPayload) => {
  const response = await authApi.post(AUTH_API.SIGNUP, data);
  return response.data;
};

export const resendOtpApi = async (email: string) => {
  const response = await authApi.post(AUTH_API.RESEND_OTP, { email });
  return response.data;
};

export const verifyOtpApi = async (data: { email: string; code: string }) => {
  const response = await authApi.post(AUTH_API.VERIFY_OTP, data);
  return response.data;
};

export const verifyResetOtpApi = async (data: {
  email: string;
  code: string;
}) => {
  const response = await authApi.post(AUTH_API.VERIFY_RESET_OTP, data);
  return response.data;
};

export const loginApi = async (data: LoginPayload) => {
  const response = await authApi.post(AUTH_API.LOGIN, data);
  return response.data;
};

export const forgotPasswordApi = async (email: string) => {
  const response = await authApi.post(AUTH_API.FORGOT_PASSWORD, { email });
  return { ...response.data, email };
};

export const resetPasswordApi = async (data: {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await authApi.post(AUTH_API.RESET_PASSWORD, data);
  return response.data;
};

export const logoutApi = async () => {
  await privateApi.post(AUTH_API.LOGOUT);
  return true;
};