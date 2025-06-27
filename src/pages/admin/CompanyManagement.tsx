/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Building2,
  Users,
  Key,
  Info,
  Search,
  ChevronDown,
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
  Save,
} from "lucide-react";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getAllCompaniesEmployee,
  regenerateAccessKeyAPI,
  toggleCompanyStatusAPI,
  updateCompany,
} from "../../api/company";
import { getEmployeeDataByCompany } from "../../api/employees";

interface Company {
  _id: string;
  id: string;
  name: string;
  sector: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  foundingDate: string;
  responsiblePerson: string;
  numberOfEmployees: string;
  description: string;
  accessKey: string;
  status: "active" | "inactive";
  createdAt: Date;
  lastActivity: Date;
  emailsMonitored: number;
  totalEmployees: number;
}

interface Employee {
  _id?: string;
  id: string;
  name: string;
  position: string;
  jobRole: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
  status: "active" | "inactive";
}

interface NewCompany {
  _id: string;
  name: string;
  sector: string;
  numberOfEmployees: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  foundingDate: string;
  responsiblePerson: string;
  description: string;
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [totalEmployees, setTotalEmployees] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "info" | "key">("info");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newCompany, setNewCompany] = useState<NewCompany>({
    _id: "",
    name: "",
    sector: "",
    numberOfEmployees: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    foundingDate: "",
    responsiblePerson: "",
    description: "",
  });

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await getAllCompanies();
        console.log(data);
        setCompanies(data);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
      }
    };

    getCompanies();
  }, []);
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const total = await getAllCompaniesEmployee();
        setTotalEmployees(total);
      } catch (err) {
        console.error("Error fetching total employees:", err);
      }
    };

    fetchTotalEmployees();
  }, []);

  useEffect(() => {
    if (companies.length === 0) return;

    const fetchEmployeesForCompanies = async () => {
      try {
        const allEmployees: Employee[] = [];

        for (const company of companies) {
          const employeesData = await getEmployeeDataByCompany(company._id);
          allEmployees.push(...employeesData);
        }

        setEmployees(allEmployees);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch employees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesForCompanies();
  }, [companies]);

  const getCompanyEmployees = (companyId: string): Employee[] => {
    return employees.filter((emp) => emp.company === companyId);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setExpandedCompany(expandedCompany === company._id ? null : company._id);
  };

  const copyToClipboard = async (text: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const regenerateAccessKey = async (companyId: string) => {
    setRegeneratingKey(companyId);
    try {
      const { accessKey } = await regenerateAccessKeyAPI(companyId);
      setCompanies((prev) =>
        prev.map((c) => (c._id === companyId ? { ...c, accessKey } : c))
      );
    } catch (err: any) {
      console.error("Failed to regenerate access key:", err.message);
      alert(err.message || "Failed to regenerate access key");
    } finally {
      setRegeneratingKey(null);
    }
  };

  const toggleCompanyStatus = async (companyId: string) => {
    try {
      const newStatus = await toggleCompanyStatusAPI(companyId);
      console.log(newStatus);
      setCompanies((prev) =>
        prev.map((c) =>
          c._id === companyId
            ? { ...c, status: c.status === "active" ? "inactive" : "active" }
            : c
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (field: keyof NewCompany, value: string) => {
    setNewCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("351")) {
      const remaining = numbers.slice(3);
      if (remaining.length <= 3) {
        return `(+351) ${remaining}`;
      } else if (remaining.length <= 6) {
        return `(+351) ${remaining.slice(0, 3)} ${remaining.slice(3)}`;
      } else {
        return `(+351) ${remaining.slice(0, 3)} ${remaining.slice(
          3,
          6
        )} ${remaining.slice(6, 9)}`;
      }
    }

    if (numbers.length <= 3) {
      return `(+351) ${numbers}`;
    } else if (numbers.length <= 6) {
      return `(+351) ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else {
      return `(+351) ${numbers.slice(0, 3)} ${numbers.slice(
        3,
        6
      )} ${numbers.slice(6, 9)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange("phone", formatted);
  };

  const handleAddCompany = async () => {
    setIsSaving(true);
    console.log("Before submit - foundingDate:", newCompany.foundingDate);

    try {
      const payload = {
        ...newCompany,
        sector: newCompany.sector,
        foundingDate: newCompany.foundingDate,
        numberOfEmployees: newCompany.numberOfEmployees,
        totalEmployees: 0,
      };

      console.log(payload);
      const data = await createCompany(payload);

      const newCompanyData: Company = {
        ...payload,
        id: (companies.length + 1).toString(), // you can use MongoDB _id if returned
        accessKey: data.accessKey,
        status: "active",
        createdAt: new Date(),
        lastActivity: new Date(),
        foundingDate: data.foundingDate,
        sector: data.sector,
        emailsMonitored: 0,
        totalEmployees: 0,
      };

      setCompanies((prev) => [...prev, newCompanyData]);

      // Reset Form
      setNewCompany({
        _id: "",
        name: "",
        sector: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        foundingDate: "",
        responsiblePerson: "",
        description: "",
        numberOfEmployees: "",
      });

      setIsAddModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCompany = async () => {
    if (!selectedCompany) return;

    setIsSaving(true);

    try {
      const updatedCompany = await updateCompany(
        selectedCompany._id,
        newCompany
      );
      setCompanies((prev) =>
        prev.map((c) =>
          c._id === selectedCompany._id ? { ...c, ...updatedCompany } : c
        )
      );
      setIsEditModalOpen(false);
      setSelectedCompany(null);
    } catch (err: any) {
      alert(err.message || "Failed to update company");
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = (company: Company) => {
    setSelectedCompany(company);
    setNewCompany({
      _id: company._id,
      name: company.name,
      sector: company.sector,
      numberOfEmployees: company.numberOfEmployees,
      website: company.website,
      email: company.email,
      phone: company.phone,
      address: company.address,
      foundingDate: company.foundingDate,
      responsiblePerson: company.responsiblePerson,
      description: company.description,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (company: Company) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;

    try {
      await deleteCompany(companyToDelete._id);
      setCompanies((prev) => prev.filter((c) => c._id !== companyToDelete._id));
      setIsDeleteModalOpen(false);
      setCompanyToDelete(null);
    } catch (err: any) {
      console.error("Failed to delete company:", err.message);
      alert(err.message || "Failed to delete company");
    }
  };

  const isFormValid =
    newCompany.name &&
    newCompany.sector &&
    newCompany.email &&
    newCompany.responsiblePerson;

  const industries = [
    "Tecnologia",
    "Finanças",
    "Saúde",
    "Educação",
    "Retalho",
    "Manufatura",
    "Consultoria",
    "Imobiliário",
    "Turismo",
    "Outros",
  ];

  const employeeCountOptions = [
    "1-10",
    "11-50",
    "51-100",
    "101-250",
    "250-500",
    "500+",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestão de Empresas
          </h1>
          <p className="text-gray-400">
            Gerir empresas clientes e seus funcionários
          </p>
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
              <p className="text-2xl font-bold text-white">
                {companies.length}
              </p>
              <p className="text-sm text-gray-400">Total de Empresas</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {companies.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-gray-400">Empresas Ativas</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{totalEmployees}</p>
              <p className="text-sm text-gray-400">Total de Funcionários</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {(
                  companies.reduce((sum, c) => sum + c.emailsMonitored, 0) /
                  1000000
                ).toFixed(1)}
                M
              </p>
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
        {filteredCompanies.map((company) => {
          return (
            <div
              key={company._id}
              className="bg-secondary rounded-xl border border-tertiary overflow-hidden"
            >
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
                      <h3 className="text-xl font-bold text-white">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{company.sector}</span>
                        <span>•</span>
                        <span>{company.numberOfEmployees} funcionários</span>
                        <span>•</span>
                        <span>
                          {company.emailsMonitored.toLocaleString()} emails
                        </span>
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
                          toggleCompanyStatus(company._id);
                        }}
                        className={`p-2 transition-colors duration-200 ${
                          company.status === "active"
                            ? "text-green-400 hover:text-green-300"
                            : "text-red-400 hover:text-red-300"
                        }`}
                        title={
                          company.status === "active"
                            ? "Desativar Empresa"
                            : "Ativar Empresa"
                        }
                      >
                        {company.status === "active" ? (
                          <Power className="w-4 h-4" />
                        ) : (
                          <PowerOff className="w-4 h-4" />
                        )}
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        company.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {company.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        expandedCompany === company._id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCompany === company._id && (
                <div className="border-t border-tertiary">
                  {/* Tabs */}
                  <div className="flex border-b border-tertiary">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                        activeTab === "info"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Info className="w-4 h-4" />
                      <span>Informações</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("users")}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                        activeTab === "users"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>
                        Funcionários ({getCompanyEmployees(company._id).length})
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("key")}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                        activeTab === "key"
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>Chave de Acesso</span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === "info" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Building2 className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  Nome da Empresa
                                </p>
                                <p className="text-white font-medium">
                                  {company.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Mail className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white font-medium">
                                  {company.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Phone className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  Telefone
                                </p>
                                <p className="text-white font-medium">
                                  {company.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Globe className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">Website</p>
                                <a
                                  href={company.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 font-medium"
                                >
                                  {company.website}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Users className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  Pessoa Responsável
                                </p>
                                <p className="text-white font-medium">
                                  {company.responsiblePerson}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Calendar className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  Data de Fundação
                                </p>
                                <p className="text-white font-medium">
                                  {new Date(
                                    company.foundingDate
                                  ).toLocaleDateString("pt-PT")}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Building2 className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">Setor</p>
                                <p className="text-white font-medium">
                                  {company.sector}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-tertiary rounded-lg">
                              <Users className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  Número de Funcionários
                                </p>
                                <p className="text-white font-medium">
                                  {company.numberOfEmployees}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-tertiary rounded-lg">
                            <div className="flex items-start space-x-3">
                              <MapPin className="w-5 h-5 text-primary mt-1" />
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Morada
                                </p>
                                <p className="text-white">{company.address}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-tertiary rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Info className="w-5 h-5 text-primary mt-1" />
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Descrição
                                </p>
                                <p className="text-white">
                                  {company.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-tertiary rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-300 mb-2">
                              Cliente desde
                            </p>
                            <p className="text-white">
                              {company?.createdAt
                                ? new Date(
                                    company.createdAt
                                  ).toLocaleDateString("pt-PT")
                                : "N/A"}
                            </p>
                          </div>

                          <div className="bg-tertiary rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-300 mb-2">
                              Estado da Conta
                            </p>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  company.status === "active"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                }`}
                              ></div>
                              <span
                                className={
                                  company.status === "active"
                                    ? "text-green-400"
                                    : "text-red-400"
                                }
                              >
                                {company.status === "active"
                                  ? "Ativo"
                                  : "Inativo"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "users" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-white">
                            Funcionários Monitorizados (
                            {getCompanyEmployees(company._id).length})
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>
                              Emails monitorizados:{" "}
                              {company.emailsMonitored.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {getCompanyEmployees(company._id).length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {getCompanyEmployees(company._id).map(
                              (employee) => (
                                <div
                                  key={employee.id}
                                  className="bg-tertiary rounded-lg p-4 hover:bg-tertiary/80 transition-colors duration-200"
                                >
                                  <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                      <span className="text-white font-medium text-sm">
                                        {employee.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="text-white font-medium">
                                        {employee.name}
                                      </p>
                                      <p className="text-gray-400 text-sm">
                                        {employee.jobRole}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-1 text-sm">
                                    <p className="text-gray-300">
                                      {employee.email}
                                    </p>
                                    <p className="text-gray-400">
                                      {employee.phone}
                                    </p>
                                    <div className="flex items-center justify-between pt-2">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 `}
                                      >
                                        Ativo
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {new Date(
                                          employee.createdAt
                                        ).toLocaleDateString("pt-PT")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400">
                              Nenhum funcionário cadastrado
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Os funcionários serão adicionados quando a empresa
                              começar a usar a plataforma
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "key" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-white">
                            Gestão de Chave de Acesso
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <span className="text-sm text-gray-400">
                              Segurança Máxima
                            </span>
                          </div>
                        </div>

                        <div className="bg-tertiary rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-300">
                              Chave de Acesso Atual
                            </label>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  copyToClipboard(
                                    company.accessKey,
                                    company._id
                                  );
                                }}
                                className="flex items-center space-x-2 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 transition-colors duration-200"
                              >
                                <Copy className="w-4 h-4" />
                                <span>
                                  {copiedKey === company._id
                                    ? "Copiado!"
                                    : "Copiar"}
                                </span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  regenerateAccessKey(company._id);
                                }}
                                disabled={regeneratingKey === company._id}
                                className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-colors duration-200 ${
                                  regeneratingKey === company._id
                                    ? "bg-orange-600 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-600"
                                } text-white`}
                              >
                                {regeneratingKey === company._id ? (
                                  <span>Regenerando...</span>
                                ) : (
                                  <>
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Regenerar</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="bg-background rounded-lg p-4 border border-gray-600">
                            <code className="text-primary font-mono text-sm break-all">
                              {company.accessKey}
                            </code>
                          </div>
                          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                              <div className="text-xs text-yellow-200">
                                <p className="font-medium mb-1">
                                  Aviso de Segurança:
                                </p>
                                <p>
                                  Esta chave permite acesso completo à
                                  plataforma para esta empresa. Mantenha-a
                                  segura e partilhe apenas com pessoal
                                  autorizado.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-tertiary rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-300 mb-2">
                              Chave Criada
                            </p>
                            <p className="text-white">
                              {new Date(company.createdAt).toLocaleDateString(
                                "pt-PT"
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="bg-tertiary rounded-lg p-4">
                          <h5 className="text-white font-medium mb-3">
                            Ações de Segurança
                          </h5>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => toggleCompanyStatus(company._id)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                company.status === "active"
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                            >
                              {company.status === "active" ? (
                                <PowerOff className="w-4 h-4" />
                              ) : (
                                <Power className="w-4 h-4" />
                              )}
                              <span>
                                {company.status === "active"
                                  ? "Desativar Conta"
                                  : "Ativar Conta"}
                              </span>
                            </button>
                            <span className="text-sm text-gray-400">
                              {company.status === "active"
                                ? "Desativar irá bloquear o acesso à plataforma"
                                : "Ativar irá restaurar o acesso à plataforma"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="bg-secondary rounded-xl p-12 border border-tertiary text-center">
          <Building2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhuma empresa encontrada
          </h3>
          <p className="text-gray-400">
            Tente ajustar os termos de pesquisa ou adicione uma nova empresa.
          </p>
        </div>
      )}

      {/* Add Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-2xl border border-tertiary animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <h3 className="text-xl font-bold text-white">
                Adicionar Nova Empresa
              </h3>
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
                    value={newCompany.sector}
                    onChange={(e) =>
                      handleInputChange("sector", e.target.value)
                    }
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  >
                    <option value="">Selecionar setor</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Funcionários
                  </label>
                  <select
                    value={newCompany.numberOfEmployees}
                    onChange={(e) =>
                      handleInputChange("numberOfEmployees", e.target.value)
                    }
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Selecionar faixa</option>
                    {employeeCountOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("foundingDate", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange("responsiblePerson", e.target.value)
                    }
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
                  onChange={(e) => handleInputChange("address", e.target.value)}
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
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
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
                  <span>{isSaving ? "A criar..." : "Criar Empresa"}</span>
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
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Setor *
                  </label>
                  <select
                    value={newCompany.sector}
                    onChange={(e) =>
                      handleInputChange("sector", e.target.value)
                    }
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                    required
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Funcionários
                  </label>
                  <select
                    value={newCompany.numberOfEmployees}
                    onChange={(e) =>
                      handleInputChange("numberOfEmployees", e.target.value)
                    }
                    className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200"
                  >
                    {employeeCountOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
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
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("foundingDate", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange("responsiblePerson", e.target.value)
                    }
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
                  onChange={(e) => handleInputChange("address", e.target.value)}
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
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
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
                  <span>
                    {isSaving ? "A guardar..." : "Guardar Alterações"}
                  </span>
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
                <h3 className="text-xl font-bold text-white">
                  Confirmar Eliminação
                </h3>
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
                Tem a certeza de que deseja eliminar{" "}
                <span className="font-semibold text-white">
                  {companyToDelete.name}
                </span>
                ?
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Esta ação não pode ser desfeita. Todos os dados da empresa,
                incluindo funcionários e histórico de monitorização, serão
                permanentemente removidos.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium text-sm">
                      Dados que serão eliminados:
                    </p>
                    <ul className="text-red-200 text-sm mt-2 space-y-1">
                      <li>• Informações da empresa</li>
                      <li>
                        • {getCompanyEmployees(companyToDelete.id).length}{" "}
                        funcionários monitorizados
                      </li>
                      <li>
                        • {companyToDelete.emailsMonitored.toLocaleString()}{" "}
                        emails monitorizados
                      </li>
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
