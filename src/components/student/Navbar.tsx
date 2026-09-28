import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Dropdown from "@/components/common/dropdown/Dropdown";
import DropdownTrigger from "@/components/common/dropdown/DropdownTrigger";
import DropdownContent from "@/components/common/dropdown/DropdownContent";
import DropdownItem from "@/components/common/dropdown/DropdownItem";
import { useConfirm } from "@/components/common/confirm-modal/ConfirmModalContext";
import { useLogout } from "@/hooks/useLogout";
import type { RootState } from "@/store/store";

type ApplicationStatus = "pending" | "approved" | "rejected";

const Navbar = () => {
  const confirm = useConfirm();
  const { handleLogout } = useLogout();
  const user = useSelector((state: RootState) => state.auth.user);
  const userInitials = `${user?.firstName || "U"}+${user?.lastName || "L"}`;
  const defaultAvatar = `https://ui-avatars.com/api/?name=${userInitials}&background=24A163&color=fff&bold=true`;
  const applicationStatus = user?.applicationStatus as ApplicationStatus | null;

  const getTeachRoute = () => {
    if (!applicationStatus) return "/tutor/onboarding";

    if (applicationStatus === "pending" || applicationStatus === "rejected") {
      return "/tutor/application-status";
    }

    if (applicationStatus === "approved") {
      return "/tutor/dashboard";
    }

    return "/tutor/onboarding";
  };

  const teachRoute = getTeachRoute();

  const profileImage = user?.profileImage
    ? user.profileImage.replace("=s96-c", "=s200-c")
    : defaultAvatar;

  console.log("USER IMAGE:", profileImage);

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
    <header className="sticky top-0 z-50 bg-[#0E1624]/95 backdrop-blur-sm border-b border-[#1F2E3B]">
      <div className="px-6 lg:px-10 py-3 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-4xl text-primary">
              school
            </span>
            <h2 className="text-xl font-bold font-display">UpLearn</h2>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-white hover:text-primary text-sm font-medium transition-colors"
            >
              Courses
            </Link>

            <Link
              to="/live"
              className="text-white hover:text-primary text-sm font-medium transition-colors"
            >
              Live Sessions
            </Link>

            <Link
              to="/community"
              className="text-white hover:text-primary text-sm font-medium transition-colors"
            >
              Community
            </Link>

            <Link
              to="/offers"
              className="text-white hover:text-primary text-sm font-medium transition-colors"
            >
              Offers
            </Link>

            {/* ✅ FIXED LINK */}
            <Link
              to={teachRoute}
              className="flex items-center gap-1.5 text-primary hover:text-primary/80
                         text-sm font-semibold transition-colors border-l
                         border-[#1F2E3B] pl-6"
            >
              <span className="material-symbols-outlined text-base">
                cast_for_education
              </span>
              Teach on UpLearn
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-[#111A24] rounded-lg h-10 px-3 min-w-[240px] border border-[#1F2E3B]">
            <span className="material-symbols-outlined text-[#a0b6ab] text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-white placeholder-[#a0b6ab] w-full ml-2"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg hover:bg-[#16202C]">
              <span className="material-symbols-outlined text-white">
                favorite
              </span>
            </button>

            <button className="relative w-10 h-10 rounded-lg hover:bg-[#16202C]">
              <span className="material-symbols-outlined text-white">
                shopping_cart
              </span>
            </button>

            <button className="relative w-10 h-10 rounded-lg hover:bg-[#16202C]">
              <span className="material-symbols-outlined text-white">
                notifications
              </span>
            </button>

            {/* Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <div className="w-10 h-10 rounded-full border-2 border-[#1F2E3B] overflow-hidden cursor-pointer">
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== defaultAvatar) {
                        target.src = defaultAvatar;
                      }
                    }}
                  />
                </div>
              </DropdownTrigger>

              <DropdownContent>
                <div className="px-4 py-3 border-b border-[#1F2E3B]">
                  <p className="text-sm font-semibold text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    {user?.role}
                  </p>
                </div>

                <Link to="/profile">
                  <DropdownItem>
                    <span className="material-symbols-outlined">person</span>
                    Profile
                  </DropdownItem>
                </Link>

                <Link to="/settings">
                  <DropdownItem>
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                  </DropdownItem>
                </Link>

                {/* ✅ ALSO FIXED HERE */}
                <div className="h-px bg-[#1F2E3B]" />
                <Link to={teachRoute}>
                  <DropdownItem>
                    <span className="material-symbols-outlined">
                      cast_for_education
                    </span>
                    Teach on UpLearn
                  </DropdownItem>
                </Link>

                <div className="h-px bg-[#1F2E3B]" />

                <DropdownItem onClick={onLogout} danger>
                  <span className="material-symbols-outlined">logout</span>
                  Logout
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;