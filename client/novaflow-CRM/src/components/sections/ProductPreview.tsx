import { useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    LuDollarSign,
    LuUsers,
    LuFolderKanban,
    LuChartNoAxesCombined,
    LuMousePointerClick,
    LuClock3,
    LuUserPlus,
    LuUserRoundCheck,
    LuFolderOpen,
    LuCircleCheck,
    LuUserRoundCog,
    LuSettings,
    LuHardDrive,
    LuTrendingUp,
    LuLayoutDashboard,
    LuChartNoAxesColumn,
    LuSearch,
    LuBell,
    LuChevronDown,
} from "react-icons/lu";

interface ProductPreviewProps {
    className?: string;
}

const sidebarLinks = [
    {
        label: "Overview",
        icon: LuLayoutDashboard,
    },
    {
        label: "Analytics",
        icon: LuChartNoAxesColumn,
    },
    {
        label: "Customers",
        icon: LuUsers,
    },
    {
        label: "Projects",
        icon: LuFolderKanban,
    },
    {
        label: "Settings",
        icon: LuSettings,
    },
] as const;

type SidebarLink = (typeof sidebarLinks)[number]["label"];


const activities = {
    Overview: [
        {
            title: "New customer joined",
            time: "2m ago",
        },
        {
            title: "Project completed",
            time: "15m ago",
        },
        {
            title: "Invoice paid",
            time: "1hr ago",
        },
    ],

    Analytics: [
        {
            title: "Traffic increased",
            time: "5m ago",
        },
        {
            title: "Conversion rate improved",
            time: "20m ago",
        },
        {
            title: "New report generated",
            time: "1hr ago",
        },
    ],

    Customers: [
        {
            title: "New customer joined",
            time: "3m ago",
        },
        {
            title: "Customer profile updated",
            time: "25m ago",
        },
        {
            title: "Customer upgraded plan",
            time: "2hr ago",
        },
    ],

    Projects: [
        {
            title: "New project created",
            time: "10m ago",
        },
        {
            title: "Project completed",
            time: "30m ago",
        },
        {
            title: "Project deadline updated",
            time: "2hr ago",
        },
    ],

    Settings: [
        {
            title: "Profile updated",
            time: "8m ago",
        },
        {
            title: "New team member added",
            time: "45m ago",
        },
        {
            title: "Workspace settings changed",
            time: "3hr ago",
        },
    ],
};

const pageContent = {
    Overview: {
        title: "Dashboard",
        subtitle: "Welcome back",
    },
    Analytics: {
        title: "Analytics",
        subtitle: "Track your business performance",
    },
    Customers: {
        title: "Customers",
        subtitle: "Manage your customer relationships",
    },
    Projects: {
        title: "Projects",
        subtitle: "Track your active projects",
    },
    Settings: {
        title: "Settings",
        subtitle: "Manage your workspace preferences",
    },
};

const dashboardStats = {
    Overview: [
        {
            label: "Revenue",
            value: "$24,500",
            change: "+12.5% this month",
            icon: LuDollarSign,
        },
        {
            label: "Customers",
            value: "1,248",
            change: "+8.2% this month",
            icon: LuUsers,
        },
        {
            label: "Projects",
            value: "86",
            change: "+14.3% this month",
            icon: LuFolderKanban,
        },
    ],

    Analytics: [
        {
            label: "Conversion Rate",
            value: "84.6%",
            change: "+5.4% this month",
            icon: LuChartNoAxesCombined,
        },
        {
            label: "Engagement Rate",
            value: "72.8%",
            change: "+6.7% this month",
            icon: LuMousePointerClick,
        },
        {
            label: "Average Session",
            value: "4m 32s",
            change: "+11.2% this month",
            icon: LuClock3,
        },
    ],

    Customers: [
        {
            label: "Total Customers",
            value: "1,248",
            change: "+8.2% this month",
            icon: LuUsers,
        },
        {
            label: "New Customers",
            value: "186",
            change: "+14.6% this month",
            icon: LuUserPlus,
        },
        {
            label: "Customer Retention",
            value: "91.4%",
            change: "+3.8% this month",
            icon: LuUserRoundCheck,
        },
    ],

    Projects: [
        {
            label: "Total Projects",
            value: "86",
            change: "+14.3% this month",
            icon: LuFolderKanban,
        },
        {
            label: "Active Projects",
            value: "32",
            change: "+6.7% this month",
            icon: LuFolderOpen,
        },
        {
            label: "Completed Projects",
            value: "54",
            change: "+18.2% this month",
            icon: LuCircleCheck,
        },
    ],

    Settings: [
        {
            label: "Profile Completion",
            value: "96%",
            change: "+4.2% this month",
            icon: LuUserRoundCog,
        },
        {
            label: "Team Members",
            value: "24",
            change: "+2 this month",
            icon: LuSettings,
        },
        {
            label: "Storage Used",
            value: "68%",
            change: "+8.5% this month",
            icon: LuHardDrive,
        },
    ],
};

const chartData = {
    Overview: [
        { month: "Jan", value: 18000 },
        { month: "Feb", value: 20500 },
        { month: "Mar", value: 19800 },
        { month: "Apr", value: 22000 },
        { month: "May", value: 24500 },
        { month: "Jun", value: 27000 },
    ],

    Analytics: [
        { month: "Jan", value: 62 },
        { month: "Feb", value: 68 },
        { month: "Mar", value: 71 },
        { month: "Apr", value: 76 },
        { month: "May", value: 81 },
        { month: "Jun", value: 85 },
    ],

    Customers: [
        { month: "Jan", value: 820 },
        { month: "Feb", value: 910 },
        { month: "Mar", value: 980 },
        { month: "Apr", value: 1050 },
        { month: "May", value: 1150 },
        { month: "Jun", value: 1248 },
    ],

    Projects: [
        { month: "Jan", value: 42 },
        { month: "Feb", value: 51 },
        { month: "Mar", value: 59 },
        { month: "Apr", value: 68 },
        { month: "May", value: 76 },
        { month: "Jun", value: 86 },
    ],

    Settings: [
        { month: "Jan", value: 72 },
        { month: "Feb", value: 78 },
        { month: "Mar", value: 82 },
        { month: "Apr", value: 87 },
        { month: "May", value: 92 },
        { month: "Jun", value: 96 },
    ],
};

type TooltipProps = {
    active?: boolean;
    payload?: Array<{
        value: number;
    }>;
    label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
                {payload[0].value.toLocaleString()}
            </p>
        </div>
    );
}



export default function ProductPreview({ className }: ProductPreviewProps) {

    const [activeLink, setActiveLink] = useState<SidebarLink>("Overview");
    const [searchTerm, setSearchTerm] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className={`w-full border rounded-xl bg-white shadow-xl ${className ?? ""}`}>
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 md:px-5">

                {/* Workspace */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowWorkspaceMenu((prev) => !prev)}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                            N
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold text-slate-900">
                                NovaFlow
                            </p>

                            <p className="text-xs text-slate-500">
                                Business Workspace
                            </p>
                        </div>

                        <LuChevronDown
                            size={15}
                            className="hidden text-slate-400 sm:block"
                        />
                    </button>

                    {showWorkspaceMenu && (
                        <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                                NovaFlow Business
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                                Marketing Workspace
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                                + Create workspace
                            </button>
                        </div>
                    )}
                </div>


                {/* Right Side */}
                <div className="flex items-center gap-2 md:gap-3">

                    {/* Search */}
                    <div className="relative hidden lg:block">
                        <LuSearch
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                        {searchTerm && (
                            <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                                <p className="text-xs text-slate-400">
                                    Search results
                                </p>

                                <p className="mt-2 text-sm text-slate-700">
                                    Searching for "{searchTerm}"
                                </p>
                            </div>
                        )}
                    </div>


                    {/* Notifications */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowNotifications((prev) => !prev)}
                            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            aria-label="Notifications"
                        >
                            <LuBell size={18} />

                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-lg">
                                <div className="border-b border-slate-100 px-4 py-3">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Notifications
                                    </p>
                                </div>

                                <div className="p-2">
                                    <div className="rounded-lg px-3 py-3 hover:bg-slate-50">
                                        <p className="text-sm font-medium text-slate-800">
                                            New customer joined
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            2 minutes ago
                                        </p>
                                    </div>

                                    <div className="rounded-lg px-3 py-3 hover:bg-slate-50">
                                        <p className="text-sm font-medium text-slate-800">
                                            Project completed
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            15 minutes ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Divider */}
                    <div className="hidden h-7 w-px bg-slate-200 sm:block" />


                    {/* User */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowProfileMenu((prev) => !prev)}
                            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                                AM
                            </div>

                            <div className="hidden text-left md:block">
                                <p className="text-xs font-semibold text-slate-800">
                                    Alex Morgan
                                </p>

                                <p className="text-[10px] text-slate-500">
                                    Administrator
                                </p>
                            </div>

                            <LuChevronDown
                                size={14}
                                className="hidden text-slate-400 md:block"
                            />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                                    My Profile
                                </button>

                                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                                    Account Settings
                                </button>

                                <div className="my-1 border-t border-slate-100" />

                                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
                <aside className="hidden border-r border-slate-200 bg-slate-50/60 p-4 md:flex md:flex-col">

                    <div>
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Workspace
                        </p>

                        <ul className="mt-3 space-y-1">
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = activeLink === link.label;

                                return (
                                    <li key={link.label}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveLink(link.label)}
                                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${isActive
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-slate-600 hover:bg-white hover:text-slate-900"
                                                }`}
                                        >
                                            <Icon size={17} />

                                            <span>{link.label}</span>

                                            {isActive && (
                                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="rounded-xl bg-slate-900 p-4 text-white">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                                <LuTrendingUp size={17} />
                            </div>

                            <p className="mt-4 text-sm font-semibold">
                                Upgrade your workspace
                            </p>

                            <p className="mt-2 text-xs leading-5 text-slate-400">
                                Unlock advanced analytics, workflows, and unlimited team members.
                            </p>

                            <button
                                type="button"
                                className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Upgrade plan
                            </button>
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                AM
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-slate-800">
                                    Alex Morgan
                                </p>

                                <p className="truncate text-[10px] text-slate-500">
                                    Pro workspace
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="p-6">
                    <div>
                        <h2 className="text-xl font-semibold">{pageContent[activeLink].title}</h2>
                        <p className="mt-1 text-sm text-slate-500">{pageContent[activeLink].subtitle}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {dashboardStats[activeLink].map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                            <Icon size={19} />
                                        </div>

                                        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
                                            <LuTrendingUp size={13} />
                                            {stat.change}
                                        </div>
                                    </div>

                                    <p className="mt-5 text-sm text-slate-500">
                                        {stat.label}
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>



                    <div className="mt-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Recent Activity
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Latest updates from your workspace
                                </p>
                            </div>

                            <button
                                type="button"
                                className="text-xs font-medium text-blue-600 hover:text-blue-700"
                            >
                                View all
                            </button>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white">
                            {activities[activeLink].map((activity) => (
                                <div
                                    key={activity.title}
                                    className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

                                        <span className="text-sm font-medium text-slate-700">
                                            {activity.title}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-xs text-slate-400">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className="mt-8 rounded-xl border border-slate-200 p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {pageContent[activeLink].title} Overview
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Monthly {activeLink.toLowerCase()} performance
                                </p>
                            </div>

                            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                <LuTrendingUp size={13} />
                                12.4%
                            </div>
                        </div>

                        <div className="mt-6 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData[activeLink]}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="lineGradient"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="0"
                                        >
                                            <stop offset="0%" stopColor="#2563eb" />
                                            <stop offset="100%" stopColor="#60a5fa" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="4 4"
                                        vertical={false}
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#94a3b8",
                                            fontSize: 11,
                                        }}
                                        dy={10}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#94a3b8",
                                            fontSize: 11,
                                        }}
                                    />

                                    <Tooltip
                                        content={<CustomTooltip />}
                                        cursor={{
                                            stroke: "#cbd5e1",
                                            strokeDasharray: "4 4",
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="url(#lineGradient)"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{
                                            r: 5,
                                            fill: "#2563eb",
                                            stroke: "#ffffff",
                                            strokeWidth: 3,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
