"use client";

import { useMemo } from "react";
import { useEmployees } from "../context/employee-context";

export const useEmployeeStats = () => {
  const { employees } = useEmployees();

  const stats = useMemo(() => {
    const totalEmployees = employees.length;

    // Group by enterprise
    const enterpriseGroups = employees.reduce((acc, employee) => {
      const enterprise = employee.enterprise || "Não especificado";
      acc[enterprise] = (acc[enterprise] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by job role
    const jobRoleGroups = employees.reduce((acc, employee) => {
      const jobRole = employee.jobRole || "Não especificado";
      acc[jobRole] = (acc[jobRole] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Most common enterprise
    const mostCommonEnterprise =
      Object.entries(enterpriseGroups).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "N/A";

    // Most common job role
    const mostCommonJobRole =
      Object.entries(jobRoleGroups).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "N/A";

    return {
      totalEmployees,
      enterpriseGroups,
      jobRoleGroups,
      mostCommonEnterprise,
      mostCommonJobRole,
      uniqueEnterprises: Object.keys(enterpriseGroups).length,
      uniqueJobRoles: Object.keys(jobRoleGroups).length,
    };
  }, [employees]);

  return stats;
};
