import { privateApi } from "@/shared/axios/axios.instance";
import { ADMIN_API } from "../constants/api";
import type {
  GetStudentsResponse,
  StudentDetail,
} from "../types/student.types";

export const fetchStudents = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  status: string = "",
): Promise<GetStudentsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await privateApi.get(`${ADMIN_API.STUDENTS.LIST}?${params}`);

  return response.data.data;
};

export const fetchStudentById = async (
  studentId: string,
): Promise<StudentDetail> => {
  const response = await privateApi.get(ADMIN_API.STUDENTS.DETAILS(studentId));

  return response.data.data;
};

export const suspendStudent = async (userId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.STUDENTS.SUSPEND(userId));
};

export const activateStudent = async (userId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.STUDENTS.ACTIVATE(userId));
};

export const deleteStudent = async (userId: string): Promise<void> => {
  await privateApi.patch(ADMIN_API.STUDENTS.DELETE(userId));
};