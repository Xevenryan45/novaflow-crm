import { useState } from "react";
import {
  LuTrendingUp,
  LuUsers,
  LuMousePointerClick,
  LuDollarSign,
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

const performanceData = [
  { month: "Jan", revenue: 18000, visitors: 3200 },
  { month: "Feb", revenue: 20500, visitors: 3800 },
  { month: "Mar", revenue: 19800, visitors: 4100 },
  { month: "Apr", revenue: 22000, visitors: 4600 },
  { month: "May", revenue: 24500, visitors: 5200 },
  { month: "Jun", revenue: 27000, visitors: 5900 },
];

const trafficData = [
  { source: "Organic", value: 42 },
  { source: "Direct", value: 28 },
  { source: "Social", value: 18 },
  { source: "Referral", value: 12 },
];

const stats = [
  {
    label: "Total Revenue",
    value: "$27,000",
    change: "+12.5%",
    icon: LuDollarSign,
  },
  {
    label: "Visitors",
    value: "5,900",
    change: "+18.4%",
    icon: LuUsers,
  },
  {
    label: "Conversion Rate",
    value: "8.6%",
    change: "+3.2%",
    icon: LuMousePointerClick,
  },
  {
    label: "Growth",
    value: "14.8%",
    change: "+5.7%",
    icon: LuTrendingUp,
  },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState("6 months");

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Analytics
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Business Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor performance, growth, traffic, and revenue.
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none"
        >
          <option>7 days</option>
          <option>30 days</option>
          <option>3 months</option>
          <option>6 months</option>
          <option>12 months</option>
        </select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  {stat.change}
                </span>
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

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="font-semibold text-slate-900">
              Revenue Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Revenue trend over the selected period.
            </p>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
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
            Traffic Sources
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Where your visitors come from.
          </p>

          <div className="mt-6 space-y-5">
            {trafficData.map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.source}
                  </span>

                  <span className="text-sm text-slate-500">
                    {item.value}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-semibold text-slate-900">
            Website Visitors
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monthly visitor growth.
          </p>
        </div>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
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

              <Bar
                dataKey="visitors"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Bounce Rate"
          value="32.4%"
          description="Visitors leaving after one page"
        />

        <MetricCard
          label="Avg. Session"
          value="4m 32s"
          description="Average session duration"
        />

        <MetricCard
          label="Returning Users"
          value="64.2%"
          description="Visitors who came back"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
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