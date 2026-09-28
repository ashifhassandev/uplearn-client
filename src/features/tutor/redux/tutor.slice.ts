import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ApplyTutorPayload } from "../types/apply-tutor-payload.types";
import { uploadTutorDocumentApi, applyForTutorApi } from "../api/tutor.api";

interface UploadDocumentResponse {
  url: string;
  key: string;
}

interface TutorState {
  uploadLoading: boolean;
  uploadError: string | null;
  uploadedFile: UploadDocumentResponse | null;

  applyLoading: boolean;
  applyError: string | null;
  applicationStatus: string | null;
  applyMessage: string | null;
}

const initialState: TutorState = {
  uploadLoading: false,
  uploadError: null,
  uploadedFile: null,

  applyLoading: false,
  applyError: null,
  applicationStatus: null,
  applyMessage: null,
};

export const uploadTutorDocument = createAsyncThunk(
  "tutor/uploadDocument",
  async (file: File, { rejectWithValue }) => {
    try {
      return await uploadTutorDocumentApi(file);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Document upload failed",
      );
    }
  },
);

export const applyForTutor = createAsyncThunk(
  "tutor/apply",
  async (payload: ApplyTutorPayload, { rejectWithValue }) => {
    try {
      return await applyForTutorApi(payload);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Application submission failed",
      );
    }
  },
);

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    resetUpload(state) {
      state.uploadLoading = false;
      state.uploadError = null;
      state.uploadedFile = null;
    },
    resetApplication(state) {
      state.applyLoading = false;
      state.applyError = null;
      state.applicationStatus = null;
      state.applyMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Upload Document
    builder
      .addCase(uploadTutorDocument.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadTutorDocument.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadedFile = action.payload;
      })
      .addCase(uploadTutorDocument.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload as string;
      });

    // Apply For Tutor
    builder
      .addCase(applyForTutor.pending, (state) => {
        state.applyLoading = true;
        state.applyError = null;
      })
      .addCase(applyForTutor.fulfilled, (state, action) => {
        state.applyLoading = false;
        state.applicationStatus = action.payload.applicationStatus;
        state.applyMessage = action.payload.message;
      })
      .addCase(applyForTutor.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyError = action.payload as string;
      });
  },
});

export const { resetUpload, resetApplication } = tutorSlice.actions;
export default tutorSlice.reducer;