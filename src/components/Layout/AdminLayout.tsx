import React from 'react';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import { useAccessibility } from '../../hooks/useAccessibility';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  useAccessibility();

  return (
    <div className="flex h-screen bg-background text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main 
          className="flex-1 overflow-auto p-6 focus:outline-none" 
          tabIndex={-1}
          role="main"
          aria-label="Admin main content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;