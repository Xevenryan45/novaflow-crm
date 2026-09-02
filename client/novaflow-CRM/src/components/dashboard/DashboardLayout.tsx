import { Outlet } from "react-router-dom"; {/* This is where the content of each dashboard page will appear */}
import DashboardTopbar from "./DashboardTopbar";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className="md:pl-64">
        <DashboardTopbar />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}