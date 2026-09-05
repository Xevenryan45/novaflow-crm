// src/services/auth.ts

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const USER_KEY = "novaflow_user";
  
  export function getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(USER_KEY);
  
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  export function login(email: string, password: string): User {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
  
    const user: User = {
      id: 1,
      name: "Alex Morgan",
      email,
    };
  
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  
    return user;
  }
  
  export function signup(
    name: string,
    email: string,
    password: string
  ): User {
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }
  
    const user: User = {
      id: Date.now(),
      name,
      email,
    };
  
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  
    return user;
  }
  
  export function logout() {
    localStorage.removeItem(USER_KEY);
  }