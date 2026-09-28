export type Application = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  headline: string | null;
  bio: string | null;
  skills: string[];
  certificates: {
    url: string | null;
    key: string | null;
  }[];
  experiences: {
    role: string;
    company: string;
    duration: string;
    description?: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  links: {
    linkedin: string | null;
    portfolio: string | null;
    github: string | null;
  };
  applicationStatus: "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  createdAt: string;
};

export type GetApplicationsResponse = {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
};