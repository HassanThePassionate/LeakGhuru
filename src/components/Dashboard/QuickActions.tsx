import React from 'react';
import { Plus, Download, Settings, RefreshCw, Mail, Shield, Users, FileText } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionsProps {
  onAction: (actionId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions: QuickAction[] = [
    {
      id: 'add-employee',
      label: 'Add Employee',
      icon: Plus,
      color: 'bg-primary hover:bg-primary/90',
      onClick: () => onAction('add-employee')
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => onAction('generate-report')
    },
    {
      id: 'send-alert',
      label: 'Send Alert',
      icon: Mail,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => onAction('send-alert')
    },
    {
      id: 'security-scan',
      label: 'Security Scan',
      icon: Shield,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => onAction('security-scan')
    },
    {
      id: 'sync-data',
      label: 'Sync Data',
      icon: RefreshCw,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => onAction('sync-data')
    },
    {
      id: 'manage-users',
      label: 'Manage Users',
      icon: Users,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => onAction('manage-users')
    }
  ];

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Quick Actions</h3>
        <Settings className="w-6 h-6 text-primary" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${action.color}`}
            aria-label={action.label}
          >
            <action.icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;