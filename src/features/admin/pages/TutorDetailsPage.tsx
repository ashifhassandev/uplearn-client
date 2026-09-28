import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store/store";
import { useConfirm } from "@/components/common/confirm-modal/ConfirmModalContext";

import {
  getTutorById,
  suspendTutorAction,
  activateTutorAction,
  clearSelectedTutor,
} from "../redux/tutor.slice";

import { fetchCertificateUrl } from "@/features/tutor/api/tutor.api";

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
  pending: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-sm">
    {title && (
      <h2 className="text-white font-semibold mb-4 text-lg">{title}</h2>
    )}
    {children}
  </div>
);

const AdminTutorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const {
    selectedTutor: tutor,
    selectedLoading,
    selectedError,
    actionLoading,
  } = useSelector((state: RootState) => state.adminTutors);

  const tutorInitials = encodeURIComponent(
    `${tutor?.firstName || "T"} ${tutor?.lastName || "R"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${tutorInitials}&background=24A163&color=fff&bold=true`;

  useEffect(() => {
    if (id) dispatch(getTutorById(id));

    return () => {
      dispatch(clearSelectedTutor());
    };
  }, [dispatch, id]);

  const handleSuspend = async () => {
    if (!tutor) return;

    const ok = await confirm({
      title: "Suspend Tutor",
      message: "Are you sure you want to suspend this tutor?",
      confirmLabel: "Suspend",
      variant: "warning",
    });

    if (!ok) return;

    const res = await dispatch(suspendTutorAction(tutor.id));

    if (suspendTutorAction.fulfilled.match(res)) {
      toast.success("Tutor suspended successfully");
    } else {
      toast.error("Failed to suspend tutor");
    }
  };

  const handleActivate = async () => {
    if (!tutor) return;

    const ok = await confirm({
      title: "Activate Tutor",
      message: "Activate this tutor and allow them to teach?",
      confirmLabel: "Activate",
      variant: "success",
    });

    if (!ok) return;

    const res = await dispatch(activateTutorAction(tutor.id));

    if (activateTutorAction.fulfilled.match(res)) {
      toast.success("Tutor activated successfully");
    } else {
      toast.error("Failed to activate tutor");
    }
  };

  const handleViewCertificate = async (key: string) => {
    try {
      const url = await fetchCertificateUrl(key);
      window.open(url, "_blank");
    } catch {
      toast.error("Failed to open certificate");
    }
  };

  if (selectedLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400">Loading tutor details...</p>
      </div>
    );
  }

  if (selectedError || !tutor) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400 font-medium">
          {selectedError || "Tutor not found"}
        </p>
        <button
          onClick={() => navigate("/admin/tutors")}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        >
          Back to Tutors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/tutors")}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Tutor Details
          </h1>
          <p className="text-slate-400 text-sm">
            Joined{" "}
            {new Date(tutor.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border uppercase tracking-wider ${statusStyles[tutor.status]}`}
        >
          {tutor.status}
        </span>
      </div>

      {/* PROFILE */}
      <Section>
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
          {/* Avatar with Error Handling */}
          <div className="w-24 h-24 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800 flex-shrink-0">
            <img
              src={tutor.profileImage || defaultAvatar}
              alt={tutor.firstName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== defaultAvatar) {
                  target.src = defaultAvatar;
                }
              }}
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-2xl font-bold">
              {tutor.firstName} {tutor.lastName}
            </p>
            <p className="text-slate-400 font-medium">{tutor.email}</p>
            {tutor.headline && (
              <p className="text-primary/90 text-sm mt-1 font-medium italic">
                "{tutor.headline}"
              </p>
            )}
            <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-semibold">
              Tutor ID: {tutor.id}
            </p>
          </div>
        </div>
      </Section>

      {/* BIO */}
      {tutor.bio && (
        <Section title="Professional Biography">
          <p className="text-slate-400 leading-relaxed">{tutor.bio}</p>
        </Section>
      )}

      {/* SKILLS */}
      {tutor.skills?.length ? (
        <Section title="Skills & Expertise">
          <div className="flex flex-wrap gap-2">
            {tutor.skills.map((s: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      {/* EXPERIENCE */}
      {tutor.experiences?.length ? (
        <Section title="Work Experience">
          <div className="space-y-4">
            {tutor.experiences.map((exp, i: number) => (
              <div key={i} className="border-l-2 border-slate-700 pl-4 py-1">
                <p className="text-white font-semibold">{exp.role}</p>
                <p className="text-slate-400 text-sm">{exp.company}</p>
                <p className="text-xs text-slate-500 mt-1">{exp.duration}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* EDUCATION */}
      {tutor.education?.length ? (
        <Section title="Education">
          <div className="space-y-4">
            {tutor.education.map((edu, i: number) => (
              <div key={i} className="border-l-2 border-primary/30 pl-4 py-1">
                <p className="text-white font-semibold">{edu.degree}</p>
                <p className="text-slate-400 text-sm">{edu.institution}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* CERTIFICATES */}
      {tutor.certificates?.length ? (
        <Section title="Verified Certificates">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tutor.certificates.map((c, i: number) => (
              <button
                key={i}
                onClick={() => handleViewCertificate(c.key)}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
              >
                <span className="material-symbols-outlined text-blue-400">
                  description
                </span>
                <span className="text-slate-300 text-sm group-hover:text-blue-400">
                  View Certificate {i + 1}
                </span>
              </button>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ACTIONS */}
      {tutor.status !== "deleted" && (
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          {tutor.status === "active" ? (
            <button
              onClick={handleSuspend}
              disabled={!!actionLoading}
              className="px-6 py-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
            >
              {actionLoading ? "Processing..." : "Suspend Tutor"}
            </button>
          ) : (
            <button
              onClick={handleActivate}
              disabled={!!actionLoading}
              className="px-6 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
            >
              {actionLoading ? "Processing..." : "Activate Tutor"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTutorDetailPage;