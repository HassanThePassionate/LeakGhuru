/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { MetricData } from "../../types/dashboard";
import * as Icons from "lucide-react";

interface EnhancedMetricCardProps {
  metric?: MetricData;
  onClick?: () => void;
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  color?: "primary" | "success" | "warning" | "danger";
}

const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({
  metric,
  onClick,
  title,
  value,
  icon,
  color,
}) => {
  // Use optional chaining and fallback for icon
  const IconComponent =
    (metric?.icon && (Icons as any)[metric.icon]) || Icons.Activity;

  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-400 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const trendData =
    metric?.trend?.map((value, index) => ({ index, value })) || [];

  return (
    <div
      className="bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">
            {title ?? metric?.title ?? ""}
          </p>
          <p className="text-3xl font-bold text-white mb-2">
            {value !== undefined
              ? value.toLocaleString()
              : metric?.value !== undefined
              ? metric.value.toLocaleString()
              : ""}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
            colorClasses[
              color
                ? color
                : (metric?.color as keyof typeof colorClasses) || "primary"
            ]
          }`}
        >
          {icon ? icon : <IconComponent className="w-6 h-6" />}
        </div>
      </div>

      {/* Mini Trend Chart */}
      {metric?.trend && metric.trend.length > 0 && (
        <div className="h-16 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#d83dff"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default EnhancedMetricCard;
