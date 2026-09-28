import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import PageLoader from "@/components/PageLoader";

import {
  forgotPassword,
  resetAuthState,
  clearSuccess,
} from "@/features/auth/redux/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success, pendingEmail } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");

  // Clean any leftover state when landing on this page
  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (success && pendingEmail) {
      toast.success("An OTP has been sent to your email.");
      // ✅ Clear ONLY success/error/loading — pendingEmail must survive
      //    so ResetOtpPage's guard doesn't redirect back here
      dispatch(clearSuccess());
      navigate("/reset-password");
    }
  }, [success, pendingEmail, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [error, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email to receive a reset code."
      />

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <PageLoader />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-5 py-4 rounded-full bg-[#0E1624] border border-[#2A3B4D]
                       text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Send OTP
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

export default ForgotPasswordPage;