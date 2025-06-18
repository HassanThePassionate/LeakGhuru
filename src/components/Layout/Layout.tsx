import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAccessibility } from '../../hooks/useAccessibility';

interface LayoutProps {
  children: React.ReactNode;
  notifications?: any[];
  onNotificationAction?: (action: string, id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  notifications = [], 
  onNotificationAction 
}) => {
  useAccessibility();

  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header 
          notifications={notifications}
          onNotificationAction={onNotificationAction}
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