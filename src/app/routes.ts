import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
]);
