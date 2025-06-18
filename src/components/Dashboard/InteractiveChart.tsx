import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { ChartData } from '../../types/dashboard';

interface InteractiveChartProps {
  data: ChartData[];
  title: string;
  type?: 'line' | 'area' | 'bar';
  height?: number;
  onDrillDown?: (dataPoint: ChartData) => void;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({ 
  data, 
  title, 
  type = 'line', 
  height = 300,
  onDrillDown 
}) => {
  const [chartType, setChartType] = useState(type);
  const [selectedPoint, setSelectedPoint] = useState<ChartData | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-secondary border border-tertiary rounded-lg p-4 shadow-xl">
          <p className="text-white font-medium mb-2">{`${label}`}</p>
          <p className="text-primary">
            {`Valor: ${payload[0].value.toLocaleString()}`}
          </p>
          {data.category && (
            <p className="text-gray-400 text-sm">
              {`Categoria: ${data.category}`}
            </p>
          )}
          {onDrillDown && (
            <button
              onClick={() => onDrillDown(data)}
              className="mt-2 text-xs text-primary hover:text-primary/80 underline"
            >
              Ver Detalhes
            </button>
          )}
        </div>
      );
    }
    return null;
  };

  const handlePointClick = (data: any) => {
    setSelectedPoint(data);
    if (onDrillDown) {
      onDrillDown(data);
    }
  };

  const chartTypeButtons = [
    { type: 'line', icon: TrendingUp, label: 'Linha' },
    { type: 'area', icon: Activity, label: 'Área' },
    { type: 'bar', icon: BarChart3, label: 'Barras' }
  ];

  const renderChart = () => {
    const commonProps = {
      data,
      onClick: handlePointClick
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d83dff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d83dff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b1b2f" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#d83dff"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b1b2f" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#d83dff" radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b1b2f" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#d83dff"
              strokeWidth={3}
              dot={{ fill: '#d83dff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#d83dff', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          {chartTypeButtons.map((button) => (
            <button
              key={button.type}
              onClick={() => setChartType(button.type as any)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                chartType === button.type
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-primary hover:bg-tertiary'
              }`}
              title={button.label}
            >
              <button.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {selectedPoint && (
        <div className="mt-4 p-3 bg-tertiary rounded-lg">
          <p className="text-sm text-gray-300">
            Selecionado: <span className="text-white font-medium">{selectedPoint.name}</span>
            {' - '}
            <span className="text-primary">{selectedPoint.value.toLocaleString()}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveChart;