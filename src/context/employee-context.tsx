"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Employee } from "../types";
import {
  createEmployeeProfile,
  DeleteEmployeeProfile,
  getEmployeeData,
  updateEmployeeProfile,
} from "../api/employees";

interface NewEmployee {
  name: string;
  jobRole: string;
  email: string;
  phone: string;
  enterprise: string;
}

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refreshEmployees: () => Promise<void>;
  addEmployee: (employee: NewEmployee) => Promise<void>;
  updateEmployee: (employee: NewEmployee, id: string) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  searchEmployees: (searchTerm: string) => Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees data
  const refreshEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployeeData();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees data");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const addEmployee = async (employee: NewEmployee) => {
    try {
      setError(null);
      await createEmployeeProfile(employee);
      await refreshEmployees(); // Refresh data after adding
    } catch (err) {
      setError("Failed to add employee");
      console.error("Error adding employee:", err);
      throw err; // Re-throw to handle in component
    }
  };

  // Update existing employee
  const updateEmployee = async (employee: NewEmployee, id: string) => {
    try {
      setError(null);
      await updateEmployeeProfile(employee, id);
      await refreshEmployees(); // Refresh data after updating
    } catch (err) {
      setError("Failed to update employee");
      console.error("Error updating employee:", err);
      throw err; // Re-throw to handle in component
    }
  };

  // Delete employee
  const deleteEmployee = async (id: string) => {
    try {
      setError(null);
      await DeleteEmployeeProfile(id);
      await refreshEmployees(); // Refresh data after deleting
    } catch (err) {
      setError("Failed to delete employee");
      console.error("Error deleting employee:", err);
      throw err; // Re-throw to handle in component
    }
  };

  // Search employees
  const searchEmployees = (searchTerm: string): Employee[] => {
    if (!searchTerm.trim()) return employees;

    return employees.filter(
      (employee) =>
        (employee.name?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (employee.email?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (employee.jobRole?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (employee.enterprise?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        )
    );
  };

  // Load employees on mount
  useEffect(() => {
    refreshEmployees();
  }, []);

  const value: EmployeeContextType = {
    employees,
    loading,
    error,
    refreshEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use the employee context
export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};
