import {
  Employee,
  Settings,
  DashboardStats,
  LeakLocation,
  EmailVolumeData,
} from "../types";

export const mockCompany = {};

export const mockEmployees: Employee[] = [];

export const mockSettings: Settings = {
  name: "",
  accessKey: "",
  weeklyReports: true,
  smsNotifications: true,
  emailNotifications: true,
};

export const mockDashboardStats: DashboardStats = {
  totalEmails: 0,
  totalLeaks: 0,
  monthlyGrowth: 0,
  activeMonitoring: 0,
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
