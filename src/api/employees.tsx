/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;
export const getCompanyData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/companies/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update company ");
  }

  return data;
};
export const updateCompanyProfile = async (companyData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/companies/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update company ");
  }

  return data;
};
export const createEmployeeProfile = async (EmployeeData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(EmployeeData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create company");
  }

  return data; // contains accessKey
};
export const getEmployeeData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/employees`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to to find company ");
  }

  return data;
};
export const updateEmployeeProfile = async (employeeData: any, id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update employeeData ");
  }

  return data;
};

export const DeleteEmployeeProfile = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update employeeData ");
  }

  return data;
};
export const getEmployeeDataByCompany = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/employees/by-company/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update company ");
  }

  return data;
};
