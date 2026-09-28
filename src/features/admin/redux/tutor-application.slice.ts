import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchApplications,
  fetchApplicationById,
  getCertificateUrl as getCertificateUrlApi,
  approveApplication,
  rejectApplication,
} from "../api/application.api";
import type { Application } from "../types/application.types";

type ApplicationState = {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  actionLoading: string | null;
  error: string | null;

  // Single application
  selectedApplication: Application | null;
  selectedLoading: boolean;
  selectedError: string | null;
};

const initialState: ApplicationState = {
  applications: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  actionLoading: null,
  error: null,

  selectedApplication: null,
  selectedLoading: false,
  selectedError: null,
};

export const getApplications = createAsyncThunk(
  "admin/getApplications",
  async (
    params: {
      page: number;
      limit: number;
      search: string;
      status: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await fetchApplications(
        params.page,
        params.limit,
        params.search,
        params.status,
      );
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch applications",
      );
    }
  },
);

export const getApplicationById = createAsyncThunk(
  "admin/getApplicationById",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      return await fetchApplicationById(applicationId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch application",
      );
    }
  },
);

export const getCertificateUrl = createAsyncThunk(
  "admin/getCertificateUrl",
  async (key: string, { rejectWithValue }) => {
    try {
      return await getCertificateUrlApi(key);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to get certificate URL",
      );
    }
  },
);

export const approveApplicationAction = createAsyncThunk(
  "admin/approveApplication",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      await approveApplication(applicationId);
      return applicationId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to approve application",
      );
    }
  },
);

export const rejectApplicationAction = createAsyncThunk(
  "admin/rejectApplication",
  async (
    payload: { applicationId: string; reason: string },
    { rejectWithValue },
  ) => {
    try {
      await rejectApplication(payload.applicationId, payload.reason);
      return payload.applicationId;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to reject application",
      );
    }
  },
);

const adminTutorApplicationSlice = createSlice({
  name: "adminTutorApplications",
  initialState,
  reducers: {
    clearSelectedApplication(state) {
      state.selectedApplication = null;
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getApplicationById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedApplication = null;
      })
      .addCase(getApplicationById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedApplication = action.payload;
      })
      .addCase(getApplicationById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload as string;
      })

      .addCase(approveApplicationAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(approveApplicationAction.fulfilled, (state, action) => {
        state.actionLoading = null;
        const app = state.applications.find((a) => a.id === action.payload);
        if (app) app.applicationStatus = "approved";
        if (state.selectedApplication?.id === action.payload) {
          state.selectedApplication.applicationStatus = "approved";
        }
      })
      .addCase(approveApplicationAction.rejected, (state) => {
        state.actionLoading = null;
      })

      .addCase(rejectApplicationAction.pending, (state, action) => {
        state.actionLoading = action.meta.arg.applicationId;
      })
      .addCase(rejectApplicationAction.fulfilled, (state, action) => {
        state.actionLoading = null;
        const app = state.applications.find((a) => a.id === action.payload);
        if (app) app.applicationStatus = "rejected";
        if (state.selectedApplication?.id === action.payload) {
          state.selectedApplication.applicationStatus = "rejected";
        }
      })
      .addCase(rejectApplicationAction.rejected, (state) => {
        state.actionLoading = null;
      });
  },
});

export const { clearSelectedApplication } = adminTutorApplicationSlice.actions;
export default adminTutorApplicationSlice.reducer;