import type { RouteObject } from "react-router-dom";
import { RoleRoute } from "@/components/ProtectedRoute";
import TutorLayout from "@/layouts/TutorLayout";
import RegistrationPage from "@/features/tutor/pages/RegistrationPage";
import TutorDashboardPage from "@/features/tutor/pages/TutorDashboardPage";
import TutorProfilePage from "@/features/tutor/pages/TutorProfilePage";
import { TUTOR_PATHS } from "@/features/tutor/constants/paths";

const tutorRoutes: RouteObject[] = [
  {
    element: <RoleRoute allowedRoles={["student"]} />,
    children: [
      {
        path: TUTOR_PATHS.ONBOARDING,
        element: <RegistrationPage />,
      },
    ],
  },
  {
    element: <RoleRoute allowedRoles={["tutor"]} />,
    children: [
      {
        element: <TutorLayout />,
        children: [
          {
            path: TUTOR_PATHS.DASHBOARD,
            element: <TutorDashboardPage />,
          },
          { path: TUTOR_PATHS.PROFILE, element: <TutorProfilePage /> },
        ],
      },
    ],
  },
];

export default tutorRoutes;