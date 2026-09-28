import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store/store";
import DataTable, { type Column } from "@/components/common/table/Table";
import {
  getTutors,
  suspendTutorAction,
  activateTutorAction,
} from "../redux/tutor.slice";
import type { Tutor } from "../types/tutor.types";

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  deleted: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const TutorsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tutors, total, page, totalPages, loading, actionLoading } =
    useSelector((state: RootState) => state.adminTutors);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getTutors({
        page: currentPage,
        limit: 10,
        search,
        status,
        verified: verifiedFilter,
      }),
    );
  }, [dispatch, currentPage, search, status, verifiedFilter]);

  const handleSuspend = async (tutorId: string): Promise<void> => {
    const result = await dispatch(suspendTutorAction(tutorId));
    if (suspendTutorAction.fulfilled.match(result)) {
      toast.success("Tutor suspended successfully");
    } else {
      toast.error((result.payload as string) || "Failed to suspend tutor");
    }
  };

  const handleActivate = async (tutorId: string): Promise<void> => {
    const result = await dispatch(activateTutorAction(tutorId));
    if (activateTutorAction.fulfilled.match(result)) {
      toast.success("Tutor activated successfully");
    } else {
      toast.error((result.payload as string) || "Failed to activate tutor");
    }
  };

  const columns: Column<Tutor>[] = [
    {
      header: "Tutor",
      render: (tutor) => {
        const initials = encodeURIComponent(
          `${tutor.firstName || "T"} ${tutor.lastName || "R"}`,
        );
        const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=24A163&color=fff&bold=true`;

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden bg-slate-800 flex-shrink-0">
              <img
                src={tutor.profileImage || defaultAvatar}
                alt={tutor.firstName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== defaultAvatar) {
                    target.src = defaultAvatar;
                  }
                }}
              />
            </div>
            <div>
              <p className="text-white font-medium">
                {tutor.firstName} {tutor.lastName}
              </p>
              <p className="text-xs text-slate-500">ID: {tutor.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Email",
      render: (tutor) => <span className="text-slate-300">{tutor.email}</span>,
    },
    {
      header: "Courses",
      align: "center",
      render: (tutor) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full
                     text-xs font-medium bg-blue-900/30 text-blue-400
                     border border-blue-800/50"
        >
          {tutor.courseCount ?? 0}
        </span>
      ),
    },
    {
      header: "Rating",
      align: "center",
      render: (tutor) => (
        <div className="flex items-center justify-center gap-1 text-yellow-400">
          <span
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-slate-300 font-medium text-sm">
            {tutor.rating?.toFixed(1) ?? "—"}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      align: "center",
      render: (tutor) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border
                      ${statusStyles[tutor.status]}`}
        >
          {tutor.status.charAt(0).toUpperCase() + tutor.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Verified",
      align: "center",
      render: (tutor) =>
        tutor.isVerified ? (
          <span
            className="inline-flex items-center justify-center h-6 w-6
                       rounded-full bg-green-500/20 text-green-400"
          >
            <span className="material-symbols-outlined text-base">check</span>
          </span>
        ) : (
          <span
            className="inline-flex items-center justify-center h-6 w-6
                       rounded-full bg-slate-700 text-slate-500"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </span>
        ),
    },
    {
      header: "Last Login",
      render: (tutor) =>
        tutor.lastLogin
          ? new Date(tutor.lastLogin).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Never",
    },
    {
      header: "Actions",
      align: "right",
      render: (tutor) => {
        const isLoading = actionLoading === tutor.id;

        return (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(`/admin/tutors/${tutor.id}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         text-xs font-medium bg-slate-700 text-slate-300
                         hover:bg-slate-600 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">person</span>
              View
            </button>

            {tutor.status !== "deleted" && (
              <button
                onClick={() =>
                  tutor.status === "active"
                    ? handleSuspend(tutor.id)
                    : handleActivate(tutor.id)
                }
                disabled={isLoading}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                           text-xs font-medium transition-colors disabled:opacity-40 
                           disabled:cursor-not-allowed border
                           ${
                             tutor.status === "active"
                               ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                               : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                           }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {tutor.status === "active" ? "block" : "check_circle"}
                </span>
                {isLoading
                  ? "..."
                  : tutor.status === "active"
                    ? "Suspend"
                    : "Activate"}
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Tutors
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Total <span className="text-slate-200 font-semibold">{total}</span>{" "}
            tutors registered
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-500 text-lg">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700
                       text-slate-200 placeholder-slate-500 focus:outline-none
                       focus:border-cyan-500 transition-all shadow-sm"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700
                     text-slate-200 focus:outline-none focus:border-cyan-500
                     transition-all cursor-pointer shadow-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="deleted">Deleted</option>
        </select>

        <select
          value={verifiedFilter}
          onChange={(e) => {
            setVerifiedFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700
                     text-slate-200 focus:outline-none focus:border-cyan-500
                     transition-all cursor-pointer shadow-sm"
        >
          <option value="">All Verification</option>
          <option value="true">Verified Only</option>
          <option value="false">Not Verified</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden shadow-sm">
        <DataTable
          data={tutors}
          columns={columns}
          loading={loading}
          emptyMessage="No tutors found matching your filters"
        />
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-400 mt-2">
          <span>
            Page <span className="text-slate-200">{page}</span> of{" "}
            <span className="text-slate-200">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700
                         hover:bg-slate-700 hover:text-white disabled:opacity-40
                         disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700
                         hover:bg-slate-700 hover:text-white disabled:opacity-40
                         disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Next
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorsPage;