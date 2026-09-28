export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type ApplicationStatus = "pending" | "approved" | "rejected";
export type UserStatus = "active" | "suspended" | "deleted";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: UserStatus;
  profileImage?: string | null;
  applicationStatus?: ApplicationStatus | null;
  rejectionReason?: string | null;
};

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  pendingEmail: string | null;
  verifiedResetCode: string | null;
}