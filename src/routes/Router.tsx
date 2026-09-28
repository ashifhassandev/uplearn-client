import { createBrowserRouter, Navigate } from "react-router-dom";
import authRoutes from "./AuthRoutes";
import adminRoutes from "./AdminRoutes";
import tutorRoutes from "./TutorRoutes";
import studentRoutes from "./StudentRoutes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...adminRoutes,
  ...tutorRoutes,
  ...studentRoutes,
  { path: "*", element: <Navigate to="/login" replace /> },
]);