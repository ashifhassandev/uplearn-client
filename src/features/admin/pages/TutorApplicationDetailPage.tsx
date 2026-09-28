import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store/store";
import {
  getApplicationById,
  getCertificateUrl,
  approveApplicationAction,
  rejectApplicationAction,
  clearSelectedApplication,
} from "../redux/tutor-application.slice";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const TutorApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    selectedApplication: app,
    selectedLoading,
    selectedError,
    actionLoading,
  } = useSelector((state: RootState) => state.adminTutorApplications);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (id) dispatch(getApplicationById(id));
    return () => {
      dispatch(clearSelectedApplication());
    };
  }, [dispatch, id]);

  const handleView = async (key: string) => {
    try {
      const result = await dispatch(getCertificateUrl(key));

      if (getCertificateUrl.fulfilled.match(result)) {
        const url = result.payload;
        window.open(url, "_blank");
      } else {
        throw new Error(result.payload as string);
      }
    } catch (err) {
      toast.error("Failed to open certificate");
      console.error(err);
    }
  };

  const handleApprove = async (): Promise<void> => {
    if (!app) return;
    const result = await dispatch(approveApplicationAction(app.id));
    if (approveApplicationAction.fulfilled.match(result)) {
      toast.success("Application approved successfully");
    } else {
      toast.error(
        (result.payload as string) || "Failed to approve application",
      );
    }
  };

  const handleReject = async (): Promise<void> => {
    if (!app || !rejectReason.trim()) return;
    const result = await dispatch(
      rejectApplicationAction({
        applicationId: app.id,
        reason: rejectReason.trim(),
      }),
    );
    if (rejectApplicationAction.fulfilled.match(result)) {
      toast.success("Application rejected");
      setRejectModalOpen(false);
      setRejectReason("");
    } else {
      toast.error((result.payload as string) || "Failed to reject application");
    }
  };

  if (selectedLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Loading application...</p>
      </div>
    );
  }

  if (selectedError || !app) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400">
          {selectedError || "Application not found"}
        </p>
        <button
          onClick={() => navigate("/admin/tutor-applications")}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/tutor-applications")}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Application Details</h1>
          <p className="text-slate-400 text-sm mt-1">
            Submitted on{" "}
            {new Date(app.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[app.applicationStatus]}`}
        >
          {app.applicationStatus.charAt(0).toUpperCase() +
            app.applicationStatus.slice(1)}
        </span>
      </div>

      {/* APPLICANT */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <img
            src={app.profileImage || "/default-avatar.png"}
            alt={app.firstName}
            className="w-16 h-16 rounded-full border border-slate-600 object-cover"
          />
          <div>
            <p className="text-white text-xl font-semibold">
              {app.firstName} {app.lastName}
            </p>
            <p className="text-slate-400 text-sm">{app.email}</p>
            {app.headline && (
              <p className="text-slate-500 text-sm mt-1">{app.headline}</p>
            )}
          </div>
        </div>

        {(app.links.linkedin || app.links.portfolio || app.links.github) && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-slate-700">
            {app.links.linkedin && (
              <a
                href={app.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:underline text-sm"
              >
                <span className="material-symbols-outlined text-base">
                  link
                </span>
                LinkedIn
              </a>
            )}

            {app.links.portfolio && (
              <a
                href={app.links.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:underline text-sm"
              >
                <span className="material-symbols-outlined text-base">
                  language
                </span>
                Portfolio
              </a>
            )}

            {app.links.github && (
              <a
                href={app.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:underline text-sm"
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

      {/* BIO */}
      {app.bio && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-3">Bio</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{app.bio}</p>
        </div>
      )}

      {/* SKILLS */}
      {app.skills.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {app.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400 border border-blue-800/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {app.experiences.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            {app.experiences.map((exp, i: number) => (
              <div key={i} className="border-l-2 border-slate-600 pl-4">
                <p className="text-white font-medium">{exp.role}</p>
                <p className="text-slate-400 text-sm">{exp.company}</p>
                <p className="text-slate-500 text-xs mt-0.5">{exp.duration}</p>
                {exp.description && (
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {app.education.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {app.education.map((edu, i: number) => (
              <div key={i} className="border-l-2 border-slate-600 pl-4">
                <p className="text-white font-medium">{edu.degree}</p>
                <p className="text-slate-400 text-sm">{edu.institution}</p>
                <p className="text-slate-500 text-xs mt-0.5">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {app.certificates?.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Certificates</h2>

          <div className="space-y-3">
            {app.certificates.map((cert, i: number) => {
              const fileName =
                cert?.key?.split("/").pop() || `Certificate ${i + 1}`;

              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-xl bg-[#0E1624]"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">
                      description
                    </span>

                    <p className="text-white text-sm">{fileName}</p>
                  </div>

                  {cert?.key && (
                    <button
                      onClick={() => handleView(cert.key!)}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      View
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* REJECTION */}
      {app.applicationStatus === "rejected" && app.rejectionReason && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30">
          <h3 className="text-red-400 font-semibold mb-1 text-sm">
            Rejection Reason
          </h3>
          <p className="text-red-300 text-sm">{app.rejectionReason}</p>
        </div>
      )}

      {/* ACTIONS */}
      {app.applicationStatus === "pending" && (
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setRejectModalOpen(true)}
            disabled={!!actionLoading}
            className="px-5 py-2 rounded-xl bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 disabled:opacity-40"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            disabled={!!actionLoading}
            className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-500 disabled:opacity-40"
          >
            {actionLoading ? "Approving..." : "Approve"}
          </button>
        </div>
      )}

      {/* MODAL */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setRejectModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-[#0E1624] border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-2">
              Reject Application
            </h2>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button onClick={handleReject}>
                {actionLoading ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorApplicationDetailPage;