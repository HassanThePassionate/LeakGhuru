import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Key, 
  Info, 
  Search, 
  ChevronDown, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Copy,
  RefreshCw,
  Power,
  PowerOff,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Save
} from 'lucide-react';

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
  emailsMonitored: number;
  totalEmployees: number;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  companyId: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

interface NewCompany {
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
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
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
      lastActivity: new Date('2024-01-15T14:30:00'),
      emailsMonitored: 124536,
      totalEmployees: 247
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
      lastActivity: new Date('2024-01-15T13:45:00'),
      emailsMonitored: 98742,
      totalEmployees: 189
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
      lastActivity: new Date('2024-01-10T09:20:00'),
      emailsMonitored: 87321,
      totalEmployees: 156
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
      createdAt: new Date('2023-02-01'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Product Manager',
      email: 'michael.chen@techcorp.com',
      phone: '(+351) 923 456 789',
      companyId: '1',
      createdAt: new Date('2023-02-15'),
      status: 'active'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Security Analyst',
      email: 'emily.rodriguez@techcorp.com',
      phone: '(+351) 934 567 890',
      companyId: '1',
      createdAt: new Date('2023-03-01'),
      status: 'active'
    },
    {
      id: '4',
      name: 'Robert Smith',
      position: 'Financial Analyst',
      email: 'robert.smith@financemax.com',
      phone: '(+351) 945 678 901',
      companyId: '2',
      createdAt: new Date('2023-04-01'),
      status: 'active'
    },
    {
      id: '5',
      name: 'Lisa Brown',
      position: 'Investment Manager',
      email: 'lisa.brown@financemax.com',
      phone: '(+351) 956 789 012',
      companyId: '2',
      createdAt: new Date('2023-04-15'),
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'info' | 'key'>('info');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [newCompany, setNewCompany] = useState<NewCompany>({
    name: '',
    industry: '',
    employeeCount: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    foundingDate: '',
    responsiblePerson: '',
    description: ''
  });

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

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const generateAccessKey = (companyName: string): string => {
    const cleanName = companyName.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `LEAK-MON-2024-${cleanName}-SECURE-KEY-${randomNum}`;
  };

  const regenerateAccessKey = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      const newKey = generateAccessKey(company.name);
      setCompanies(prev => 
        prev.map(c => 
          c.id === companyId 
            ? { ...c, accessKey: newKey }
            : c
        )
      );
    }
  };

  const toggleCompanyStatus = (companyId: string) => {
    setCompanies(prev => 
      prev.map(c => 
        c.id === companyId 
          ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
          : c
      )
    );
  };

  const handleInputChange = (field: keyof NewCompany, value: string) => {
    setNewCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.startsWith('351')) {
      const remaining = numbers.slice(3);
      if (remaining.length <= 3) {
        return `(+351) ${remaining}`;
      } else if (remaining.length <= 6) {
        return `(+351) ${remaining.slice(0, 3)} ${remaining.slice(3)}`;
      } else {
        return `(+351) ${remaining.slice(0, 3)} ${remaining.slice(3, 6)} ${remaining.slice(6, 9)}`;
      }
    }
    
    if (numbers.length <= 3) {
      return `(+351) ${numbers}`;
    } else if (numbers.length <= 6) {
      return `(+351) ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else {
      return `(+351) ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone', formatted);
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      const newCompanyData: Company = {
        id: (companies.length + 1).toString(),
        ...newCompany,
        accessKey: generateAccessKey(newCompany.name),
        status: 'active',
        createdAt: new Date(),
        lastActivity: new Date(),
        emailsMonitored: 0,
        totalEmployees: 0
      };

      setCompanies(prev => [...prev, newCompanyData]);
      setNewCompany({
        name: '',
        industry: '',
        employeeCount: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        foundingDate: '',
        responsiblePerson: '',
        description: ''
      });
      setIsSaving(false);
      setIsAddModalOpen(false);
    }, 1000);
  };

  const handleEditCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;

    setIsSaving(true);

    setTimeout(() => {
      setCompanies(prev => 
        prev.map(c => 
          c.id === selectedCompany.id 
            ? { ...c, ...newCompany }
            : c
        )
      );
      setIsSaving(false);
      setIsEditModalOpen(false);
      setSelectedCompany(null);
    }, 1000);
  };

  const openEditModal = (company: Company) => {
    setSelectedCompany(company);
    setNewCompany({
      name: company.name,
      industry: company.industry,
      employeeCount: company.employeeCount,
      website: company.website,
      email: company.email,
      phone: company.phone,
      address: company.address,
      foundingDate: company.foundingDate,
      responsiblePerson: company.responsiblePerson,
      description: company.description
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (company: Company) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      setCompanies(companies.filter(c => c.id !== companyToDelete.id));
      setIsDeleteModalOpen(false);
      setCompanyToDelete(null);
    }
  };

  const isFormValid = newCompany.name && newCompany.industry && newCompany.email && newCompany.responsiblePerson;

  const industries = [
    'Tecnologia',
    'Finanças',
    'Saúde',
    'Educação',
    'Retalho',
    'Manufatura',
    'Consultoria',
    'Imobiliário',
    'Turismo',
    'Outros'
  ];

  const employeeCountOptions = [
    '1-10',
    '11-50',
    '51-100',
    '101-250',
    '250-500',
    '500+'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestão de Empresas</h1>
          <p className="text-gray-400">Gerir empresas clientes e seus funcionários</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Empresa</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-white">{companies.length}</p>
              <p className="text-sm text-gray-400">Total de Empresas</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{companies.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-gray-400">Empresas Ativas</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{companies.reduce((sum, c) => sum + c.totalEmployees, 0)}</p>
              <p className="text-sm text-gray-400">Total de Funcionários</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">{(companies.reduce((sum, c) => sum + c.emailsMonitored, 0) / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-400">Emails Monitorizados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-secondary rounded-xl p-6 border border-tertiary">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar empresas por nome, setor ou email..."
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
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{company.industry}</span>
                      <span>•</span>
                      <span>{company.employeeCount} funcionários</span>
                      <span>•</span>
                      <span>{company.emailsMonitored.toLocaleString()} emails</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(company);
                      }}
                      className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                      title="Editar Empresa"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompanyStatus(company.id);
                      }}
                      className={`p-2 transition-colors duration-200 ${
                        company.status === 'active' 
                          ? 'text-green-400 hover:text-green-300' 
                          : 'text-red-400 hover:text-red-300'
                      }`}
                      title={company.status === 'active' ? 'Desativar Empresa' : 'Ativar Empresa'}
                    >
                      {company.status === 'active' ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(company);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                      title="Eliminar Empresa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                      activeTab === 'users'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Funcionários ({getCompanyEmployees(company.id).length})</span>
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
                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Building2 className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Nome da Empresa</p>
                              <p className="text-white font-medium">{company.name}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Mail className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Email</p>
                              <p className="text-white font-medium">{company.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Phone className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Telefone</p>
                              <p className="text-white font-medium">{company.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Globe className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Website</p>
                              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium">
                                {company.website}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Pessoa Responsável</p>
                              <p className="text-white font-medium">{company.responsiblePerson}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Data de Fundação</p>
                              <p className="text-white font-medium">{new Date(company.foundingDate).toLocaleDateString('pt-PT')}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Building2 className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Setor</p>
                              <p className="text-white font-medium">{company.industry}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-gray-400">Número de Funcionários</p>
                              <p className="text-white font-medium">{company.employeeCount}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-tertiary rounded-lg">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-primary mt-1" />
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Morada</p>
                              <p className="text-white">{company.address}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-tertiary rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Info className="w-5 h-5 text-primary mt-1" />
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Descrição</p>
                              <p className="text-white">{company.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Cliente desde</p>
                          <p className="text-white">{company.createdAt.toLocaleDateString('pt-PT')}</p>
                        </div>
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Última Atividade</p>
                          <p className="text-white">
                            {company.lastActivity.toLocaleDateString('pt-PT')} às {company.lastActivity.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Estado da Conta</p>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${company.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                            <span className={company.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                              {company.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'users' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-white">
                          Funcionários Monitorizados ({getCompanyEmployees(company.id).length})
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Emails monitorizados: {company.emailsMonitored.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {getCompanyEmployees(company.id).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getCompanyEmployees(company.id).map((employee) => (
                            <div key={employee.id} className="bg-tertiary rounded-lg p-4 hover:bg-tertiary/80 transition-colors duration-200">
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
                                <div className="flex items-center justify-between pt-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    employee.status === 'active' 
                                      ? 'bg-green-500/20 text-green-400' 
                                      : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {employee.createdAt.toLocaleDateString('pt-PT')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <p className="text-gray-400">Nenhum funcionário cadastrado</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Os funcionários serão adicionados quando a empresa começar a usar a plataforma
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'key' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-white">Gestão de Chave de Acesso</h4>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-primary" />
                          <span className="text-sm text-gray-400">Segurança Máxima</span>
                        </div>
                      </div>

                      <div className="bg-tertiary rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-gray-300">Chave de Acesso Atual</label>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(company.accessKey, company.id)}
                              className="flex items-center space-x-2 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors duration-200"
                            >
                              <Copy className="w-4 h-4" />
                              <span>{copiedKey === company.id ? 'Copiado!' : 'Copiar'}</span>
                            </button>
                            <button
                              onClick={() => regenerateAccessKey(company.id)}
                              className="flex items-center space-x-2 px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors duration-200"
                            >
                              <RefreshCw className="w-4 h-4" />
                              <span>Regenerar</span>
                            </button>
                          </div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-gray-600">
                          <code className="text-primary font-mono text-sm break-all">{company.accessKey}</code>
                        </div>
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                            <div className="text-xs text-yellow-200">
                              <p className="font-medium mb-1">Aviso de Segurança:</p>
                              <p>Esta chave permite acesso completo à plataforma para esta empresa. Mantenha-a segura e partilhe apenas com pessoal autorizado.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Chave Criada</p>
                          <p className="text-white">{company.createdAt.toLocaleDateString('pt-PT')}</p>
                        </div>
                        <div className="bg-tertiary rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-2">Último Acesso</p>
                          <p className="text-white">
                            {company.lastActivity.toLocaleDateString('pt-PT')} às {company.lastActivity.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      <div className="bg-tertiary rounded-lg p-4">
                        <h5 className="text-white font-medium mb-3">Ações de Segurança</h5>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleCompanyStatus(company.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              company.status === 'active'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            {company.status === 'active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                            <span>{company.status === 'active' ? 'Desativar Conta' : 'Ativar Conta'}</span>
                          </button>
                          <span className="text-sm text-gray-400">
                            {company.status === 'active' 
                              ? 'Desativar irá bloquear o acesso à plataforma' 
                              : 'Ativar irá restaurar o acesso à plataforma'
                            }
                          </span>
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
          <p className="text-gray-400">Tente ajustar os termos de pesquisa ou adicione uma nova empresa.</p>
        </div>
      )}

      {/* Add Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-2xl border border-tertiary animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <h3 className="text-xl font-bold text-white">Adicionar Nova Empresa</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    placeholder="Nome da empresa"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Setor *
                  </label>
                  <select
                    value={newCompany.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  >
                    <option value="">Selecionar setor</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Funcionários
                  </label>
                  <select
                    value={newCompany.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Selecionar faixa</option>
                    {employeeCountOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={newCompany.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    placeholder="https://exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    placeholder="contacto@empresa.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={newCompany.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    placeholder="(+351) 000 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data de Fundação
                  </label>
                  <input
                    type="date"
                    value={newCompany.foundingDate}
                    onChange={(e) => handleInputChange('foundingDate', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pessoa Responsável *
                  </label>
                  <input
                    type="text"
                    value={newCompany.responsiblePerson}
                    onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    placeholder="Nome do responsável"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Morada
                </label>
                <textarea
                  value={newCompany.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Morada completa da empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição da Empresa
                </label>
                <textarea
                  value={newCompany.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Breve descrição da empresa e suas atividades"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !isFormValid}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'A criar...' : 'Criar Empresa'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Company Modal */}
      {isEditModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-2xl border border-tertiary animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <h3 className="text-xl font-bold text-white">Editar Empresa</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditCompany} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Setor *
                  </label>
                  <select
                    value={newCompany.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Funcionários
                  </label>
                  <select
                    value={newCompany.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  >
                    {employeeCountOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={newCompany.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={newCompany.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data de Fundação
                  </label>
                  <input
                    type="date"
                    value={newCompany.foundingDate}
                    onChange={(e) => handleInputChange('foundingDate', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pessoa Responsável *
                  </label>
                  <input
                    type="text"
                    value={newCompany.responsiblePerson}
                    onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Morada
                </label>
                <textarea
                  value={newCompany.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição da Empresa
                </label>
                <textarea
                  value={newCompany.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !isFormValid}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'A guardar...' : 'Guardar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && companyToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-md border border-tertiary animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Confirmar Eliminação</h3>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Tem a certeza de que deseja eliminar <span className="font-semibold text-white">{companyToDelete.name}</span>?
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Esta ação não pode ser desfeita. Todos os dados da empresa, incluindo funcionários e histórico de monitorização, serão permanentemente removidos.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium text-sm">Dados que serão eliminados:</p>
                    <ul className="text-red-200 text-sm mt-2 space-y-1">
                      <li>• Informações da empresa</li>
                      <li>• {getCompanyEmployees(companyToDelete.id).length} funcionários monitorizados</li>
                      <li>• {companyToDelete.emailsMonitored.toLocaleString()} emails monitorizados</li>
                      <li>• Histórico de atividades</li>
                      <li>• Chave de acesso</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar Empresa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;