import { Company } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;

export const createCompany = async (companyData: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/companies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create company");
  }

  return data; // contains accessKey
};
export const getAllCompanies = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/companies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create company");
  }

  return data; // contains accessKey
};
export const updateCompany = async (
  id: string,
  companyData: any
): Promise<Company> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/companies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update company");
  }

  return data as Company; // Make sure backend returns full company object
};
export const deleteCompany = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/companies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete company");
  }

  return data; // confirmation message
};

export const toggleCompanyStatusAPI = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/admin/companies/${id}/toggle-status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to toggle status");
  }

  return data.newStatus;
};
export const regenerateAccessKeyAPI = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/admin/companies/${id}/regenerate-key`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to regenerate access key");
  }

  return data;
};
export const getAllCompaniesEmployee = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/stats/employees`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to regenerate access key");
  }

  return data.totalEmployees;
};
export const getStats = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to regenerate access key");
  }

  return data;
};
export const getTopCompanies = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/top-companies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to regenerate access key");
  }

  return data;
};
