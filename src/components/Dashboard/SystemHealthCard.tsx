import React from 'react';
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemHealthMetric {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  icon: React.ComponentType<any>;
  lastUpdated: Date;
}

interface SystemHealthCardProps {
  metrics: SystemHealthMetric[];
}

const SystemHealthCard: React.FC<SystemHealthCardProps> = ({ metrics }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': 
      case 'critical': return AlertTriangle;
      default: return Activity;
    }
  };

  const overallHealth = metrics.every(m => m.status === 'healthy') ? 'healthy' : 
                       metrics.some(m => m.status === 'critical') ? 'critical' : 'warning';

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">System Health</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              overallHealth === 'healthy' ? 'bg-green-400' :
              overallHealth === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
            } animate-pulse`}></div>
            <span className="text-sm text-gray-400">
              {overallHealth === 'healthy' ? 'All systems operational' :
               overallHealth === 'warning' ? 'Some issues detected' : 'Critical issues detected'}
            </span>
          </div>
        </div>
        <Activity className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => {
          const StatusIcon = getStatusIcon(metric.status);
          const IconComponent = metric.icon;
          
          return (
            <div key={metric.id} className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getStatusColor(metric.status)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-medium">{metric.name}</p>
                  <p className="text-sm text-gray-400">
                    Updated {metric.lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">{metric.value}</span>
                <StatusIcon className={`w-4 h-4 ${
                  metric.status === 'healthy' ? 'text-green-400' :
                  metric.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                }`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealthCard;