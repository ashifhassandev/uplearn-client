import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useConfirm } from "@/components/common/confirm-modal/ConfirmModalContext";
import { useLogout } from "@/hooks/useLogout";
import type { RootState } from "@/store/store";

const Navbar = (): React.JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const confirm = useConfirm();
  const { handleLogout } = useLogout();

  const userInitials = encodeURIComponent(
    `${user?.firstName || "U"} ${user?.lastName || "L"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userInitials}&background=24A163&color=fff&bold=true`;

  const onLogout = async (): Promise<void> => {
    const confirmed = await confirm({
      title: "Log out of UpLearn?",
      message: "You can always log back in at any time.",
      confirmLabel: "Logout",
      variant: "warning",
    });
    if (!confirmed) return;
    handleLogout();
  };

  return (
    <>
      <header className="flex-shrink-0 bg-white/5 dark:bg-slate-900/50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left — logo + nav */}
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <img
                  alt="UpLearn Logo"
                  className="h-10 w-auto"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRWzc6pv1QQ4N5WjquqHTS8Z7E9kDsyQtZ2_guzvljpUz7nde60C1LbJOhcg9wdzfMN8zvpz7QT_sn0d2h8fPpUxbPn9PvvI4HphwyL52aW3MxFDLYNwR4l4Fu2s_e-Q-PMEj99L_sCPUswxfAxbb50XXpBDNUZDENDqabB5iRCvGwMnZf1KpwVOV_kreE3u4ghxI5QsuBrZUPRGbPEH7lIRn2XF5LV3kmq_f2FDEaFMlSk10u3CyLP1jkeJHAmEPT8Q2PDKQRPBV3"
                />
              </div>
              <nav className="hidden md:flex items-baseline space-x-6">
                <Link
                  to="/tutor/courses"
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300
                             hover:text-primary transition-colors"
                >
                  Courses
                </Link>
                <Link
                  to="/tutor/live"
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300
                             hover:text-primary transition-colors"
                >
                  Live Sessions
                </Link>
              </nav>
            </div>

            {/* Right — search, notifications, profile */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                aria-label="Search"
              >
                <span className="material-symbols-outlined text-slate-300">
                  search
                </span>
              </button>

              <button
                className="p-2 rounded-full hover:bg-slate-800 transition-colors relative"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-slate-300">
                  notifications
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-slate-700/50">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    {user?.role}
                  </p>
                </div>

                <div className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden">
                  <img
                    alt="Tutor profile"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                    src={user?.profileImage || defaultAvatar}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== defaultAvatar) {
                        target.src = defaultAvatar;
                      }
                    }}
                  />
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                  aria-label="Logout"
                >
                  <span className="material-symbols-outlined text-slate-400 hover:text-red-400 transition-colors">
                    logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <hr className="border-slate-800" />
    </>
  );
};

export default Navbar;