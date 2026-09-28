import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import { PasswordInput } from "../components/passwordInput";
import GlowLoader from "@/components/PageLoader";

import { resetPassword, clearSuccess } from "@/features/auth/redux/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

const ResetPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, pendingEmail } = useSelector(
    (state: RootState) => state.auth,
  );

  const code = (location.state as { code?: string } | null)?.code ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Guard 1 — must have arrived from ResetOtpPage with a code
  useEffect(() => {
    if (!code) {
      navigate("/reset-password", { replace: true });
    }
  }, [code, navigate]);

  // Guard 2 — must have a pending email in Redux
  useEffect(() => {
    if (!pendingEmail) {
      navigate("/forgot-password", { replace: true });
    }
  }, [pendingEmail, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const result = await dispatch(
      resetPassword({
        email: pendingEmail!,
        code,
        newPassword,
        confirmPassword,
      }),
    );

    if (resetPassword.fulfilled.match(result)) {
      toast.success("Password reset successfully! Please log in.");
      navigate("/login");
    } else {
      toast.error((result.payload as string) || "Password reset failed.");
      dispatch(clearSuccess());
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="New Password"
        subtitle="Choose a strong password for your account."
      />

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <GlowLoader />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />

          <PasswordInput
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Remember your password?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </AuthCard>
  );
};

export default ResetPasswordPage;