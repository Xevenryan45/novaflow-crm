import {
    LuDollarSign,
    LuUsers,
    LuFolderKanban,
    LuTrendingUp,
} from "react-icons/lu";

import { useEffect, useState } from "react";

import {
    fetchDashboardSummary,
    type DashboardSummary,
} from "../../services/dashboard";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 20500 },
    { month: "Mar", revenue: 19800 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 24500 },
    { month: "Jun", revenue: 27000 },
];

export default function DashboardHomePage() {

    const [dashboardData, setDashboardData] =
        useState<DashboardSummary | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setIsLoading(true);
                setError("");

                const data = await fetchDashboardSummary();

                setDashboardData(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load dashboard"
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const stats = [
        {
            label: "Customers",
            value: dashboardData?.customers ?? 0,
            change: "Live",
            icon: LuUsers,
        },
        {
            label: "Total Projects",
            value: dashboardData?.projects ?? 0,
            change: "Live",
            icon: LuFolderKanban,
        },
        {
            label: "Active Projects",
            value: dashboardData?.activeProjects ?? 0,
            change: "Live",
            icon: LuTrendingUp,
        },
    ];

    return (
        <div>
            {/* Heading */}
            <div>
                <p className="text-sm font-medium text-blue-600">
                    Overview
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Welcome back, Alex
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Here's what's happening with your business today.
                </p>
            </div>

            {isLoading && (
                <div className="mt-6 rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    Loading dashboard...
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-xl bg-red-50 px-4 py-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Stats */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Icon size={20} />
                                </div>

                                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
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

            {/* Main grid */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
                <div className="min-h-[350px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Revenue Overview
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Revenue performance over the last 6 months.
                            </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                            +12.5%
                        </span>
                    </div>

                    <div className="mt-6 h-[270px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={revenueData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
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
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#94a3b8",
                                        fontSize: 11,
                                    }}
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{
                                        r: 5,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="font-semibold text-slate-900">
                        Recent Activity
                    </h2>

                    <div className="mt-5 space-y-5">
                        <Activity
                            title="New customer joined"
                            time="2 minutes ago"
                        />

                        <Activity
                            title="Project completed"
                            time="15 minutes ago"
                        />

                        <Activity
                            title="Invoice payment received"
                            time="1 hour ago"
                        />

                        <Activity
                            title="New team member added"
                            time="3 hours ago"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900">
                            Active Projects
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Track current project progress.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View all
                    </button>
                </div>

                <div className="mt-6 space-y-6">
                    {dashboardData?.recentProjects.map((project) => (
                        <div key={project.name}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {project.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {project.status}
                                    </p>
                                </div>

                                <span className="text-sm font-medium text-slate-600">
                                    {project.progress}%
                                </span>
                            </div>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-blue-600 transition-all"
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="font-semibold text-slate-900">
                            Recent Customers
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest customers added to your workspace.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View all
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">
                                    Customer
                                </th>

                                <th className="px-6 py-3 font-medium">
                                    Plan
                                </th>

                                <th className="px-6 py-3 font-medium">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {dashboardData?.recentCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {customer.name}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {customer.email}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {customer.plan}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${customer.status === "Active"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-50 text-amber-600"
                                                }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

interface ActivityProps {
    title: string;
    time: string;
}

function Activity({ title, time }: ActivityProps) {
    return (
        <div className="flex gap-3">
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

            <div>
                <p className="text-sm font-medium text-slate-700">
                    {title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {time}
                </p>
            </div>
        </div>
    );
}