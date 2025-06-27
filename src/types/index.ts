export interface Company {
  name: string;
  sector: string;
  employeeCount: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  foundingDate: string;
  responsiblePerson: string;
  description: string;
}

export interface Employee {
  _id: string;
  id: string;
  name: string;
  jobRole: string;
  email: string;
  phone: string;
  enterprise: string;
}

export interface Settings {
  name: string;
  accessKey: string;
  weeklyReports: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

export interface DashboardStats {
  totalEmails: number;
  totalLeaks: number;
  monthlyGrowth: number;
  activeMonitoring: number;
}

export interface LeakLocation {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  count: number;
}

export interface EmailVolumeData {
  month: string;
  emails: number;
  leaks: number;
}
