import React, { useState } from "react";
import { Mail, RefreshCw, User } from "lucide-react";
import EnhancedMetricCard from "../components/Dashboard/EnhancedMetricCard";
import InteractiveChart from "../components/Dashboard/InteractiveChart";
import GeographicMap from "../components/Dashboard/GeographicMap";
import ErrorBoundary from "../components/Dashboard/ErrorBoundary";
import { DashboardSkeleton } from "../components/Dashboard/LoadingStates";
import { useDashboardData } from "../hooks/useDashboardData";
import { FilterOptions, ChartData } from "../types/dashboard";
import { mockLeakLocations } from "../data/mockData";
import { useEmployeeStats } from "../hooks/useEmployeeStats";

const Dashboard: React.FC = () => {
  const [filters] = useState<FilterOptions>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
    categories: ["Emails", "Segurança"],
    status: ["Ativo", "Crítico"],
    customFilters: {},
  });
  const { metrics, loading, error, refreshData } = useDashboardData(filters);

  const handleChartDrillDown = (dataPoint: ChartData) => {
    console.log("Analisar em detalhe:", dataPoint);
  };
  const { totalEmployees, monthlyData } = useEmployeeStats();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
        <p className="text-red-400">{error}</p>
        <button
          onClick={refreshData}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6 animate-fade-in" data-dashboard-content>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Painel de Controlo Avançado
            </h1>
            <p className="text-gray-400">
              Monitorização em tempo real de fugas de dados corporativos e
              análises
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={refreshData}
              className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
              aria-label="Atualizar dados do painel"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnhancedMetricCard
            title="Total de Emails monitorizados"
            value={totalEmployees}
            icon={<Mail className="w-6 h-6" />}
            color="primary"
          />
          <EnhancedMetricCard
            title="Monitorização Ativa"
            value={totalEmployees}
            icon={<User className="w-6 h-6" />}
            color="success"
          />
          {metrics.map((metric) => (
            <EnhancedMetricCard
              key={metric.id}
              metric={metric}
              onClick={() => console.log("Métrica clicada:", metric.title)}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InteractiveChart
            data={monthlyData.map((item) => ({
              id: item.month,
              name: item.month,
              value: item.employee,
              category: "emails",
            }))}
            title="Emails monitorizados"
            type="area"
            height={350}
            onDrillDown={handleChartDrillDown}
          />
          <GeographicMap locations={mockLeakLocations} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
