import type { UserStatus } from "./student.types";

export type Tutor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;

  status: UserStatus;
  isVerified: boolean;

  courseCount?: number;
  rating?: number;

  lastLogin: string | null;
  createdAt: string;
};

export type TutorDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;

  status: UserStatus;
  isVerified: boolean;

  lastLogin: string | null;
  createdAt: string;

  // 🔥 Extra fields
  headline?: string;
  bio?: string;

  skills?: string[];

  experiences?: {
    role: string;
    company: string;
    duration: string;
    description?: string;
  }[];

  education?: {
    degree: string;
    institution: string;
    year?: string;
  }[];

  certificates?: {
    key: string;
  }[];
};

export type GetTutorsResponse = {
  tutors: Tutor[];
  total: number;
  page: number;
  totalPages: number;
};