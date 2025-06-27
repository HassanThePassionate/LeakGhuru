import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./components/AuthProvider";

import LoginForm from "./components/Auth/LoginForm";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";
import Monitoring from "./pages/Monitoring";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CompanyManagement from "./pages/admin/CompanyManagement";
import AdminSettings from "./pages/admin/AdminSettings";

const ProtectedRoutes: React.FC = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 👨‍💼 If admin → show admin layout + routes
  if (isAdmin) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<CompanyManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          {/* Optional: fallback */}
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </AdminLayout>
    );
  }

  // 🧑‍💻 If company user → show company layout + routes
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<CompanyProfile />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/settings" element={<Settings />} />
        {/* Optional: fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
