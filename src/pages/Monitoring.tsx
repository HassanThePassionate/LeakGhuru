import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Eye, Users, X, Save, AlertTriangle } from 'lucide-react';
import { Employee } from '../types';
import { mockEmployees } from '../data/mockData';

interface NewEmployee {
  name: string;
  position: string;
  email: string;
  phone: string;
  company: string;
}

const Monitoring: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({
    name: '',
    position: '',
    email: '',
    phone: '',
    company: ''
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (type: 'add' | 'edit' | 'view', employee?: Employee) => {
    setModalType(type);
    if (type === 'add') {
      setNewEmployee({
        name: '',
        position: '',
        email: '',
        phone: '',
        company: ''
      });
    } else if (employee) {
      setSelectedEmployee(employee);
      setNewEmployee({
        name: employee.name,
        position: employee.position,
        email: employee.email,
        phone: employee.phone,
        company: employee.company
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setNewEmployee({
      name: '',
      position: '',
      email: '',
      phone: '',
      company: ''
    });
  };

  const handleInputChange = (field: keyof NewEmployee, value: string) => {
    setNewEmployee(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      if (modalType === 'add') {
        const newEmp: Employee = {
          id: (employees.length + 1).toString(),
          ...newEmployee
        };
        setEmployees(prev => [...prev, newEmp]);
      } else if (modalType === 'edit' && selectedEmployee) {
        setEmployees(prev => 
          prev.map(emp => 
            emp.id === selectedEmployee.id 
              ? { ...emp, ...newEmployee }
              : emp
          )
        );
      }
      
      setIsSaving(false);
      closeModal();
    }, 1000);
  };

  const openDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
      closeDeleteModal();
    }
  };

  const isFormValid = newEmployee.name && newEmployee.position && newEmployee.email && newEmployee.phone && newEmployee.company;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Monitorização de Funcionários</h1>
          <p className="text-gray-400">Gerir funcionários sob vigilância de fugas de dados</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Funcionário</span>
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary text-white pl-10 pr-4 py-3 rounded-lg border border-tertiary focus:border-primary focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
        <div className="bg-secondary rounded-lg p-4 border border-tertiary">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-white">{employees.length}</p>
              <p className="text-sm text-gray-400">Total Monitorizados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-secondary rounded-xl border border-tertiary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-tertiary">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Nome</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Cargo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Telefone</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Empresa</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tertiary">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-tertiary/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-white font-medium">{employee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{employee.position}</td>
                  <td className="px-6 py-4 text-gray-300">{employee.email}</td>
                  <td className="px-6 py-4 text-gray-300">{employee.phone}</td>
                  <td className="px-6 py-4 text-gray-300">{employee.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openModal('view', employee)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', employee)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                        title="Editar Funcionário"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(employee)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                        title="Remover Funcionário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum funcionário encontrado na sua pesquisa.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-md border border-tertiary animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <h3 className="text-xl font-bold text-white">
                {modalType === 'add' ? 'Adicionar Funcionário' : 
                 modalType === 'edit' ? 'Editar Funcionário' : 'Detalhes do Funcionário'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={modalType === 'view'}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Introduza o nome do funcionário"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cargo *
                </label>
                <input
                  type="text"
                  value={newEmployee.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  disabled={modalType === 'view'}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Introduza o cargo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={modalType === 'view'}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Introduza o endereço de email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={newEmployee.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  disabled={modalType === 'view'}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="(+351) 000 000 000"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formato: (+351) 000 000 000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  value={newEmployee.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={modalType === 'view'}
                  className="w-full bg-tertiary text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  placeholder="Introduza o nome da empresa"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {modalType === 'view' ? 'Fechar' : 'Cancelar'}
                </button>
                {modalType !== 'view' && (
                  <button
                    type="submit"
                    disabled={isSaving || !isFormValid}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {isSaving ? 'A guardar...' : modalType === 'add' ? 'Adicionar Funcionário' : 'Guardar Alterações'}
                    </span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && employeeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary rounded-xl w-full max-w-md border border-tertiary animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-tertiary">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Confirmar Remoção</h3>
              </div>
              <button
                onClick={closeDeleteModal}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Tem a certeza de que deseja remover <span className="font-semibold text-white">{employeeToDelete.name}</span> da monitorização?
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Esta ação não pode ser desfeita. O funcionário será permanentemente removido do sistema de monitorização.
              </p>

              {/* Employee Info */}
              <div className="bg-tertiary rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {employeeToDelete.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{employeeToDelete.name}</p>
                    <p className="text-gray-400 text-sm">{employeeToDelete.position}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <p>{employeeToDelete.email}</p>
                  <p>{employeeToDelete.phone}</p>
                  <p>{employeeToDelete.company}</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remover Funcionário</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitoring;