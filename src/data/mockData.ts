import {
  Company,
  Employee,
  Settings,
  DashboardStats,
  LeakLocation,
  EmailVolumeData,
} from "../types";

export const mockCompany: Company = {
  name: "TechCorp Solutions",
  industry: "Technology",
  employeeCount: "250-500",
  website: "https://techcorp.com",
  email: "contact@techcorp.com",
  phone: "(+351) 213 456 789",
  address: "123 Tech Street, Silicon Valley, CA 94000",
  foundingDate: "2015-03-15",
  responsiblePerson: "John Anderson",
  description:
    "Leading technology solutions provider specializing in enterprise software development and cybersecurity services.",
};

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Senior Developer",
    email: "sarah.johnson@techcorp.com",
    phone: "(+351) 912 345 678",
    company: "TechCorp Solutions",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Product Manager",
    email: "michael.chen@techcorp.com",
    phone: "(+351) 923 456 789",
    company: "TechCorp Solutions",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Security Analyst",
    email: "emily.rodriguez@techcorp.com",
    phone: "(+351) 934 567 890",
    company: "TechCorp Solutions",
  },
  {
    id: "4",
    name: "David Thompson",
    position: "DevOps Engineer",
    email: "david.thompson@techcorp.com",
    phone: "(+351) 945 678 901",
    company: "TechCorp Solutions",
  },
];

export const mockSettings: Settings = {
  accountName: "TechCorp Solutions",
  accessKey: "LEAK-MON-2024-TECH-CORP-SECURE-KEY-9876",
  weeklyReports: true,
  smsNotifications: true,
  emailNotifications: true,
};

export const mockDashboardStats: DashboardStats = {
  totalEmails: 124536,
  totalLeaks: 23,
  monthlyGrowth: 12.5,
  activeMonitoring: 247,
};

export const mockLeakLocations: LeakLocation[] = [
  {
    id: "1",
    country: "USA",
    city: "New York",
    latitude: 40.7128,
    longitude: -74.006,
    count: 8,
  },
  {
    id: "2",
    country: "UK",
    city: "London",
    latitude: 51.5074,
    longitude: -0.1278,
    count: 5,
  },
  {
    id: "3",
    country: "Germany",
    city: "Berlin",
    latitude: 52.52,
    longitude: 13.405,
    count: 4,
  },
  {
    id: "4",
    country: "Brazil",
    city: "São Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    count: 3,
  },
  {
    id: "5",
    country: "Japan",
    city: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
    count: 3,
  },
];

export const mockEmailVolumeData: EmailVolumeData[] = [
  { month: "Jan", emails: 8500, leaks: 2 },
  { month: "Feb", emails: 9200, leaks: 1 },
  { month: "Mar", emails: 10100, leaks: 3 },
  { month: "Apr", emails: 11500, leaks: 4 },
  { month: "May", emails: 12800, leaks: 2 },
  { month: "Jun", emails: 13200, leaks: 5 },
  { month: "Jul", emails: 14100, leaks: 3 },
  { month: "Aug", emails: 15600, leaks: 1 },
  { month: "Sep", emails: 16200, leaks: 2 },
  { month: "Oct", emails: 17800, leaks: 0 },
  { month: "Nov", emails: 18500, leaks: 0 },
  { month: "Dec", emails: 19200, leaks: 0 },
];
