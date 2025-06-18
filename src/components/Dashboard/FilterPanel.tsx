import React, { useState } from 'react';
import { Calendar, Filter, X, Search } from 'lucide-react';
import { FilterOptions } from '../../types/dashboard';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: new Date(value)
      }
    });
  };

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const availableCategories = ['Emails', 'Leaks', 'Security', 'Performance', 'Financial'];
  const availableStatuses = ['Active', 'Resolved', 'Pending', 'Critical'];

  return (
    <div className="bg-secondary rounded-xl border border-tertiary overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-tertiary">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
          >
            Reset All
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-primary transition-colors duration-200"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.start.toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="w-full bg-tertiary text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.end.toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="w-full bg-tertiary text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Categories</label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.categories.includes(category)
                      ? 'bg-primary text-white'
                      : 'bg-tertiary text-gray-300 hover:bg-primary/20 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Status</label>
            <div className="space-y-2">
              {availableStatuses.map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => {
                      const updatedStatus = e.target.checked
                        ? [...filters.status, status]
                        : filters.status.filter(s => s !== status);
                      onFiltersChange({ ...filters, status: updatedStatus });
                    }}
                    className="w-4 h-4 text-primary bg-tertiary border-gray-600 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;