import type { RouteObject } from "react-router-dom";
import { RoleRoute } from "@/components/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/features/admin/pages/DashboardPage";
import StudentsPage from "@/features/admin/pages/StudentsPage";
import StudentDetailPage from "@/features/admin/pages/StudentDetailPage";
import TutorsPage from "@/features/admin/pages/TutorsPage";
import AdminTutorDetailPage from "@/features/admin/pages/TutorDetailsPage";
import TutorApplicationsPage from "@/features/admin/pages/TutorApplicationsPage";
import TutorApplicationDetailPage from "@/features/admin/pages/TutorApplicationDetailPage";
import { ADMIN_PATHS } from "@/features/admin/constants/paths";

const adminRoutes: RouteObject[] = [
  {
    element: <RoleRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: ADMIN_PATHS.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ADMIN_PATHS.STUDENTS,
            element: <StudentsPage />,
          },
          {
            path: "/admin/students/:id",
            element: <StudentDetailPage />,
          },
          {
            path: ADMIN_PATHS.TUTORS,
            element: <TutorsPage />,
          },
          {
            path: "/admin/tutors/:id",
            element: <AdminTutorDetailPage />,
          },
          {
            path: ADMIN_PATHS.APPLICATIONS,
            element: <TutorApplicationsPage />,
          },
          {
            path: "/admin/tutor-applications/:id",
            element: <TutorApplicationDetailPage />,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;