import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const AdminNavbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userInitials = encodeURIComponent(
    `${user?.firstName || "A"} ${user?.lastName || "Admin"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userInitials}&background=24A163&color=fff&bold=true`;

  return (
    <header className="flex-shrink-0 bg-white/5 dark:bg-slate-900/80 backdrop-blur-md z-40 sticky top-0 border-b border-slate-700/50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left — logo + mobile menu */}
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white lg:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-3">
              <img
                alt="UpLearn Logo"
                className="h-9 w-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRWzc6pv1QQ4N5WjquqHTS8Z7E9kDsyQtZ2_guzvljpUz7nde60C1LbJOhcg9wdzfMN8zvpz7QT_sn0d2h8fPpUxbPn9PvvI4HphwyL52aW3MxFDLYNwR4l4Fu2s_e-Q-PMEj99L_sCPUswxfAxbb50XXpBDNUZDENDqabB5iRCvGwMnZf1KpwVOV_kreE3u4ghxI5QsuBrZUPRGbPEH7lIRn2XF5LV3kmq_f2FDEaFMlSk10u3CyLP1jkeJHAmEPT8Q2PDKQRPBV3"
              />
              <span className="hidden sm:block h-6 w-px bg-slate-700" />
              <span className="hidden sm:block text-lg font-semibold text-white tracking-tight">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Center — global search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-500">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl leading-5
                           bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none
                           focus:bg-slate-800 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Global Search (User / Course / Order / Ticket)..."
                type="text"
              />
            </div>
          </div>

          {/* Right — notifications + profile */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-slate-800 transition-colors relative">
              <span className="material-symbols-outlined text-slate-300">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-slate-900" />
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-700/50">
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
                  alt="Admin profile"
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;