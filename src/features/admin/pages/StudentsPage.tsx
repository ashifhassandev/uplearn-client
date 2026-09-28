import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store/store";
import { useConfirm } from "@/components/common/confirm-modal/ConfirmModalContext";
import DataTable, { type Column } from "@/components/common/table/Table";
import {
  getStudents,
  suspendStudentAction,
  activateStudentAction,
} from "../redux/student.slice";
import type { Student } from "../types/student.types";

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  deleted: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const StudentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { students, total, page, totalPages, loading, actionLoading } =
    useSelector((state: RootState) => state.adminStudents);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getStudents({ page: currentPage, limit: 10, search, status }));
  }, [dispatch, currentPage, search, status]);

  const handleSuspend = async (userId: string): Promise<void> => {
    const result = await dispatch(suspendStudentAction(userId));
    if (suspendStudentAction.fulfilled.match(result)) {
      toast.success("Student suspended successfully");
    } else {
      toast.error((result.payload as string) || "Failed to suspend student");
    }
  };

  const handleActivate = async (userId: string): Promise<void> => {
    const result = await dispatch(activateStudentAction(userId));
    if (activateStudentAction.fulfilled.match(result)) {
      toast.success("Student activated successfully");
    } else {
      toast.error((result.payload as string) || "Failed to activate student");
    }
  };

  const handleStatusChange = async (student: Student) => {
    const isSuspend = student.status === "active";

    const confirmed = await confirm({
      title: isSuspend ? "Suspend Student" : "Activate Student",
      message: isSuspend
        ? "Are you sure you want to suspend this student?"
        : "Are you sure you want to activate this student?",
      confirmLabel: isSuspend ? "Suspend" : "Activate",
      variant: isSuspend ? "warning" : "success",
    });

    if (!confirmed) return;

    if (isSuspend) {
      await handleSuspend(student.id);
    } else {
      await handleActivate(student.id);
    }
  };

  const columns: Column<Student>[] = [
    {
      header: "Student",
      render: (student) => {
        const initials = encodeURIComponent(
          `${student.firstName || "S"} ${student.lastName || "T"}`,
        );
        const defaultAvatar = `https://ui-avatars.com/api/?name=${initials}&background=24A163&color=fff&bold=true`;

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden bg-slate-800 flex-shrink-0">
              <img
                src={student.profileImage || defaultAvatar}
                alt={student.firstName}
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
                {student.firstName} {student.lastName}
              </p>
              <p className="text-xs text-slate-500">ID: {student.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Email",
      render: (student) => (
        <span className="text-slate-300">{student.email}</span>
      ),
    },
    {
      header: "Status",
      align: "center",
      render: (student) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border
                      ${statusStyles[student.status]}`}
        >
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Last Login",
      render: (student) =>
        student.lastLogin
          ? new Date(student.lastLogin).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Never",
    },
    {
      header: "Joined",
      render: (student) =>
        new Date(student.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
    {
      header: "Actions",
      align: "right",
      render: (student) => {
        const isLoading = actionLoading === student.id;

        return (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => navigate(`/admin/students/${student.id}`)}
              className="text-xs px-3 py-1 rounded-full bg-slate-700
                         hover:bg-slate-600 text-slate-300 transition-colors"
            >
              View
            </button>

            {student.status !== "deleted" && (
              <button
                onClick={() => handleStatusChange(student)}
                disabled={isLoading}
                className={`text-xs px-3 py-1 rounded-full transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${
                             student.status === "active"
                               ? "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
                               : "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                           }`}
              >
                {isLoading
                  ? "Loading..."
                  : student.status === "active"
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
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-slate-400 text-sm mt-1">
            Total {total} students registered
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                       text-slate-200 placeholder-slate-500 focus:outline-none
                       focus:border-primary transition-colors"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                     text-slate-200 focus:outline-none focus:border-primary
                     transition-colors cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900/50">
        <DataTable
          data={students}
          columns={columns}
          loading={loading}
          emptyMessage="No students found"
        />
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-400 px-1">
          <span>
            Page <span className="text-white font-medium">{page}</span> of{" "}
            <span className="text-white font-medium">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                         hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors text-slate-300"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700
                         hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors text-slate-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;