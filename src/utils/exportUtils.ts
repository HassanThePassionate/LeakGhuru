import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportOptions } from '../types/dashboard';

export const exportDashboard = async (options: ExportOptions) => {
  const { format, includeCharts, dateRange } = options;

  try {
    switch (format) {
      case 'pdf':
        return await exportToPDF(includeCharts);
      case 'png':
        return await exportToPNG();
      case 'csv':
        return await exportToCSV();
      case 'excel':
        return await exportToExcel();
      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};

const exportToPDF = async (includeCharts: boolean) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add title
  pdf.setFontSize(20);
  pdf.text('LeakGuard Dashboard Report', 20, 20);

  // Add date
  pdf.setFontSize(12);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

  let yPosition = 50;

  if (includeCharts) {
    // Capture dashboard screenshots
    const dashboardElement = document.querySelector('[data-dashboard-content]');
    if (dashboardElement) {
      const canvas = await html2canvas(dashboardElement as HTMLElement, {
        backgroundColor: '#171717',
        scale: 2
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 40;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yPosition + imgHeight > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
    }
  }

  // Add summary data
  pdf.addPage();
  pdf.setFontSize(16);
  pdf.text('Dashboard Summary', 20, 20);

  const summaryData = [
    ['Metric', 'Value', 'Change'],
    ['Total Emails Monitored', '124,536', '+12.5%'],
    ['Data Leaks Detected', '23', '-8.3%'],
    ['Active Monitoring', '247', '+5.2%'],
    ['Response Time', '2.3s', '-15.7%']
  ];

  let tableY = 40;
  summaryData.forEach((row, index) => {
    const isHeader = index === 0;
    pdf.setFontSize(isHeader ? 12 : 10);
    
    row.forEach((cell, cellIndex) => {
      pdf.text(cell, 20 + (cellIndex * 60), tableY);
    });
    
    tableY += isHeader ? 15 : 10;
  });

  pdf.save('leakguard-dashboard-report.pdf');
};

const exportToPNG = async () => {
  const dashboardElement = document.querySelector('[data-dashboard-content]');
  if (!dashboardElement) {
    throw new Error('Dashboard content not found');
  }

  const canvas = await html2canvas(dashboardElement as HTMLElement, {
    backgroundColor: '#171717',
    scale: 2,
    width: dashboardElement.scrollWidth,
    height: dashboardElement.scrollHeight
  });

  // Create download link
  const link = document.createElement('a');
  link.download = 'leakguard-dashboard.png';
  link.href = canvas.toDataURL();
  link.click();
};

const exportToCSV = async () => {
  const data = [
    ['Timestamp', 'Event', 'Severity', 'Location', 'Status'],
    ['2024-01-15 14:30:22', 'Suspicious email activity detected', 'High', 'New York, USA', 'Active'],
    ['2024-01-15 13:45:11', 'Weekly report generated', 'Low', 'System', 'Completed'],
    ['2024-01-15 12:20:05', 'Employee monitoring updated', 'Medium', 'London, UK', 'Processing'],
    ['2024-01-15 11:15:33', 'Data leak prevented', 'Critical', 'Berlin, Germany', 'Resolved'],
    ['2024-01-15 10:30:18', 'System backup completed', 'Low', 'System', 'Completed']
  ];

  const csvContent = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'leakguard-data.csv';
  link.click();
  
  window.URL.revokeObjectURL(url);
};

const exportToExcel = async () => {
  // For simplicity, we'll export as CSV with .xlsx extension
  // In a real application, you'd use a library like xlsx
  await exportToCSV();
};