import { privateApi } from "@/shared/axios/axios.instance";
import { ADMIN_API } from "../constants/api";
import type {
  Application,
  GetApplicationsResponse,
} from "../types/application.types";

export const fetchApplications = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  status: string = "",
): Promise<GetApplicationsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await privateApi.get(
    `${ADMIN_API.APPLICATIONS.LIST}?${params}`,
  );

  return response.data.data;
};

export const fetchApplicationById = async (
  applicationId: string,
): Promise<Application> => {
  const response = await privateApi.get(
    ADMIN_API.APPLICATIONS.DETAILS(applicationId),
  );

  return response.data.data;
};

export const getCertificateUrl = async (key: string): Promise<string> => {
  const response = await privateApi.get(ADMIN_API.CERTIFICATE_URL, {
    params: { key },
  });

  return response.data.data.url;
};

export const approveApplication = async (
  applicationId: string,
): Promise<void> => {
  await privateApi.patch(ADMIN_API.APPLICATIONS.APPROVE(applicationId));
};

export const rejectApplication = async (
  applicationId: string,
  reason: string,
): Promise<void> => {
  await privateApi.patch(ADMIN_API.APPLICATIONS.REJECT(applicationId), {
    reason,
  });
};