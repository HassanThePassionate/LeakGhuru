import React, { useState } from 'react';
import { Building2, Save, Edit3 } from 'lucide-react';
import { Company } from '../types';
import { mockCompany } from '../data/mockData';

const CompanyProfile: React.FC = () => {
  const [company, setCompany] = useState<Company>(mockCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      // Show success message
    }, 1000);
  };

  const handleInputChange = (field: keyof Company, value: string) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // If it starts with 351, format as (+351) XXX XXX XXX
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
    
    // If it doesn't start with 351, assume it's a Portuguese number and add the prefix
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Perfil da Empresa</h1>
          <p className="text-gray-400">Gerir as informações da sua organização</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancelar' : 'Editar Perfil'}</span>
        </button>
      </div>

      <div className="bg-secondary rounded-xl p-8 border border-tertiary">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{company.name}</h2>
            <p className="text-gray-400">{company.industry}</p>
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
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Setor
              </label>
              <input
                type="text"
                value={company.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Funcionários
              </label>
              <select
                value={company.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
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
                onChange={(e) => handleInputChange('website', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
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
                value={company.foundingDate}
                onChange={(e) => handleInputChange('foundingDate', e.target.value)}
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
                onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Morada
            </label>
            <textarea
              value={company.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição da Empresa
            </label>
            <textarea
              value={company.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50 resize-none"
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
                <span>{isSaving ? 'A guardar...' : 'Guardar Alterações'}</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;