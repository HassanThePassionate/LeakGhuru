"use client";

import { useMemo } from "react";
import { useEmployees } from "../context/employee-context";

export const useEmployeeStats = () => {
  const { employees } = useEmployees();

  console.log("useEmployeeStats", employees);

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

    // Group by month (based on createdAt)
    const monthlyData = employees.reduce((acc, employee) => {
      if (employee.createdAt) {
        const date = new Date(employee.createdAt);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];

        const existingMonth = acc.find((item) => item.month === month);
        if (existingMonth) {
          existingMonth.employee += 1;
        } else {
          acc.push({
            month,
            employee: 1,
            leaks: 0,
          });
        }
      }
      return acc;
    }, [] as Array<{ month: string; employee: number; leaks: number }>);

    // Sort monthly data by month order
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const sortedMonthlyData = monthlyData.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

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
      monthlyData: sortedMonthlyData,
      mostCommonEnterprise,
      mostCommonJobRole,
      uniqueEnterprises: Object.keys(enterpriseGroups).length,
      uniqueJobRoles: Object.keys(jobRoleGroups).length,
    };
  }, [employees]);

  return stats;
};
