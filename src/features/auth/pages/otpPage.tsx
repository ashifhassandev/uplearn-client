import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import PageLoader from "@/components/PageLoader";

import {
  verifyOtp,
  resetAuthState,
  resendOtp,
} from "@/features/auth/redux/auth.slice";
import type { RootState, AppDispatch } from "@/store/store";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const OtpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success, pendingEmail } = useSelector(
    (state: RootState) => state.auth,
  );

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState<number>(RESEND_COOLDOWN);
  const [resendKey, setResendKey] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Effect only manages the interval subscription — no direct setState in body
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendKey]);

  useEffect(() => {
    if (!pendingEmail) navigate("/signup", { replace: true });
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (success && !pendingEmail) {
      toast.success("Email verified! You can now log in. 🎉", {
        onClose: () => {
          dispatch(resetAuthState());
          navigate("/login");
        },
      });
    }
  }, [success, pendingEmail, navigate, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const focusInput = (index: number) => inputRefs.current[index]?.focus();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    if (value && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0)
      focusInput(index - 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setDigits(pasted.split(""));
      focusInput(OTP_LENGTH - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    dispatch(verifyOtp({ email: pendingEmail!, code }));
  };

  const handleResend = () => {
    if (countdown > 0 || !pendingEmail) return;

    dispatch(resendOtp(pendingEmail));

    setDigits(Array(OTP_LENGTH).fill(""));
    setCountdown(RESEND_COOLDOWN);
    setResendKey((k) => k + 1);

    toast.info("A new OTP has been sent to your email.");
    focusInput(0);
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Verify your email"
        subtitle={`Enter the 6-digit code sent to ${pendingEmail ?? "your email"}.`}
      />

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <PageLoader />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="flex justify-center gap-2 sm:gap-3"
            onPaste={handlePaste}
          >
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-12 text-center text-xl font-bold rounded-lg
                           bg-[#0B121C] border border-slate-700 text-white
                           focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Verify
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-slate-400">
        {countdown > 0 ? (
          <p>
            Resend OTP in{" "}
            <span className="text-primary font-semibold tabular-nums">
              {String(Math.floor(countdown / 60)).padStart(2, "0")}:
              {String(countdown % 60).padStart(2, "0")}
            </span>
          </p>
        ) : (
          <p>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:underline"
            >
              Resend OTP
            </button>
          </p>
        )}
      </div>
    </AuthCard>
  );
};

export default OtpPage;