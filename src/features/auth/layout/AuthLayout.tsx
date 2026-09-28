import { Outlet } from "react-router-dom";
import AuthLogo from "../components/AuthLogo";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0E1624] to-[#0F1E2D] p-4">
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10">
        <AuthLogo />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;