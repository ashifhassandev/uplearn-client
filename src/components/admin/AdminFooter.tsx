const AdminFooter = () => {
  return (
    <footer className="mt-auto flex-shrink-0 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 w-full relative border-t border-slate-700/50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            <img
              alt="UpLearn Logo"
              className="h-8 mb-2 opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRWzc6pv1QQ4N5WjquqHTS8Z7E9kDsyQtZ2_guzvljpUz7nde60C1LbJOhcg9wdzfMN8zvpz7QT_sn0d2h8fPpUxbPn9PvvI4HphwyL52aW3MxFDLYNwR4l4Fu2s_e-Q-PMEj99L_sCPUswxfAxbb50XXpBDNUZDENDqabB5iRCvGwMnZf1KpwVOV_kreE3u4ghxI5QsuBrZUPRGbPEH7lIRn2XF5LV3kmq_f2FDEaFMlSk10u3CyLP1jkeJHAmEPT8Q2PDKQRPBV3"
            />
            <p className="text-slate-500">UpLearn Admin Panel v2.4.0</p>
          </div>

          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">
              Help Desk
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              System Status
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          © 2024 UpLearn Inc. Internal use only.
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;