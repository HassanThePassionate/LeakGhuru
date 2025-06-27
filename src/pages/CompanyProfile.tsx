/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Building2, Save, Edit3 } from "lucide-react";
import { Company } from "../types";
import { getCompanyData, updateCompanyProfile } from "../api/employees";
import { toast } from "react-toastify";

const CompanyProfile: React.FC = () => {
  const [company, setCompany] = useState<Company>({
    name: "",
    description: "",
    sector: "",
    employeeCount: "1-10",
    website: "",
    email: "",
    phone: "",
    foundingDate: "",
    responsiblePerson: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyData();
        setCompany(data);
      } catch (error) {
        toast.error("Failed to load company data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanyData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedCompany = await updateCompanyProfile(company);
      setCompany(updatedCompany);
      toast.success("Company profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update company profile");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";

    try {
      // Parse the date string (assuming it's in ISO format from the API)
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) return "";

      // Convert to YYYY-MM-DD format required by input[type="date"]
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  const handleInputChange = (field: keyof Company, value: string) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // If it starts with 351, format as (+351) XXX XXX XXX
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

    // If it doesn't start with 351, assume it's a Portuguese number and add the prefix
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Perfil da Empresa
          </h1>
          <p className="text-gray-400">
            Gerir as informações da sua organização
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "Cancelar" : "Editar Perfil"}</span>
        </button>
      </div>

      <div className="bg-secondary rounded-xl p-8 border border-tertiary">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{company.name}</h2>
            <p className="text-gray-400 max-w-[300px] truncate">
              {company.description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome da Empresa
              </label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Setor
              </label>
              <input
                type="text"
                value={company.sector}
                onChange={(e) => handleInputChange("sector", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Funcionários
              </label>
              <select
                value={company.employeeCount}
                onChange={(e) =>
                  handleInputChange("employeeCount", e.target.value)
                }
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-250">101-250</option>
                <option value="250-500">250-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={company.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email de Contacto
              </label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                disabled={!isEditing}
                placeholder="(+351) 000 000 000"
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              />
              {isEditing && (
                <p className="text-xs text-gray-500 mt-1">
                  Formato: (+351) 000 000 000
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data de Fundação
              </label>
              <input
                type="date"
                value={formatDateForInput(company.foundingDate)}
                onChange={(e) =>
                  handleInputChange("foundingDate", e.target.value)
                }
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pessoa Responsável
              </label>
              <input
                type="text"
                value={company.responsiblePerson}
                onChange={(e) =>
                  handleInputChange("responsiblePerson", e.target.value)
                }
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Morada
            </label>
            <textarea
              value={company.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição da Empresa
            </label>
            <textarea
              value={company.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50 resize-none"
              required
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "A guardar..." : "Guardar Alterações"}</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
