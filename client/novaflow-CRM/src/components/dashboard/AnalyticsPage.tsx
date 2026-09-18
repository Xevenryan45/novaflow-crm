import { useEffect, useState } from "react";

import {
  fetchAnalytics,
  type AnalyticsData,
} from "../../services/analytics";

import {
  LuUsers,
  LuFolderKanban,
  LuCircleCheckBig,
  LuTrendingUp,
} from "react-icons/lu";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchAnalytics();

        setAnalytics(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load analytics"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const stats = [
    {
      label: "Total Customers",
      value: analytics?.overview.totalCustomers ?? 0,
      icon: LuUsers,
    },
    {
      label: "Total Projects",
      value: analytics?.overview.totalProjects ?? 0,
      icon: LuFolderKanban,
    },
    {
      label: "Completed Projects",
      value: analytics?.overview.completedProjects ?? 0,
      icon: LuCircleCheckBig,
    },
    {
      label: "Average Progress",
      value: `${analytics?.overview.averageProgress ?? 0}%`,
      icon: LuTrendingUp,
    },
  ];

  if (isLoading) {
    return (
      <div className="py-20 text-center text-sm text-slate-400">
        Loading analytics...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Analytics
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Business Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor customer growth, project performance,
          and workspace activity.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={20} />
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

      {/* Monthly growth */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* Customers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Customer Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customers added over the last six months.
          </p>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics?.monthlyCustomers ?? []}
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
                  allowDecimals={false}
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
                  dataKey="customers"
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

        {/* Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Project Growth
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Projects created over the last six months.
          </p>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.monthlyProjects ?? []}
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
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 11,
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="projects"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* Project Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Projects by Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current distribution of your projects.
          </p>

          <div className="mt-6 space-y-5">
            {analytics?.projectsByStatus.map((item) => {
              const total =
                analytics.overview.totalProjects || 1;

              const percentage = Math.round(
                (Number(item.total) / total) * 100
              );

              return (
                <div key={item.status}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {item.status}
                    </span>

                    <span className="text-sm text-slate-500">
                      {item.total} ({percentage}%)
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Plans */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Customers by Plan
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribution across subscription plans.
          </p>

          <div className="mt-6 space-y-5">
            {analytics?.customersByPlan.map((item) => {
              const total =
                analytics.overview.totalCustomers || 1;

              const percentage = Math.round(
                (Number(item.total) / total) * 100
              );

              return (
                <div key={item.plan}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {item.plan}
                    </span>

                    <span className="text-sm text-slate-500">
                      {item.total} ({percentage}%)
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Customer Status */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Active Customers"
          value={analytics?.overview.activeCustomers ?? 0}
          description="Customers currently marked active"
        />

        <MetricCard
          label="Trial Customers"
          value={analytics?.overview.trialCustomers ?? 0}
          description="Customers currently on trial"
        />

        <MetricCard
          label="Inactive Customers"
          value={analytics?.overview.inactiveCustomers ?? 0}
          description="Customers currently inactive"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  description: string;
}

function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}