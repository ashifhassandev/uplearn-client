import { NavLink } from "react-router-dom";
import { useConfirm } from "../common/confirm-modal/ConfirmModalContext";
import { useLogout } from "@/hooks/useLogout";

interface NavItem {
  icon: string;
  label: string;
  to: string;
}

interface NavSection {
  heading?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [{ icon: "dashboard", label: "Dashboard", to: "/admin/dashboard" }],
  },
  {
    heading: "User Management",
    items: [
      { icon: "group", label: "Users / Students", to: "/admin/students" },
      { icon: "cast_for_education", label: "Tutors", to: "/admin/tutors" },
      {
        icon: "assignment",
        label: "Applications",
        to: "/admin/tutor-applications",
      },
    ],
  },
  {
    heading: "Content Management",
    items: [
      { icon: "menu_book", label: "Courses", to: "/admin/courses" },
      { icon: "category", label: "Categories", to: "/admin/categories" },
      { icon: "article", label: "Lessons", to: "/admin/lessons" },
      { icon: "video_library", label: "Media Library", to: "/admin/media" },
    ],
  },
  {
    heading: "Live & Sessions",
    items: [
      { icon: "live_tv", label: "Live Sessions", to: "/admin/live-sessions" },
      {
        icon: "schedule",
        label: "Availability Rules",
        to: "/admin/availability",
      },
    ],
  },
  {
    heading: "Financials",
    items: [
      { icon: "receipt_long", label: "Orders", to: "/admin/orders" },
      { icon: "payments", label: "Payments", to: "/admin/payments" },
      {
        icon: "account_balance_wallet",
        label: "Platform Wallet",
        to: "/admin/wallet",
      },
      {
        icon: "request_quote",
        label: "Instructor Payouts",
        to: "/admin/payouts",
      },
    ],
  },
  {
    heading: "Growth & Engagement",
    items: [
      { icon: "campaign", label: "Marketing (Offers)", to: "/admin/marketing" },
      {
        icon: "emoji_events",
        label: "Gamification",
        to: "/admin/gamification",
      },
    ],
  },
  {
    heading: "Moderation & Support",
    items: [
      {
        icon: "support_agent",
        label: "Tickets & Complaints",
        to: "/admin/tickets",
      },
      { icon: "rate_review", label: "Reviews", to: "/admin/reviews" },
      { icon: "report", label: "Reports", to: "/admin/reports" },
    ],
  },
  {
    heading: "System",
    items: [
      { icon: "analytics", label: "Analytics & Logs", to: "/admin/analytics" },
      { icon: "settings", label: "Settings", to: "/admin/settings" },
    ],
  },
];

const AdminSidebar = () => {
  const confirm = useConfirm();
  const { handleLogout } = useLogout();

  return (
    <aside className="w-72 flex-shrink-0 bg-white/5 dark:bg-slate-900/50 hidden lg:flex flex-col border-r border-slate-800/50 overflow-y-auto custom-scrollbar h-full">
      <nav className="flex-1 px-4 py-6 space-y-8">
        {navSections.map((section, i) => (
          <div key={i} className={i === navSections.length - 1 ? "pb-6" : ""}>
            {section.heading && (
              <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {section.heading}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-3 px-4 py-2 rounded-xl bg-primary/20 text-primary font-semibold border border-primary/30"
                      : "flex items-center space-x-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group"
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`material-symbols-outlined ${!isActive ? "group-hover:text-primary transition-colors" : ""}`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Logout ── */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-slate-800/50">
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

export default AdminSidebar;