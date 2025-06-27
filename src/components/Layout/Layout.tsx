/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAccessibility } from "../../hooks/useAccessibility";
import { getCompanyData } from "../../api/employees";

interface LayoutProps {
  children: React.ReactNode;
  notifications?: any[];
  onNotificationAction?: (action: string, id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  notifications = [],
  onNotificationAction,
}) => {
  useAccessibility();
  const [name, setName] = useState("");
  useEffect(() => {
    const companyName = async () => {
      const data = await getCompanyData();
      setName(data.name);
    };
    companyName();
  }, []);
  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          notifications={notifications}
          onNotificationAction={onNotificationAction}
          name={name}
        />
        <main
          className="flex-1 overflow-auto p-6 focus:outline-none"
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
