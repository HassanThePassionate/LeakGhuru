import React, { useState } from 'react';
import { Building2, Users, Key, Info, Search, ChevronDown, Eye, Edit3, Trash2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  employeeCount: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  foundingDate: string;
  responsiblePerson: string;
  description: string;
  accessKey: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastActivity: Date;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  companyId: string;
  createdAt: Date;
}

const CompanyManagement: React.FC = () => {
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechCorp Solutions',
      industry: 'Tecnologia',
      employeeCount: '250-500',
      website: 'https://techcorp.com',
      email: 'contact@techcorp.com',
      phone: '(+351) 213 456 789',
      address: '123 Tech Street, Silicon Valley, CA 94000',
      foundingDate: '2015-03-15',
      responsiblePerson: 'John Anderson',
      description: 'Leading technology solutions provider specializing in enterprise software development and cybersecurity services.',
      accessKey: 'LEAK-MON-2024-TECH-CORP-SECURE-KEY-9876',
      status: 'active',
      createdAt: new Date('2023-01-15'),
      lastActivity: new Date('2024-01-15T14:30:00')
    },
    {
      id: '2',
      name: 'FinanceMax Ltd',
      industry: 'Finanças',
      employeeCount: '100-250',
      website: 'https://financemax.com',
      email: 'info@financemax.com',
      phone: '(+351) 214 567 890',
      address: '456 Finance Ave, New York, NY 10001',
      foundingDate: '2018-07-22',
      responsiblePerson: 'Sarah Williams',
      description: 'Comprehensive financial services and investment management solutions.',
      accessKey: 'LEAK-MON-2024-FINANCE-MAX-SECURE-KEY-5432',
      status: 'active',
      createdAt: new Date('2023-03-20'),
      lastActivity: new Date('2024-01-15T13:45:00')
    },
    {
      id: '3',
      name: 'HealthCare Pro',
      industry: 'Saúde',
      employeeCount: '50-100',
      website: 'https://healthcarepro.com',
      email: 'contact@healthcarepro.com',
      phone: '(+351) 215 678 901',
      address: '789 Medical Center Dr, Boston, MA 02101',
      foundingDate: '2020-01-10',
      responsiblePerson: 'Dr. Michael Chen',
      description: 'Advanced healthcare management and patient care solutions.',
      accessKey: 'LEAK-MON-2024-HEALTH-PRO-SECURE-KEY-1234',
      status: 'inactive',
      createdAt: new Date('2023-06-10'),
      lastActivity: new Date('2024-01-10T09:20:00')
    }
  ]);

  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Senior Developer',
      email: 'sarah.johnson@techcorp.com',
      phone: '(+351) 912 345 678',
      companyId: '1',
      createdAt: new Date('2023-02-01')
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Product Manager',
      email: 'michael.chen@techcorp.com',
      phone: '(+351) 923 456 789',
      companyId: '1',
      createdAt: new Date('2023-02-15')
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Security Analyst',
      email: 'emily.rodriguez@techcorp.com',
      phone: '(+351) 934 567 890',
      companyId: '1',
      createdAt: new Date('2023-03-01')
    },
    {
      id: '4',
      name: 'Robert Smith',
      position: 'Financial Analyst',
      email: 'robert.smith@financemax.com',
      phone: '(+351) 945 678 901',
      companyId: '2',
      createdAt: new Date('2023-04-01')
    },
    {
      id: '5',
      name: 'Lisa Brown',
      position: 'Investment Manager',
      email: 'lisa.brown@financemax.com',
      phone: '(+351) 956 789 012',
      companyId: '2',
      createdAt: new Date('2023-04-15')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'info' | 'key'>('users');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompanyEmployees = (companyId: string) => {
    return employees.filter(emp => emp.companyId === companyId);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setExpandedCompany(expandedCompany === company.id ? null : company.id);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestão de Empresas</h1>
          <p className="text-gray-400">Gerir empresas clientes e seus funcionários</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-tertiary text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Companies List */}
      <div className="space-y-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-secondary rounded-xl border border-tertiary overflow-hidden">
            {/* Company Header */}
            <div 
              className="p-6 cursor-pointer hover:bg-tertiary/30 transition-colors duration-200"
              onClick={() => handleCompanySelect(company)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{company.name}</h3>
                    <p className="text-gray-400">{company.industry} • {company.employeeCount} funcionários</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    company.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {company.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedCompany === company.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCompany === company.id && (
              <div className="border-t border-tertiary">
                {/* Tabs */}
                <div className="flex border-b border-tertiary">
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === 'users'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Usuários</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === 'info'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>Informações</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('key')}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === 'key'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>Chave de Acesso</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'users' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Funcionários ({getCompanyEmployees(company.id).length})
                      </h4>
                      {getCompanyEmployees(company.id).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getCompanyEmployees(company.id).map((employee) => (
                            <div key={employee.id} className="bg-tertiary rounded-lg p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">{employee.name}</p>
                                  <p className="text-gray-400 text-sm">{employee.position}</p>
                                </div>
                              </div>
                              <div className="space-y-1 text-sm">
                                <p className="text-gray-300">{employee.email}</p>
                                <p className="text-gray-400">{employee.phone}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <p className="text-gray-400">Nenhum funcionário cadastrado</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Informações da Empresa</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Empresa</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Indústria</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.industry}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.website}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.phone}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Pessoa Responsável</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.responsiblePerson}</div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.address}</div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                          <div className="bg-tertiary rounded-lg p-3 text-white">{company.description}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'key' && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Chave de Acesso</h4>
                      <div className="bg-tertiary rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-gray-300">Chave de Acesso da Empresa</label>
                          <button
                            onClick={() => copyToClipboard(company.accessKey)}
                            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors duration-200"
                          >
                            Copiar
                          </button>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-gray-600">
                          <code className="text-primary font-mono text-sm break-all">{company.accessKey}</code>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Esta chave permite acesso completo à plataforma para esta empresa. Mantenha-a segura.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Data de Criação</p>
                          <p className="text-white">{company.createdAt.toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Última Atividade</p>
                          <p className="text-white">
                            {company.lastActivity.toLocaleDateString('pt-BR')} às {company.lastActivity.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="bg-secondary rounded-xl p-12 border border-tertiary text-center">
          <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Nenhuma empresa encontrada</h3>
          <p className="text-gray-400">Tente ajustar os termos de pesquisa.</p>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;