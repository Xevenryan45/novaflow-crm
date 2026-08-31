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
    LuUserCheck,
    LuUserRoundCheck,
    LuFolderOpen,
    LuCircleCheck,
    LuUserRoundCog,
    LuSettings,
    LuHardDrive,
} from "react-icons/lu";

interface ProductPreviewProps {
    className?: string;
}

const sidebarLinks = [
    "Overview",
    "Analytics",
    "Customers",
    "Projects",
    "Settings",
] as const;

type SidebarLink = typeof sidebarLinks[number];


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



export default function ProductPreview({ className }: ProductPreviewProps) {

    const [activeLink, setActiveLink] = useState<SidebarLink>("Overview");

    return (
        <div className={`w-full border rounded-xl bg-white shadow-xl ${className ?? ""}`}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
                <div>NovaFlow Dashboard</div>
                <div className="flex gap-3">
                    <span className="block w-4 h-4 border rounded-full bg-black"></span>
                    <span className="block w-4 h-4 border rounded-full bg-black"></span>
                    <span className="block w-4 h-4 border rounded-full bg-black"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
                <aside className="border-r border-slate-200 p-5 hidden md:block">
                    <ul className="space-y-2">
                        {sidebarLinks.map((link) => (
                            <li
                                key={link}
                                className={`rounded-lg px-3 py-2 text-sm font-medium text-slate-600 ${link === activeLink ? "bg-blue-50 text-blue-600" : ""
                                    }`} // If the condition is true, add those classes. Otherwise, add nothing.
                            >
                                <button
                                    onClick={() => setActiveLink(link)}
                                    type="button"
                                    className="w-full px-3 py-2 text-left">
                                    {link}
                                </button>
                            </li>))}
                    </ul>
                </aside>

                <main className="p-6">
                    <div>
                        <h2 className="text-xl font-semibold">{pageContent[activeLink].title}</h2>
                        <p className="mt-1 text-sm text-slate-500">{pageContent[activeLink].subtitle}</p>
                    </div>

                    <div className="mt-6 grid md:grid-cols-3 grid-cols-1 gap-4">
                        {dashboardStats[activeLink].map((stat) => (

                            <div
                                key={stat.label}
                                className="rounded-xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:shadow-md">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-500">
                                        {stat.label}
                                    </p>

                                    <div className="rounded-lg bg-blue-50 p-2">
                                        <stat.icon className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <p className="mt-3 text-2xl font-bold">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-xs text-green-600 font-meedium">
                                    {stat.change}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold">
                            Recent Activity
                        </h3>

                        <div className="mt-4 rounded-xl border border-slate-200">
                            {activities[activeLink].map((activity) => (
                                <div key={activity.title} className="flex items-center justify-between border-b border-slate-100 px-4 py-4 last:border-b-0">
                                    <span className="text-sm font-medium text-slate-700">
                                        {activity.title}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}

                        </div>
                    </div>



                    <div className="mt-8 rounded-xl border border-slate-200 p-5">
                        <div>
                            <h3 className="text-lg font-semibold">{pageContent[activeLink].title} Overview</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Monthly revenue performance
                            </p>
                        </div>

                        <div className="mt-6 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData[activeLink]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={3}
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
