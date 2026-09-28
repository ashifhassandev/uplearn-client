import { useLogout } from "@/hooks/useLogout";
import { useConfirm } from "../common/confirm-modal/ConfirmModalContext";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", path: "/tutor/dashboard" },
  { icon: "school", label: "My Courses", path: "/tutor/courses" },
  { icon: "slideshow", label: "My Sessions", path: "/tutor/sessions" },
  {
    icon: "event_available",
    label: "Availability",
    path: "/tutor/availability",
  },
  { icon: "payments", label: "Earnings & Payouts", path: "/tutor/earnings" },
  { icon: "reviews", label: "Reviews", path: "/tutor/reviews" },
  { icon: "account_circle", label: "My Profile", path: "/tutor/profile" },
  { icon: "settings", label: "Settings", path: "/tutor/settings" },
];

const Sidebar = (): React.JSX.Element => {
  const confirm = useConfirm();
  const { handleLogout } = useLogout();
  const { pathname } = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 bg-white/5 dark:bg-slate-900/50 p-6 hidden lg:flex flex-col">
      {/* ── Nav items ── */}
      <nav className="flex flex-col space-y-1 flex-1">
        {navItems.map((item: NavItem) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary font-semibold"
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      <div className="flex-shrink-0 border-t border-slate-800/50 pt-4">
        <button
          onClick={async () => {
            const confirmed = await confirm({
              title: "Log out of UpLearn?",
              message: "You can always log back in at any time.",
              confirmLabel: "Logout",
              variant: "warning",
            });

            if (!confirmed) return;
            handleLogout();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                     text-red-400 hover:bg-red-500/10 hover:text-red-300
                     transition-colors group"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            logout
          </span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;