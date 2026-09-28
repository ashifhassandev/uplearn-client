import FooterLinks from "@/shared/footer/FooterLinks";
import FooterSupport from "@/shared/footer/FooterSupport";
import FooterSocial from "@/shared/footer/FooterSocial";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* LEFT (LOGO + DESC) */}
          <div className="lg:col-span-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRWzc6pv1QQ4N5WjquqHTS8Z7E9kDsyQtZ2_guzvljpUz7nde60C1LbJOhcg9wdzfMN8zvpz7QT_sn0d2h8fPpUxbPn9PvvI4HphwyL52aW3MxFDLYNwR4l4Fu2s_e-Q-PMEj99L_sCPUswxfAxbb50XXpBDNUZDENDqabB5iRCvGwMnZf1KpwVOV_kreE3u4ghxI5QsuBrZUPRGbPEH7lIRn2XF5LV3kmq_f2FDEaFMlSk10u3CyLP1jkeJHAmEPT8Q2PDKQRPBV3"
              alt="UpLearn Logo"
              className="h-10 mb-4"
            />

            <p className="text-slate-400 max-w-md">
              UpLearn is your gateway to mastering new skills, with a vast
              library of courses taught by industry experts.
            </p>
          </div>

          {/* LINKS */}
          <FooterLinks />

          {/* SUPPORT */}
          <FooterSupport />

          {/* SOCIAL */}
          <FooterSocial />
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-slate-400">© 2024 UpLearn. All Rights Reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;