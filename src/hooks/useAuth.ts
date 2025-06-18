import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessKey: string | null;
  login: (key: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('accessKey');
    if (storedKey && validateAccessKey(storedKey)) {
      setAccessKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  const validateAccessKey = (key: string): boolean => {
    // Simple validation - in production, this would be validated against a backend
    return key.startsWith('LEAK-MON-') && key.length >= 20;
  };

  const login = (key: string): boolean => {
    if (validateAccessKey(key)) {
      setAccessKey(key);
      setIsAuthenticated(true);
      localStorage.setItem('accessKey', key);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAccessKey(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessKey');
  };

  return {
    isAuthenticated,
    accessKey,
    login,
    logout,
  };
};