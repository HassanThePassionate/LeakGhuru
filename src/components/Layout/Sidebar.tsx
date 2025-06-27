import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Users,
  Settings,
  Shield,
  LogOut,
  Activity,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const navItems = [
    { to: "/dashboard", icon: BarChart3, label: "Painel de Controlo" },
    { to: "/company", icon: Building2, label: "Perfil da Empresa" },
    { to: "/monitoring", icon: Users, label: "Monitorização" },
    { to: "/settings", icon: Settings, label: "Definições" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-secondary border-r border-tertiary h-screen flex flex-col">
      <div className="p-6 border-b border-tertiary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">LeakGuard</h1>
            <p className="text-sm text-gray-400">Monitor Corporativo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.to)
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-300 hover:bg-tertiary hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-tertiary space-y-4">
        {/* Platform Status */}
        <div className="flex items-center justify-between p-3 bg-tertiary rounded-lg">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <p className="text-white font-medium text-sm">Plataforma</p>
              <p className="text-xs text-gray-400">Operacional</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">Online</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-tertiary hover:text-red-400 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Terminar Sessão</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
