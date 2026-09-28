import type { RouteObject } from "react-router-dom";
import { PublicRoute } from "@/components/PublicRoute";
import AuthLayout from "@/features/auth/layout/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import OtpPage from "@/features/auth/pages/otpPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import GoogleAuthSuccess from "@/features/auth/pages/GoogleAuthSuccess";
import ResetOtpPage from "@/features/auth/pages/ResetOtpPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import { AUTH_PATHS } from "@/features/auth/constants/paths";

const authRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: AUTH_PATHS.LOGIN, element: <LoginPage /> },
          { path: AUTH_PATHS.SIGNUP, element: <SignupPage /> },
          { path: AUTH_PATHS.VERIFY_OTP, element: <OtpPage /> },
          { path: AUTH_PATHS.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
          { path: AUTH_PATHS.RESET_PASSWORD, element: <ResetOtpPage /> },
          {
            path: AUTH_PATHS.RESET_PASSWORD_NEW,
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
  { path: AUTH_PATHS.GOOGLE_SUCCESS, element: <GoogleAuthSuccess /> },
];

export default authRoutes;