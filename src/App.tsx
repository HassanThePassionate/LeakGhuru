import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import CompanyProfile from './pages/CompanyProfile';
import Monitoring from './pages/Monitoring';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import CompanyManagement from './pages/admin/CompanyManagement';
import AdminSettings from './pages/admin/AdminSettings';

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, accessKey } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Check if it's an admin key
  const isAdmin = accessKey?.includes('ADMIN') || accessKey === 'LEAK-MON-2024-ADMIN-MASTER-KEY-0000';

  if (isAdmin) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<CompanyManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <ProtectedRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;