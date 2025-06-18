export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'map';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number; w: number; h: number };
  data?: any;
  config?: any;
}

export interface ChartData {
  id: string;
  name: string;
  value: number;
  date?: string;
  category?: string;
  color?: string;
}

export interface MetricData {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
  trend?: number[];
}

export interface TableData {
  id: string;
  columns: TableColumn[];
  rows: TableRow[];
  totalRows: number;
  currentPage: number;
  pageSize: number;
}

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface FilterOptions {
  dateRange: {
    start: Date;
    end: Date;
  };
  categories: string[];
  status: string[];
  customFilters: Record<string, any>;
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'png';
  includeCharts: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface NotificationData {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}