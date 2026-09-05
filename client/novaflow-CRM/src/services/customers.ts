import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api/customers";

export type CustomerStatus =
  | "Active"
  | "Trial"
  | "Inactive";

export type CustomerPlan =
  | "Starter"
  | "Professional"
  | "Business";

export interface Customer {
  id: number;
  name: string;
  email: string;
  plan: CustomerPlan;
  status: CustomerStatus;
  created_at?: string;
}

export interface CreateCustomerData {
  name: string;
  email: string;
  plan: CustomerPlan;
  status?: CustomerStatus;
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to fetch customers"
    );
  }

  return data.customers;
}

export async function createCustomer(
  customer: CreateCustomerData
): Promise<Customer> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create customer"
    );
  }

  return data.customer;
}

export async function deleteCustomer(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to delete customer"
    );
  }
}