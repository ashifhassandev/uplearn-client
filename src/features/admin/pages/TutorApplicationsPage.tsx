import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store/store";
import DataTable, { type Column } from "@/components/common/table/Table";
import { getApplications } from "../redux/tutor-application.slice";
import type { Application } from "../types/application.types";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const TutorApplicationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { applications, total, page, totalPages, loading } = useSelector(
    (state: RootState) => state.adminTutorApplications,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      getApplications({
        page: currentPage,
        limit: 10,
        search,
        status,
      }),
    );
  }, [dispatch, currentPage, search, status]);

  const columns: Column<Application>[] = [
    {
      header: "Applicant",
      render: (app) => (
        <div className="flex items-center gap-3">
          <img
            src={app.profileImage || "/default-avatar.png"}
            alt={app.firstName}
            className="w-10 h-10 rounded-full border border-slate-600 object-cover"
          />
          <div>
            <p className="text-white font-medium">
              {app.firstName} {app.lastName}
            </p>
            <p className="text-xs text-slate-500">{app.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Headline",
      render: (app) => (
        <span className="text-slate-300 text-sm">{app.headline ?? "—"}</span>
      ),
    },
    {
      header: "Status",
      align: "center",
      render: (app) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
                      ${statusStyles[app.applicationStatus]}`}
        >
          {app.applicationStatus.charAt(0).toUpperCase() +
            app.applicationStatus.slice(1)}
        </span>
      ),
    },
    {
      header: "Applied On",
      render: (app) =>
        new Date(app.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
    {
      header: "Actions",
      align: "right",
      render: (app) => (
        <button
          onClick={() => navigate(`/admin/tutor-applications/${app.id}`)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                     bg-slate-700 text-slate-300 hover:bg-slate-600
                     hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-base">
            visibility
          </span>
          View
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tutor Applications</h1>
          <p className="text-slate-400 text-sm mt-1">
            Total {total} application{total !== 1 ? "s" : ""}
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
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800
                       border border-slate-700 text-slate-200
                       placeholder-slate-500 focus:outline-none
                       focus:border-cyan-500 transition-colors"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                     text-slate-200 focus:outline-none focus:border-cyan-500
                     transition-colors"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-slate-700/50 overflow-hidden">
        <DataTable
          data={applications}
          columns={columns}
          loading={loading}
          emptyMessage="No applications found"
        />
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                         hover:bg-slate-700 disabled:opacity-40
                         disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                         hover:bg-slate-700 disabled:opacity-40
                         disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorApplicationsPage;