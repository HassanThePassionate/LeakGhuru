import React from "react";
import { User } from "lucide-react";
import { NotificationData } from "../../types/dashboard";

interface HeaderProps {
  notifications?: NotificationData[];
  onNotificationAction?: (action: string, id: string) => void;
  name?: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header
      className="bg-secondary border-b border-tertiary px-6 py-4"
      role="banner"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="sr-only">LeakGuard Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {name || "TechCorp Solutions"}
              </p>
              <p className="text-xs text-gray-400">Premium Account</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
