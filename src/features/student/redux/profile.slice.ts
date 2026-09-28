import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "../api/profile.api";
import type { StudentProfile } from "../types/profile.types";

type ProfileState = {
  profile: StudentProfile | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const getStudentProfile = createAsyncThunk(
  "profile/getStudentProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProfile();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;