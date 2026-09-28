export const ADMIN_API = {
  STUDENTS: {
    LIST: "/admin/students",
    DETAILS: (id: string) => `/admin/students/${id}`,
    SUSPEND: (id: string) => `/admin/students/${id}/suspend`,
    ACTIVATE: (id: string) => `/admin/students/${id}/activate`,
    DELETE: (id: string) => `/admin/students/${id}/delete`,
  },

  TUTORS: {
    LIST: "/admin/tutors",
    DETAILS: (id: string) => `/admin/tutors/${id}`,
    SUSPEND: (id: string) => `/admin/tutors/${id}/suspend`,
    ACTIVATE: (id: string) => `/admin/tutors/${id}/activate`,
    DELETE: (id: string) => `/admin/tutors/${id}/delete`,
    VERIFY: (id: string) => `/admin/tutors/${id}/verify`,
  },

  APPLICATIONS: {
    LIST: "/admin/tutor-applications",
    DETAILS: (id: string) => `/admin/tutor-applications/${id}`,
    APPROVE: (id: string) => `/admin/tutor-applications/${id}/approve`,
    REJECT: (id: string) => `/admin/tutor-applications/${id}/reject`,
  },

  CERTIFICATE_URL: "/admin/tutor/certificate-url",
};