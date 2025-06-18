export interface Company {
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

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  company: string;
}

export interface Settings {
  accountName: string;
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