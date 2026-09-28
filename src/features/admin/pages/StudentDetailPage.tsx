import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "@/store/store";
import { useConfirm } from "@/components/common/confirm-modal/ConfirmModalContext";
import {
  getStudentById,
  suspendStudentAction,
  activateStudentAction,
  clearSelectedStudent,
} from "../redux/student.slice";

const statusStyles: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  deleted: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const {
    selectedStudent: student,
    selectedLoading,
    selectedError,
    actionLoading,
  } = useSelector((state: RootState) => state.adminStudents);

  useEffect(() => {
    if (id) dispatch(getStudentById(id));
    return () => {
      dispatch(clearSelectedStudent());
    };
  }, [dispatch, id]);

  const studentInitials = encodeURIComponent(
    `${student?.firstName || "S"} ${student?.lastName || "T"}`,
  );
  const defaultAvatar = `https://ui-avatars.com/api/?name=${studentInitials}&background=24A163&color=fff&bold=true`;

  const handleSuspend = async (): Promise<void> => {
    if (!student) return;

    const confirmed = await confirm({
      title: "Suspend Student",
      message: "Are you sure you want to suspend this student?",
      confirmLabel: "Suspend",
      variant: "warning",
    });

    if (!confirmed) return;

    const result = await dispatch(suspendStudentAction(student.id));
    if (suspendStudentAction.fulfilled.match(result)) {
      toast.success("Student suspended successfully");
    } else {
      toast.error((result.payload as string) || "Failed to suspend student");
    }
  };

  const handleActivate = async (): Promise<void> => {
    if (!student) return;

    const confirmed = await confirm({
      title: "Activate Student",
      message: "Are you sure you want to activate this student?",
      confirmLabel: "Activate",
      variant: "success",
    });

    if (!confirmed) return;

    const result = await dispatch(activateStudentAction(student.id));
    if (activateStudentAction.fulfilled.match(result)) {
      toast.success("Student activated successfully");
    } else {
      toast.error((result.payload as string) || "Failed to activate student");
    }
  };

  if (selectedLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-400">Loading student...</p>
      </div>
    );
  }

  if (selectedError || !student) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400">{selectedError || "Student not found"}</p>
        <button
          onClick={() => navigate("/admin/students")}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300
                     hover:bg-slate-700 transition-colors"
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/students")}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Student Details</h1>
          <p className="text-slate-400 text-sm mt-1">
            Joined{" "}
            {new Date(student.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border
                      ${statusStyles[student.status]}`}
        >
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <img
            src={student.profileImage || defaultAvatar}
            alt={student.firstName}
            className="w-20 h-20 rounded-full border border-slate-600 object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== defaultAvatar) {
                target.src = defaultAvatar;
              }
            }}
          />
          <div>
            <p className="text-white text-xl font-semibold">
              {student.firstName} {student.lastName}
            </p>
            <p className="text-slate-400 text-sm mt-0.5">{student.email}</p>
            <p className="text-slate-500 text-xs mt-1">ID: {student.id}</p>
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-500 text-xs mb-1">Last Login</p>
          <p className="text-white font-medium">
            {student.lastLogin
              ? new Date(student.lastLogin).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Never"}
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
          <p className="text-slate-500 text-xs mb-1">Account Status</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border
                        ${statusStyles[student.status]}`}
          >
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      {student.status !== "deleted" && (
        <div className="flex justify-end gap-3 pt-2">
          {student.status === "active" ? (
            <button
              onClick={handleSuspend}
              disabled={!!actionLoading}
              className="px-5 py-2 rounded-xl bg-yellow-500/10 text-yellow-400
                         border border-yellow-500/30 hover:bg-yellow-500/20
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {actionLoading ? "Loading..." : "Suspend Student"}
            </button>
          ) : (
            <button
              onClick={handleActivate}
              disabled={!!actionLoading}
              className="px-5 py-2 rounded-xl bg-green-600 text-white
                         hover:bg-green-500 disabled:opacity-40
                         disabled:cursor-not-allowed transition-colors"
            >
              {actionLoading ? "Loading..." : "Activate Student"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetailPage;