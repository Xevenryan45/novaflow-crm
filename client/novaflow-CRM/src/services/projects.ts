import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api/projects";

export type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Review"
  | "Completed";

export interface Project {
  id: number;
  name: string;
  status: ProjectStatus;
  progress: number;
  deadline: string | null;
  created_at?: string;
  customer_id?: number | null;
  customer_name?: string | null;
}

export interface CreateProjectData {
  name: string;
  customerId?: number | null;
  deadline?: string | null;
  status?: ProjectStatus;
  progress?: number;
}

export interface UpdateProjectData {
  name?: string;
  customerId?: number | null;
  deadline?: string | null;
  status?: ProjectStatus;
  progress?: number;
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to fetch projects"
    );
  }

  return data.projects;
}

export async function createProject(
  project: CreateProjectData
): Promise<Project> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create project"
    );
  }

  return data.project;
}

export async function updateProject(
  id: number,
  project: UpdateProjectData
): Promise<Project> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to update project"
    );
  }

  return data.project;
}

export async function deleteProject(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to delete project"
    );
  }
}