import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Database, Mail, Shield, Bell } from 'lucide-react';

interface AdminSettings {
  platformName: string;
  maxCompanies: number;
  emailNotifications: boolean;
  systemAlerts: boolean;
  dataRetentionDays: number;
  backupFrequency: string;
  maintenanceMode: boolean;
}

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings>({
    platformName: 'LeakGuard',
    maxCompanies: 100,
    emailNotifications: true,
    systemAlerts: true,
    dataRetentionDays: 365,
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message
    }, 1000);
  };

  const handleToggle = (key: keyof AdminSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key: keyof AdminSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Configurações do Sistema</h1>
          <p className="text-gray-400">Gerir configurações globais da plataforma</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Guardando...' : 'Guardar Alterações'}</span>
        </button>
      </div>

      {/* Platform Settings */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Configurações da Plataforma</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Plataforma
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleInputChange('platformName', e.target.value)}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Máximo de Empresas
            </label>
            <input
              type="number"
              value={settings.maxCompanies}
              onChange={(e) => handleInputChange('maxCompanies', parseInt(e.target.value))}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Retenção de Dados (dias)
            </label>
            <input
              type="number"
              value={settings.dataRetentionDays}
              onChange={(e) => handleInputChange('dataRetentionDays', parseInt(e.target.value))}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Frequência de Backup
            </label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
            >
              <option value="hourly">A cada hora</option>
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Configurações de Notificação</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-400">Enviar alertas por email para administradores</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.emailNotifications ? 'bg-primary' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-medium">Alertas do Sistema</p>
                <p className="text-sm text-gray-400">Alertas automáticos para eventos críticos</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('systemAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.systemAlerts ? 'bg-primary' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.systemAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Estado do Sistema</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-white font-medium">Modo de Manutenção</p>
                <p className="text-sm text-gray-400">Ativar para bloquear acesso de clientes</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('maintenanceMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-tertiary rounded-lg p-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Estado do Servidor</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>

            <div className="bg-tertiary rounded-lg p-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Base de Dados</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Conectada</span>
              </div>
            </div>

            <div className="bg-tertiary rounded-lg p-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Último Backup</p>
              <span className="text-white text-sm">Hoje às 03:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      {settings.maintenanceMode && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-red-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Modo de Manutenção Ativo</h3>
              <p className="text-red-200 text-sm leading-relaxed">
                O modo de manutenção está ativo. Os clientes não conseguem aceder à plataforma. 
                Desative quando a manutenção estiver concluída.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;