import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getStudentProfile } from "../redux/profile.slice";
import PageLoader from "@/components/PageLoader";

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  deleted: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const roleStyles: Record<string, string> = {
  student: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  tutor: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  admin: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const StudentProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.studentProfile,
  );

  const initials = encodeURIComponent(
    `${profile?.firstName || "S"} ${profile?.lastName || "U"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=24A163&color=fff&bold=true`;

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <PageLoader />
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-2xl">
          <p className="text-red-400 font-medium">
            {error || "Profile not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your account settings and view your activity.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full border-2 border-slate-600 overflow-hidden bg-slate-800 shadow-inner">
              <img
                src={profile.profileImage || defaultAvatar}
                alt={profile.firstName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== defaultAvatar) {
                    target.src = defaultAvatar;
                  }
                }}
              />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <p className="text-white text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-slate-400 font-medium">{profile.email}</p>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border
                            ${roleStyles[profile.role] ?? ""}`}
              >
                {profile.role}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border
                            ${statusStyles[profile.status] ?? ""}`}
              >
                {profile.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-slate-500">
              login
            </span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Last Login
            </p>
          </div>
          <p className="text-white font-semibold text-lg">
            {profile.lastLogin
              ? new Date(profile.lastLogin).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Never"}
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-slate-500">
              calendar_today
            </span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Member Since
            </p>
          </div>
          <p className="text-white font-semibold text-lg">
            {new Date(profile.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* FOOTER ACTION (OPTIONAL) */}
      <div className="flex justify-end pt-4">
        <button className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-base">edit</span>
          Request Profile Update
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;