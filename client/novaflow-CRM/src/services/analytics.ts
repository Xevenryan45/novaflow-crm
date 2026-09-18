import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api/analytics";

export interface AnalyticsOverview {
  totalCustomers: number;
  activeCustomers: number;
  trialCustomers: number;
  inactiveCustomers: number;

  totalProjects: number;
  planningProjects: number;
  inProgressProjects: number;
  reviewProjects: number;
  completedProjects: number;

  averageProgress: number;
}

export interface ProjectStatusAnalytics {
  status: string;
  total: number;
}

export interface CustomerPlanAnalytics {
  plan: string;
  total: number;
}

export interface MonthlyCustomerAnalytics {
  monthKey: string;
  month: string;
  customers: number;
}

export interface MonthlyProjectAnalytics {
  monthKey: string;
  month: string;
  projects: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  projectsByStatus: ProjectStatusAnalytics[];
  customersByPlan: CustomerPlanAnalytics[];
  monthlyCustomers: MonthlyCustomerAnalytics[];
  monthlyProjects: MonthlyProjectAnalytics[];
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load analytics"
    );
  }

  return data;
}