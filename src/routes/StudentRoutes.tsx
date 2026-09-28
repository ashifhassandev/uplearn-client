import type { RouteObject } from "react-router-dom";
import { RoleRoute } from "@/components/ProtectedRoute";
import StudentLayout from "@/layouts/StudentLayout";
import HomePage from "@/features/student/pages/HomePage";
import StudentProfilePage from "@/features/student/pages/StudentProfilePage";
import TutorApplicationStatusPage from "@/features/student/pages/TutorApplicationStatusPage";
import { STUDENT_PATHS } from "@/features/student/constants/paths";

const studentRoutes: RouteObject[] = [
  {
    element: <RoleRoute allowedRoles={["student"]} />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          { path: STUDENT_PATHS.HOME, element: <HomePage /> },
          { path: STUDENT_PATHS.PROFILE, element: <StudentProfilePage /> },
          {
            path: STUDENT_PATHS.TUTOR_APPLICATION_STATUS,
            element: <TutorApplicationStatusPage />,
          },
        ],
      },
    ],
  },
];

export default studentRoutes;