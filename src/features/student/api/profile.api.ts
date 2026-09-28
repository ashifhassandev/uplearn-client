import { privateApi } from "@/shared/axios/axios.instance";
import type { StudentProfile } from "../types/profile.types";
import { STUDENT_API } from "../constants/api";

export const fetchProfile = async (): Promise<StudentProfile> => {
  const response = await privateApi.get(STUDENT_API.PROFILE);
  return response.data.data;
};