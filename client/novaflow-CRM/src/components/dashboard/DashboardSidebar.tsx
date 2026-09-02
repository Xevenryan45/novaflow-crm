import { NavLink } from "react-router-dom";

import {
  LuBoxes,
  LuLayoutDashboard,
  LuChartNoAxesColumn,
  LuUsers,
  LuFolderKanban,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

const dashboardLinks = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LuLayoutDashboard,
    end: true,
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: LuChartNoAxesColumn,
  },
  {
    label: "Customers",
    path: "/dashboard/customers",
    icon: LuUsers,
  },
  {
    label: "Projects",
    path: "/dashboard/projects",
    icon: LuFolderKanban,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: LuSettings,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white md:flex md:flex-col">
      
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <LuBoxes size={20} />
          </div>

          <span className="text-lg font-bold text-slate-900">
            NovaFlow
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="mt-3 space-y-1">
          {dashboardLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />

                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            AM
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              Alex Morgan
            </p>

            <p className="truncate text-xs text-slate-500">
              alex@novaflow.com
            </p>
          </div>

          <button
            type="button"
            className="text-slate-400 transition hover:text-red-500"
            aria-label="Sign out"
          >
            <LuLogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}