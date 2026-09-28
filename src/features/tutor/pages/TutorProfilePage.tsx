import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchTutorProfile } from "../redux/profile.slice";
import { fetchCertificateUrl } from "../api/tutor.api";
import type { Application } from "@/features/admin/types/application.types";

const Section = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}): React.JSX.Element => (
  <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm">
    {title && (
      <h2 className="text-white font-semibold mb-4 text-lg">{title}</h2>
    )}
    {children}
  </div>
);

const ProfileSkeleton = (): React.JSX.Element => (
  <div className="max-w-3xl mx-auto space-y-6 animate-pulse px-4 py-10">
    <div className="h-8 bg-slate-700 rounded w-48 mb-8" />
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-slate-700" />
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-slate-700 rounded w-40" />
        <div className="h-4 bg-slate-700 rounded w-56" />
      </div>
    </div>
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-3"
      >
        <div className="h-4 bg-slate-700 rounded w-24" />
        <div className="h-4 bg-slate-700 rounded w-full" />
      </div>
    ))}
  </div>
);

const TutorProfilePage = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.tutorProfile,
  );

  const initials = encodeURIComponent(
    `${profile?.firstName || "T"} ${profile?.lastName || "P"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=24A163&color=fff&bold=true`;

  useEffect(() => {
    dispatch(fetchTutorProfile());
  }, [dispatch]);

  const handleView = async (key: string): Promise<void> => {
    try {
      const url = await fetchCertificateUrl(key);
      window.open(url, "_blank");
    } catch {
      toast.error("Failed to open certificate");
    }
  };

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined">error</span>
          <span className="text-sm font-medium">{error}</span>
        </div>
      </div>
    );
  }

  if (!profile) return <></>;

  const { links, certificates } = profile as Application;
  const hasLinks = links?.linkedin || links?.portfolio || links?.github;

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="/tutor/dashboard"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base mr-2">
                home
              </span>
              Dashboard
            </a>
          </li>
          <li aria-current="page" className="flex items-center">
            <span className="material-symbols-outlined text-slate-500 text-sm">
              chevron_right
            </span>
            <span className="ms-1 text-sm font-medium text-slate-200 md:ms-2">
              My Profile
            </span>
          </li>
        </ol>
      </nav>

      {/* Page title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          My Profile
        </h1>
      </div>

      {/* IDENTITY */}
      <Section>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800 flex-shrink-0">
            <img
              src={profile.profileImage || defaultAvatar}
              alt={profile.firstName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== defaultAvatar) {
                  target.src = defaultAvatar;
                }
              }}
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-white text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-slate-400 font-medium">{profile.email}</p>
            {profile.headline && (
              <p className="text-primary/90 text-sm mt-1 font-medium italic">
                "{profile.headline}"
              </p>
            )}

            {hasLinks && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 pt-4 border-t border-slate-700/50">
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      link
                    </span>
                    LinkedIn
                  </a>
                )}
                {links.portfolio && (
                  <a
                    href={links.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      language
                    </span>
                    Portfolio
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      code
                    </span>
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* BIO */}
      {profile.bio && (
        <Section title="Professional Biography">
          <p className="text-slate-400 text-sm leading-relaxed">
            {profile.bio}
          </p>
        </Section>
      )}

      {/* SKILLS */}
      {profile.skills.length > 0 && (
        <Section title="Expertise">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* EXPERIENCE */}
      {profile.experiences.length > 0 && (
        <Section title="Work Experience">
          <div className="space-y-6">
            {profile.experiences.map((exp, i: number) => (
              <div
                key={i}
                className="relative border-l-2 border-slate-700 pl-5 py-1 group"
              >
                <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[7.5px] top-2 group-hover:bg-primary transition-colors" />
                <p className="text-white font-semibold">{exp.role}</p>
                <p className="text-slate-400 text-sm font-medium">
                  {exp.company}
                </p>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">
                  {exp.duration}
                </p>
                {exp.description && (
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed border-t border-slate-700/30 pt-2">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* EDUCATION */}
      {profile.education.length > 0 && (
        <Section title="Education">
          <div className="space-y-4">
            {profile.education.map((edu, i: number) => (
              <div key={i} className="border-l-2 border-primary/30 pl-5 py-1">
                <p className="text-white font-semibold">{edu.degree}</p>
                <p className="text-slate-400 text-sm">{edu.institution}</p>
                <p className="text-slate-500 text-xs mt-1">{edu.year}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CERTIFICATES */}
      {certificates && certificates.length > 0 && (
        <Section title="Verified Certificates">
          <div className="grid grid-cols-1 gap-3">
            {certificates.map((cert, i: number) => {
              const fileName =
                cert?.key?.split("/").pop() || `Certificate ${i + 1}`;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-slate-700/50 rounded-xl bg-slate-900/40 hover:bg-slate-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400 group-hover:scale-110 transition-transform">
                      description
                    </span>
                    <p className="text-white text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
                      {fileName}
                    </p>
                  </div>
                  {cert?.key && (
                    <button
                      onClick={() => handleView(cert.key!)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1"
                    >
                      View{" "}
                      <span className="material-symbols-outlined text-xs">
                        open_in_new
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* REJECTION REASON */}
      {profile.applicationStatus === "rejected" && profile.rejectionReason && (
        <div className="px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 shadow-lg shadow-red-950/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-red-400 text-lg">
              info
            </span>
            <h3 className="text-red-400 font-bold uppercase tracking-wider text-xs">
              Rejection Notice
            </h3>
          </div>
          <p className="text-red-200/80 text-sm leading-relaxed">
            {profile.rejectionReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorProfilePage;