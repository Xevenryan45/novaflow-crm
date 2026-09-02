import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import DashboardLayout from "../components/dashboard/DashboardLayout";



import DashboardHomePage from "../components/dashboard/DashboardHomePage";
import AnalyticsPage from "../components/dashboard/AnalyticsPage";
import CustomersPage from "../components/dashboard/CustomersPage";
import ProjectsPage from "../components/dashboard/ProjectsPage";
import SettingsPage from "../components/dashboard/SettingsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={<DashboardHomePage />}
          />

          <Route
            path="analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="customers"
            element={<CustomersPage />}
          />

          <Route
            path="projects"
            element={<ProjectsPage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}