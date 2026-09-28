export type UserStatus = "active" | "suspended" | "deleted";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
};

export type GetStudentsResponse = {
  students: Student[];
  total: number;
  page: number;
  totalPages: number;
};

export type StudentDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  role: string;
  status: string;
  lastLogin: string | null;
  createdAt: string;
};