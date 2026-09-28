import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom"; // ← add useSearchParams
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import { PasswordInput } from "../components/passwordInput";
import SocialAuthButtons from "../components/SocialButtons";
import PageLoader from "@/components/PageLoader";

import { login, resetAuthState } from "@/features/auth/redux/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

interface FormErrors {
  email?: string;
  password?: string;
}

const validateForm = (data: {
  email: string;
  password: string;
}): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";

  if (!data.password) errors.password = "Password is required.";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  return errors;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ← add this

  const { loading, error, success, user } = useSelector(
    (state: RootState) => state.auth,
  );

  // ← Add this — shows error from Google OAuth redirect
  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError) {
      toast.error(decodeURIComponent(oauthError));
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (success && user) {
      toast.success(`Welcome back, ${user.firstName}! 🎉`);
      dispatch(resetAuthState());

      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "tutor") navigate("/tutor/home");
      else navigate("/");
    }
  }, [success, user, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    dispatch(login(formData));
  };

  return (
    <>
      {loading && <PageLoader />}
      <AuthCard>
        <AuthHeader
          title="Welcome back!"
          subtitle="Start your learning journey today and achieve your goals with ease."
        />

        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`w-full px-5 py-4 rounded-full bg-[#0E1624] border
                          text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2
                          ${
                            formErrors.email
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#2A3B4D] focus:ring-primary"
                          }`}
              />
              {formErrors.email && (
                <p className="text-red-400 text-xs px-4">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                error={formErrors.password}
              />
            </div>

            <div className="flex justify-between text-sm text-slate-400">
              <Link to="/forgot-password" className="hover:text-primary">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </form>
        </div>

        <div className="my-6 flex items-center gap-4 text-slate-400 text-sm">
          <div className="flex-1 h-px bg-[#2A3B4D]" />
          <span>or</span>
          <div className="flex-1 h-px bg-[#2A3B4D]" />
        </div>

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </AuthCard>
    </>
  );
};

export default LoginPage;