import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, ArrowUp, ArrowDown, Eye, Edit, Trash2 } from 'lucide-react';
import { TableData, TableColumn, TableRow } from '../../types/dashboard';

interface DataTableProps {
  data: TableData;
  onPageChange?: (page: number) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onRowAction?: (action: string, row: TableRow) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onPageChange, onSort, onRowAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedRows = useMemo(() => {
    let filtered = data.rows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const aStr = aValue.toString().toLowerCase();
        const bStr = bValue.toString().toLowerCase();
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data.rows, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    const newDirection = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column.key);
    setSortDirection(newDirection);
    
    if (onSort) {
      onSort(column.key, newDirection);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-red-500/20 text-red-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalPages = Math.ceil(data.totalRows / data.pageSize);

  return (
    <div className="bg-secondary rounded-xl border border-tertiary overflow-hidden">
      <div className="p-6 border-b border-tertiary">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Recent Activities</h3>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-tertiary text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-tertiary">
            <tr>
              {data.columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-6 py-4 text-sm font-medium text-gray-300 ${
                    column.sortable ? 'cursor-pointer hover:text-primary' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ArrowUp 
                          className={`w-3 h-3 ${
                            sortColumn === column.key && sortDirection === 'asc' 
                              ? 'text-primary' 
                              : 'text-gray-500'
                          }`} 
                        />
                        <ArrowDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === column.key && sortDirection === 'desc' 
                              ? 'text-primary' 
                              : 'text-gray-500'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tertiary">
            {filteredAndSortedRows.map((row) => (
              <tr key={row.id} className="hover:bg-tertiary/50 transition-colors duration-200">
                {data.columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.key === 'severity' ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(row[column.key])}`}>
                        {row[column.key]}
                      </span>
                    ) : column.key === 'status' ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row[column.key])}`}>
                        {row[column.key]}
                      </span>
                    ) : (
                      <span className="text-gray-300">{row[column.key]}</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onRowAction?.('view', row)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRowAction?.('edit', row)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRowAction?.('delete', row)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                      title="Delete"
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-tertiary">
        <div className="text-sm text-gray-400">
          Showing {((data.currentPage - 1) * data.pageSize) + 1} to {Math.min(data.currentPage * data.pageSize, data.totalRows)} of {data.totalRows} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange?.(data.currentPage - 1)}
            disabled={data.currentPage === 1}
            className="p-2 text-gray-400 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                    data.currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange?.(data.currentPage + 1)}
            disabled={data.currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;