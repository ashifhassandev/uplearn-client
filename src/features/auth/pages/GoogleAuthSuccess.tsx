import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGoogleAuthData } from "@/features/auth/redux/auth.slice";
import type { AppDispatch } from "@/store/store";
import PageLoader from "@/components/PageLoader";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userParam = params.get("user");
    const error = params.get("error");

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (!accessToken || !userParam) {
      navigate("/login?error=google_auth_failed", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam));
      dispatch(setGoogleAuthData({ accessToken, user }));
      navigate("/", { replace: true });
    } catch {
      navigate("/login?error=google_auth_failed", { replace: true });
    }
  }, [dispatch, navigate]);

  return <PageLoader />;
};

export default GoogleAuthSuccess;