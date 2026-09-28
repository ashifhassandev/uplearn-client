import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Application } from "@/features/admin/types/application.types";
import { fetchTutorProfile as fetchTutorProfileApi } from "../api/tutor.api";

interface TutorProfileState {
  profile: Application | null;
  loading: boolean;
  error: string | null;
}

const initialState: TutorProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchTutorProfile = createAsyncThunk(
  "tutorProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTutorProfileApi();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tutor profile",
      );
    }
  },
);

const tutorProfileSlice = createSlice({
  name: "tutorProfile",
  initialState,
  reducers: {
    clearTutorProfile(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTutorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTutorProfile } = tutorProfileSlice.actions;
export default tutorProfileSlice.reducer;