import React, { useEffect, useState } from "react";
import {
  Key,
  Copy,
  Mail,
  MessageSquare,
  Calendar,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Settings as SettingsType } from "../types";
import { mockSettings } from "../data/mockData";
import { getCompanyData } from "../api/employees";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsType>(mockSettings);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const settingData = async () => {
      const data = await getCompanyData();
      setSettings(data);
    };
    settingData();
  });

  const copyAccessKey = async () => {
    try {
      await navigator.clipboard.writeText(settings.accessKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar chave de acesso", err);
    }
  };

  const handleContactSupport = () => {
    window.open(
      "https://wa.me/351937934254?text=Preciso%20de%20Apoio%20ao%20Cliente",
      "_blank"
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Definições</h1>
        <p className="text-gray-400">
          Gerir as suas preferências de conta e definições de segurança
        </p>
      </div>

      {/* Account Information */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Informações da Conta</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Conta
            </label>
            <div className="bg-tertiary rounded-lg p-4 border border-gray-600">
              <p className="text-white font-medium">{settings.name}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Chave de Acesso
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-tertiary rounded-lg p-4 border border-gray-600">
                <p className="text-white font-mono text-sm break-all">
                  {settings.accessKey}
                </p>
              </div>
              <button
                onClick={copyAccessKey}
                className="flex items-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Mantenha a sua chave de acesso segura. Não a partilhe com pessoal
              não autorizado.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">
            Preferências de Notificação
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-medium">Relatórios Semanais</p>
                <p className="text-sm text-gray-400">
                  Receber resumos semanais de monitorização
                </p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input id="switch1" type="checkbox" className="peer sr-only" />
              <label htmlFor="switch1" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border bg-gray-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-medium">Notificações SMS</p>
                <p className="text-sm text-gray-400">
                  Receber alertas SMS instantâneos para eventos críticos
                </p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input id="switch2" type="checkbox" className="peer sr-only" />
              <label htmlFor="switch2" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border bg-gray-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-tertiary rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-white font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-400">
                  Receber alertas e atualizações por email
                </p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input id="switch3" type="checkbox" className="peer sr-only" />
              <label htmlFor="switch3" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border bg-gray-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-white">Suporte</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium mb-1">Precisa de Ajuda?</p>
            <p className="text-sm text-gray-400">
              Contacte a nossa equipa de suporte para assistência
            </p>
          </div>
          <button
            onClick={handleContactSupport}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Contactar Suporte
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Key className="w-6 h-6 text-yellow-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              Aviso de Segurança
            </h3>
            <p className="text-yellow-200 text-sm leading-relaxed">
              A sua chave de acesso é o método principal de autenticação para
              esta plataforma. Certifique-se de que permanece confidencial e só
              é acessível a pessoal autorizado. Se suspeitar que a sua chave foi
              comprometida, contacte o suporte imediatamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
