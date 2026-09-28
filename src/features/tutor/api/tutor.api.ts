import { privateApi } from "@/shared/axios/axios.instance";
import { TUTOR_API } from "../constants/api";
import type { Application } from "@/features/admin/types/application.types";
import type { ApplyTutorPayload } from "../types/apply-tutor-payload.types";

export const uploadTutorDocumentApi = async (file: File) => {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("folder", "tutor-documents");

  const { data } = await privateApi.post<{
    data: { url: string; key: string };
  }>(TUTOR_API.UPLOAD_DOCUMENT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

export const applyForTutorApi = async (payload: ApplyTutorPayload) => {
  const { data } = await privateApi.post<{
    success: boolean;
    message: string;
    data: { applicationStatus: string };
  }>(TUTOR_API.APPLY, payload);

  return {
    message: data.message,
    applicationStatus: data.data.applicationStatus,
  };
};

export const fetchTutorProfile = async (): Promise<Application> => {
  const response = await privateApi.get(TUTOR_API.PROFILE);
  return response.data.data;
};

export const fetchCertificateUrl = async (key: string): Promise<string> => {
  const response = await privateApi.get<{
    success: boolean;
    data: { url: string };
  }>(TUTOR_API.CERTIFICATE_URL, {
    params: { key },
  });

  return response.data.data.url;
};