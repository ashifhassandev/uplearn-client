import { privateApi } from "@/shared/axios/axios.instance";
import { ADMIN_API } from "../constants/api";
import type { GetTutorsResponse, TutorDetails } from "../types/tutor.types";

export const fetchTutors = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  status: string = "",
  verified: string = "",
): Promise<GetTutorsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status && { status }),
    ...(verified && { verified }),
  });

  const response = await privateApi.get(`${ADMIN_API.TUTORS.LIST}?${params}`);

  return response.data.data;
};

export const fetchTutorById = async (id: string): Promise<TutorDetails> => {
  const response = await privateApi.get(ADMIN_API.TUTORS.DETAILS(id));

  return response.data.data;
};

export const suspendTutor = async (tutorId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.TUTORS.SUSPEND(tutorId));
};

export const activateTutor = async (tutorId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.TUTORS.ACTIVATE(tutorId));
};

export const deleteTutor = async (tutorId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.TUTORS.DELETE(tutorId));
};

export const verifyTutor = async (tutorId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.TUTORS.VERIFY(tutorId));
};