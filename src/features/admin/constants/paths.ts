export const ADMIN_PATHS = {
  DASHBOARD: "/admin/dashboard",

  STUDENTS: "/admin/students",
  STUDENT_DETAILS: (id: string) => `/admin/students/${id}`,

  TUTORS: "/admin/tutors",
  TUTOR_DETAILS: (id: string) => `/admin/tutors/${id}`,

  APPLICATIONS: "/admin/tutor-applications",
  APPLICATION_DETAILS: (id: string) => `/admin/tutor-applications/${id}`,
};