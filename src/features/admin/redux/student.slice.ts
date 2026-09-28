import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchStudents,
  fetchStudentById,
  suspendStudent,
  activateStudent,
  deleteStudent,
} from "../api/student.api";
import type { Student, StudentDetail } from "../types/student.types";

type StudentState = {
  students: Student[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  actionLoading: string | null;
  error: string | null;

  selectedStudent: StudentDetail | null;
  selectedLoading: boolean;
  selectedError: string | null;
};

const initialState: StudentState = {
  students: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  actionLoading: null,
  error: null,

  selectedStudent: null,
  selectedLoading: false,
  selectedError: null,
};

export const getStudents = createAsyncThunk(
  "admin/getStudents",
  async (
    params: { page: number; limit: number; search: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      return await fetchStudents(
        params.page,
        params.limit,
        params.search,
        params.status,
      );
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch students",
      );
    }
  },
);

export const getStudentById = createAsyncThunk(
  "admin/getStudentById",
  async (studentId: string, { rejectWithValue }) => {
    try {
      return await fetchStudentById(studentId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch student",
      );
    }
  },
);

export const suspendStudentAction = createAsyncThunk(
  "admin/suspendStudent",
  async (userId: string, { rejectWithValue }) => {
    try {
      await suspendStudent(userId);
      return userId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to suspend student",
      );
    }
  },
);

export const activateStudentAction = createAsyncThunk(
  "admin/activateStudent",
  async (userId: string, { rejectWithValue }) => {
    try {
      await activateStudent(userId);
      return userId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to activate student",
      );
    }
  },
);

export const deleteStudentAction = createAsyncThunk(
  "admin/deleteStudent",
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteStudent(userId);
      return userId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete student",
      );
    }
  },
);

const studentSlice = createSlice({
  name: "adminStudents",
  initialState,
  reducers: {
    clearSelectedStudent(state) {
      state.selectedStudent = null;
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Students
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Student By ID
      .addCase(getStudentById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedStudent = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload as string;
      })

      // Suspend Student
      .addCase(suspendStudentAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(suspendStudentAction.fulfilled, (state, action) => {
        state.actionLoading = null;
        const student = state.students.find((s) => s.id === action.payload);
        if (student) student.status = "suspended";
        if (state.selectedStudent?.id === action.payload) {
          state.selectedStudent.status = "suspended";
        }
      })
      .addCase(suspendStudentAction.rejected, (state) => {
        state.actionLoading = null;
      })

      // Activate Student
      .addCase(activateStudentAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(activateStudentAction.fulfilled, (state, action) => {
        state.actionLoading = null;
        const student = state.students.find((s) => s.id === action.payload);
        if (student) student.status = "active";
        if (state.selectedStudent?.id === action.payload) {
          state.selectedStudent.status = "active";
        }
      })
      .addCase(activateStudentAction.rejected, (state) => {
        state.actionLoading = null;
      })

      // Delete Student
      .addCase(deleteStudentAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(deleteStudentAction.fulfilled, (state, action) => {
        state.actionLoading = null;
        const student = state.students.find((s) => s.id === action.payload);
        if (student) student.status = "deleted";
        if (state.selectedStudent?.id === action.payload) {
          state.selectedStudent.status = "deleted";
        }
      })
      .addCase(deleteStudentAction.rejected, (state) => {
        state.actionLoading = null;
      });
  },
});

export const { clearSelectedStudent } = studentSlice.actions;
export default studentSlice.reducer;