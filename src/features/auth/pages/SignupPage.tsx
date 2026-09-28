import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import { PasswordInput } from "../components/passwordInput";
import SocialAuthButtons from "../components/SocialButtons";
import PageLoader from "@/components/PageLoader";

import { signup, resetAuthState } from "@/features/auth/redux/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const validateForm = (data: typeof initialFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";

  if (!data.lastName.trim()) errors.lastName = "Last name is required.";

  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";

  if (!data.password) errors.password = "Password is required.";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  if (!data.confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
};

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success, pendingEmail } = useSelector(
    (state: RootState) => state.auth,
  );

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (success && pendingEmail) {
      navigate("/verify-otp");
    }
  }, [success, pendingEmail, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for this field as the user types
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
    dispatch(signup(formData));
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        subtitle="Join now and start learning without limits."
      />

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <PageLoader />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={`w-full px-5 py-4 rounded-full bg-[#0E1624] border
                          text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2
                          ${
                            formErrors.firstName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#2A3B4D] focus:ring-primary"
                          }`}
            />
            {formErrors.firstName && (
              <p className="text-red-400 text-xs px-4">
                {formErrors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className={`w-full px-5 py-4 rounded-full bg-[#0E1624] border
                          text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2
                          ${
                            formErrors.lastName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-[#2A3B4D] focus:ring-primary"
                          }`}
            />
            {formErrors.lastName && (
              <p className="text-red-400 text-xs px-4">{formErrors.lastName}</p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={formErrors.password}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              error={formErrors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Create Account
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
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
};

export default SignupPage;