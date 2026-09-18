import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api/dashboard";

export interface DashboardProject {
  id: number;
  name: string;
  status: string;
  progress: number;
  deadline: string | null;
  customer_name?: string | null;
}

export interface DashboardCustomer {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  created_at?: string;
}

export interface DashboardSummary {
  customers: number;
  projects: number;
  activeProjects: number;
  completedProjects: number;
  recentProjects: DashboardProject[];
  recentCustomers: DashboardCustomer[];
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const token = getToken();

  const response = await fetch(`${API_URL}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load dashboard data"
    );
  }

  return data;
}