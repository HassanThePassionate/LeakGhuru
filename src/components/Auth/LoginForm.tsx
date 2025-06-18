import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Key } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (login(accessKey)) {
        setError('');
      } else {
        setError('Chave de acesso inválida. Verifique a sua chave e tente novamente.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setAccessKey('LEAK-MON-2024-TECH-CORP-SECURE-KEY-9876');
  };

  const handleAdminLogin = () => {
    setAccessKey('LEAK-MON-2024-ADMIN-MASTER-KEY-0000');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">LeakGuard</h1>
          <p className="text-gray-400">Plataforma de Monitorização de Fugas de Dados Corporativos</p>
        </div>

        <div className="bg-secondary rounded-2xl p-8 shadow-2xl border border-tertiary animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="accessKey" className="block text-sm font-medium text-gray-300 mb-2">
                Chave de Acesso
              </label>
              <div className="relative">
                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  id="accessKey"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full bg-tertiary text-white pl-10 pr-12 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-all duration-200"
                  placeholder="Introduza a sua chave de acesso"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm animate-slide-up">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !accessKey}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? 'A autenticar...' : 'Aceder à Plataforma'}
            </button>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
              >
                Usar Chave de Demonstração (Cliente)
              </button>
              <button
                type="button"
                onClick={handleAdminLogin}
                className="w-full text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors duration-200"
              >
                Usar Chave de Administrador
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-tertiary">
            <p className="text-xs text-gray-500 text-center">
              Precisa de ajuda? Contacte o administrador do sistema para suporte com a chave de acesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;