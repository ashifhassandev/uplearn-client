import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTutors,
  fetchTutorById,
  suspendTutor,
  activateTutor,
  deleteTutor,
  verifyTutor,
} from "../api/tutor.api";
import type { Tutor, TutorDetails } from "../types/tutor.types";

type TutorState = {
  tutors: Tutor[];

  total: number;
  page: number;
  totalPages: number;

  loading: boolean;
  error: string | null;

  actionLoading: string | null;

  selectedTutor: TutorDetails | null;
  selectedLoading: boolean;
  selectedError: string | null;
};

const initialState: TutorState = {
  tutors: [],

  total: 0,
  page: 1,
  totalPages: 1,

  loading: false,
  error: null,

  actionLoading: null,

  selectedTutor: null,
  selectedLoading: false,
  selectedError: null,
};

export const getTutors = createAsyncThunk(
  "admin/getTutors",
  async (
    params: {
      page: number;
      limit: number;
      search: string;
      status: string;
      verified: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await fetchTutors(
        params.page,
        params.limit,
        params.search,
        params.status,
        params.verified,
      );
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tutors",
      );
    }
  },
);

export const getTutorById = createAsyncThunk(
  "admin/getTutorById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchTutorById(id);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tutor",
      );
    }
  },
);

export const suspendTutorAction = createAsyncThunk(
  "admin/suspendTutor",
  async (tutorId: string, { rejectWithValue }) => {
    try {
      await suspendTutor(tutorId);
      return tutorId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to suspend tutor",
      );
    }
  },
);

export const activateTutorAction = createAsyncThunk(
  "admin/activateTutor",
  async (tutorId: string, { rejectWithValue }) => {
    try {
      await activateTutor(tutorId);
      return tutorId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to activate tutor",
      );
    }
  },
);

export const deleteTutorAction = createAsyncThunk(
  "admin/deleteTutor",
  async (tutorId: string, { rejectWithValue }) => {
    try {
      await deleteTutor(tutorId);
      return tutorId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete tutor",
      );
    }
  },
);

export const verifyTutorAction = createAsyncThunk(
  "admin/verifyTutor",
  async (tutorId: string, { rejectWithValue }) => {
    try {
      await verifyTutor(tutorId);
      return tutorId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to verify tutor",
      );
    }
  },
);

const adminTutorSlice = createSlice({
  name: "adminTutors",
  initialState,
  reducers: {
    clearSelectedTutor: (state) => {
      state.selectedTutor = null;
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET TUTORS
      .addCase(getTutors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.tutors = action.payload.tutors;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET TUTOR BY ID
      .addCase(getTutorById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(getTutorById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedTutor = action.payload;
      })
      .addCase(getTutorById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload as string;
      })

      // SUSPEND
      .addCase(suspendTutorAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(suspendTutorAction.fulfilled, (state, action) => {
        state.actionLoading = null;

        const tutor = state.tutors.find((t) => t.id === action.payload);
        if (tutor) tutor.status = "suspended";

        if (state.selectedTutor?.id === action.payload) {
          state.selectedTutor.status = "suspended";
        }
      })
      .addCase(suspendTutorAction.rejected, (state) => {
        state.actionLoading = null;
      })

      // ACTIVATE
      .addCase(activateTutorAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(activateTutorAction.fulfilled, (state, action) => {
        state.actionLoading = null;

        const tutor = state.tutors.find((t) => t.id === action.payload);
        if (tutor) tutor.status = "active";

        if (state.selectedTutor?.id === action.payload) {
          state.selectedTutor.status = "active";
        }
      })
      .addCase(activateTutorAction.rejected, (state) => {
        state.actionLoading = null;
      })

      // DELETE
      .addCase(deleteTutorAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(deleteTutorAction.fulfilled, (state, action) => {
        state.actionLoading = null;

        const tutor = state.tutors.find((t) => t.id === action.payload);
        if (tutor) tutor.status = "deleted";

        if (state.selectedTutor?.id === action.payload) {
          state.selectedTutor.status = "deleted";
        }
      })
      .addCase(deleteTutorAction.rejected, (state) => {
        state.actionLoading = null;
      })

      // VERIFY
      .addCase(verifyTutorAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(verifyTutorAction.fulfilled, (state, action) => {
        state.actionLoading = null;

        const tutor = state.tutors.find((t) => t.id === action.payload);
        if (tutor) tutor.isVerified = true;

        if (state.selectedTutor?.id === action.payload) {
          state.selectedTutor.isVerified = true;
        }
      })
      .addCase(verifyTutorAction.rejected, (state) => {
        state.actionLoading = null;
      });
  },
});

export const { clearSelectedTutor } = adminTutorSlice.actions;
export default adminTutorSlice.reducer;