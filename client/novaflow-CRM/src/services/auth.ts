export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

const API_URL = "http://localhost:5000/api/auth";

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create account.");
  }

  localStorage.setItem("novaflow_token", data.token);
  localStorage.setItem("novaflow_user", JSON.stringify(data.user));

  return data;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to sign in.");
  }

  localStorage.setItem("novaflow_token", data.token);
  localStorage.setItem("novaflow_user", JSON.stringify(data.user));

  return data;
}

export function getToken() {
  return localStorage.getItem("novaflow_token");
}

export function getCurrentUser(): User | null {
  const storedUser = localStorage.getItem("novaflow_user");

  return storedUser
    ? JSON.parse(storedUser)
    : null;
}

export function logout() {
  localStorage.removeItem("novaflow_token");
  localStorage.removeItem("novaflow_user");
}

export async function getMe(): Promise<User> {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token");
  }

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    logout();
    throw new Error(
      data.message || "Authentication failed"
    );
  }

  localStorage.setItem(
    "novaflow_user",
    JSON.stringify(data.user)
  );

  return data.user;
}