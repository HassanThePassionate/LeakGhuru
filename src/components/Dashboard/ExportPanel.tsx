import React, { useState } from 'react';
import { Download, FileText, Image, Table, Calendar } from 'lucide-react';
import { ExportOptions } from '../../types/dashboard';

interface ExportPanelProps {
  onExport: (options: ExportOptions) => void;
  isExporting: boolean;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ onExport, isExporting }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeCharts: true,
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  });

  const handleExport = () => {
    onExport(exportOptions);
  };

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Complete dashboard report' },
    { value: 'excel', label: 'Excel', icon: Table, description: 'Data tables and metrics' },
    { value: 'csv', label: 'CSV', icon: Table, description: 'Raw data export' },
    { value: 'png', label: 'PNG Image', icon: Image, description: 'Dashboard screenshot' }
  ];

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center space-x-3 mb-6">
        <Download className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold text-white">Export Dashboard</h3>
      </div>

      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.value}
                onClick={() => setExportOptions({ ...exportOptions, format: format.value as any })}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  exportOptions.format === format.value
                    ? 'border-primary bg-primary/10'
                    : 'border-tertiary hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <format.icon className={`w-5 h-5 ${
                    exportOptions.format === format.value ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    exportOptions.format === format.value ? 'text-primary' : 'text-white'
                  }`}>
                    {format.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{format.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Export Options</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeCharts}
                onChange={(e) => setExportOptions({ 
                  ...exportOptions, 
                  includeCharts: e.target.checked 
                })}
                className="w-4 h-4 text-primary bg-tertiary border-gray-600 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-gray-300">Include Charts and Visualizations</span>
            </label>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date Range for Export
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">From</label>
              <input
                type="date"
                value={exportOptions.dateRange?.start.toISOString().split('T')[0]}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  dateRange: {
                    start: new Date(e.target.value),
                    end: exportOptions.dateRange?.end || new Date()
                  }
                })}
                className="w-full bg-tertiary text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">To</label>
              <input
                type="date"
                value={exportOptions.dateRange?.end.toISOString().split('T')[0]}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  dateRange: {
                    start: exportOptions.dateRange?.start || new Date(),
                    end: new Date(e.target.value)
                  }
                })}
                className="w-full bg-tertiary text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-primary focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          <span>{isExporting ? 'Exporting...' : 'Export Dashboard'}</span>
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;