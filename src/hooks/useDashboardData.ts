import { useState, useEffect, useCallback } from "react";
import {
  MetricData,
  ChartData,
  TableData,
  FilterOptions,
} from "../types/dashboard";

export const useDashboardData = (filters: FilterOptions) => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with realistic data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the actual number of employees from mockData

      // Generate metrics data
      const metricsData: MetricData[] = [
        {
          id: "2",
          title: "Fugas de Dados Detetadas",
          value: 23,
          change: -8.3,
          changeType: "positive",
          icon: "AlertTriangle",
          color: "danger",
          trend: [30, 25, 28, 22, 26, 20, 24, 23],
        },

        {
          id: "4",
          title: "Tempo de Resposta",
          value: "2.3s",
          change: -15.7,
          changeType: "positive",
          icon: "Clock",
          color: "warning",
          trend: [3.5, 3.2, 2.8, 2.5, 2.4, 2.3, 2.3, 2.3],
        },
        {
          id: "5",
          title: "Pontuação de Segurança",
          value: "94%",
          change: 2.1,
          changeType: "positive",
          icon: "Shield",
          color: "success",
          trend: [88, 89, 91, 92, 93, 94, 94, 94],
        },
        {
          id: "6",
          title: "Poupança Estimada",
          value: "€2.450",
          change: 8.9,
          changeType: "negative",
          icon: "DollarSign",
          color: "primary",
          trend: [2000, 2100, 2200, 2300, 2350, 2400, 2450, 2450],
        },
      ];

      // Generate chart data
      const chartDataPoints: ChartData[] = [
        {
          id: "1",
          name: "Jan",
          value: 8500,
          date: "2024-01",
          category: "emails",
        },
        {
          id: "2",
          name: "Fev",
          value: 9200,
          date: "2024-02",
          category: "emails",
        },
        {
          id: "3",
          name: "Mar",
          value: 10100,
          date: "2024-03",
          category: "emails",
        },
        {
          id: "4",
          name: "Abr",
          value: 11500,
          date: "2024-04",
          category: "emails",
        },
        {
          id: "5",
          name: "Mai",
          value: 12800,
          date: "2024-05",
          category: "emails",
        },
        {
          id: "6",
          name: "Jun",
          value: 13200,
          date: "2024-06",
          category: "emails",
        },
        {
          id: "7",
          name: "Jul",
          value: 14100,
          date: "2024-07",
          category: "emails",
        },
        {
          id: "8",
          name: "Ago",
          value: 15600,
          date: "2024-08",
          category: "emails",
        },
        {
          id: "9",
          name: "Set",
          value: 16200,
          date: "2024-09",
          category: "emails",
        },
        {
          id: "10",
          name: "Out",
          value: 17800,
          date: "2024-10",
          category: "emails",
        },
        {
          id: "11",
          name: "Nov",
          value: 18500,
          date: "2024-11",
          category: "emails",
        },
        {
          id: "12",
          name: "Dez",
          value: 19200,
          date: "2024-12",
          category: "emails",
        },
      ];

      // Generate table data
      const tableDataSet: TableData = {
        id: "recent-activities",
        columns: [
          { key: "timestamp", title: "Hora", sortable: true, width: "15%" },
          { key: "event", title: "Evento", sortable: true, width: "40%" },
          {
            key: "severity",
            title: "Gravidade",
            sortable: true,
            filterable: true,
            width: "15%",
          },
          {
            key: "location",
            title: "Localização",
            sortable: true,
            width: "20%",
          },
          {
            key: "status",
            title: "Estado",
            sortable: true,
            filterable: true,
            width: "10%",
          },
        ],
        rows: [
          {
            id: "1",
            timestamp: "15/01/2024 14:30:22",
            event: "Atividade suspeita de email detetada",
            severity: "Alto",
            location: "Nova Iorque, EUA",
            status: "Ativo",
          },
          {
            id: "2",
            timestamp: "15/01/2024 13:45:11",
            event: "Relatório semanal gerado",
            severity: "Baixo",
            location: "Sistema",
            status: "Concluído",
          },
          {
            id: "3",
            timestamp: "15/01/2024 12:20:05",
            event: "Monitorização de funcionário atualizada",
            severity: "Médio",
            location: "Londres, Reino Unido",
            status: "A processar",
          },
          {
            id: "4",
            timestamp: "15/01/2024 11:15:33",
            event: "Fuga de dados prevenida",
            severity: "Crítico",
            location: "Berlim, Alemanha",
            status: "Resolvido",
          },
          {
            id: "5",
            timestamp: "15/01/2024 10:30:18",
            event: "Cópia de segurança do sistema concluída",
            severity: "Baixo",
            location: "Sistema",
            status: "Concluído",
          },
        ],
        totalRows: 150,
        currentPage: 1,
        pageSize: 5,
      };

      setMetrics(metricsData);
      setChartData(chartDataPoints);
      setTableData(tableDataSet);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Falha ao carregar dados do painel");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    metrics,
    chartData,
    tableData,
    loading,
    error,
    refreshData,
  };
};
