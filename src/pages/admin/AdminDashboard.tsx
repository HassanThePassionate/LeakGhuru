/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface AdminStats {
  totalCompanies: number;
  totalEmailsMonitored: number;
  totalUsers: number;
  monthlyGrowth: number;
  activeCompanies: number;
  inactiveCompanies: number;
  avgEmailsPerCompany: number;
  systemUptime: string;
}

interface CompanyData {
  id: string;
  name: string;
  emailsMonitored: number;
  users: number;
  status: "active" | "inactive";
  lastActivity: Date;
  industry: string;
  joinDate: Date;
}

interface GrowthData {
  month: string;
  companies: number;
  employees: number;
  emails: number;
}

interface IndustryData {
  name: string;
  value: number;
  color: string;
  companies: string[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalCompanies: 45,
    totalEmailsMonitored: 2847392,
    totalUsers: 1247,
    monthlyGrowth: 18.5,
    activeCompanies: 42,
    inactiveCompanies: 3,
    avgEmailsPerCompany: 63275,
    systemUptime: "99.9%",
  });

  const [growthData, setGrowthData] = useState<GrowthData[]>([
    { month: "Jan", companies: 32, employees: 890, emails: 185000 },
    { month: "Feb", companies: 35, employees: 945, emails: 210000 },
    { month: "Mar", companies: 38, employees: 1020, emails: 245000 },
    { month: "Apr", companies: 41, employees: 1105, emails: 280000 },
    { month: "May", companies: 43, employees: 1180, emails: 315000 },
    { month: "Jun", companies: 45, employees: 1247, emails: 350000 },
  ]);

  const [industryDistribution, setIndustryDistribution] = useState<IndustryData[]>([
    { 
      name: "Tecnologia", 
      value: 18, 
      color: "#d83dff",
      companies: ["TechCorp Solutions", "DevMax Ltd", "CodeCraft Inc"]
    },
    { 
      name: "Finanças", 
      value: 12, 
      color: "#ff3d83",
      companies: ["FinanceMax Ltd", "BankSecure Pro", "InvestTech"]
    },
    { 
      name: "Saúde", 
      value: 8, 
      color: "#3d83ff",
      companies: ["HealthCare Pro", "MedTech Solutions"]
    },
    { 
      name: "Educação", 
      value: 4, 
      color: "#83ff3d",
      companies: ["EduTech Systems", "LearnSafe"]
    },
    { 
      name: "Outros", 
      value: 3, 
      color: "#ff833d",
      companies: ["RetailChain Inc", "LogiSecure", "ManufacturePro"]
    },
  ]);

  const [topCompanies, setTopCompanies] = useState<CompanyData[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      emailsMonitored: 124536,
      users: 247,
      status: "active",
      lastActivity: new Date("2024-01-15T14:30:00"),
      industry: "Tecnologia",
      joinDate: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "FinanceMax Ltd",
      emailsMonitored: 98742,
      users: 189,
      status: "active",
      lastActivity: new Date("2024-01-15T13:45:00"),
      industry: "Finanças",
      joinDate: new Date("2023-02-20"),
    },
    {
      id: "3",
      name: "HealthCare Pro",
      emailsMonitored: 87321,
      users: 156,
      status: "active",
      lastActivity: new Date("2024-01-15T12:20:00"),
      industry: "Saúde",
      joinDate: new Date("2023-03-10"),
    },
    {
      id: "4",
      name: "EduTech Systems",
      emailsMonitored: 65489,
      users: 98,
      status: "inactive",
      lastActivity: new Date("2024-01-14T16:15:00"),
      industry: "Educação",
      joinDate: new Date("2023-04-05"),
    },
    {
      id: "5",
      name: "RetailChain Inc",
      emailsMonitored: 54321,
      users: 87,
      status: "active",
      lastActivity: new Date("2024-01-15T11:30:00"),
      industry: "Outros",
      joinDate: new Date("2023-05-12"),
    },
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalEmailsMonitored: prev.totalEmailsMonitored + Math.floor(Math.random() * 100),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-secondary border border-tertiary rounded-lg p-4 shadow-xl'>
          <p className='text-white font-medium mb-2'>{`Período: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === 'companies' ? 'Empresas' : 
                 entry.dataKey === 'employees' ? 'Funcionários' : 'Emails'}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-secondary border border-tertiary rounded-lg p-4 shadow-xl'>
          <p className='text-white font-medium mb-2'>{data.name}</p>
          <p className='text-primary'>{`${data.value} empresas`}</p>
          <div className='mt-2'>
            <p className='text-xs text-gray-400 mb-1'>Empresas:</p>
            {data.companies.slice(0, 3).map((company: string, index: number) => (
              <p key={index} className='text-xs text-gray-300'>• {company}</p>
            ))}
            {data.companies.length > 3 && (
              <p className='text-xs text-gray-400'>+{data.companies.length - 3} mais</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const currentMonth = growthData[growthData.length - 1];
  const previousMonth = growthData[growthData.length - 2];

  return (
    <div className='space-y-6 animate-fade-in'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Painel Administrativo
          </h1>
          <p className='text-gray-400'>Visão geral completa da plataforma LeakGuard</p>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2 bg-secondary rounded-lg p-2 border border-tertiary'>
            <Activity className='w-4 h-4 text-green-400' />
            <span className='text-sm text-white'>Sistema Online</span>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
          </div>
          <div className='text-right'>
            <p className='text-sm font-medium text-white'>Última atualização</p>
            <p className='text-xs text-gray-400'>
              {new Date().toLocaleTimeString('pt-PT')}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300 group'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Empresas Clientes
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.totalCompanies}
              </p>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <ArrowUpRight className='w-4 h-4 text-green-400' />
                  <span className='text-sm font-medium text-green-400'>
                    +{getGrowthPercentage(currentMonth.companies, previousMonth.companies)}%
                  </span>
                </div>
                <span className='text-xs text-gray-500'>este mês</span>
              </div>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 transition-colors duration-300'>
              <Building2 className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300 group'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Funcionários Monitorizados
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.totalUsers.toLocaleString()}
              </p>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <ArrowUpRight className='w-4 h-4 text-green-400' />
                  <span className='text-sm font-medium text-green-400'>
                    +{getGrowthPercentage(currentMonth.employees, previousMonth.employees)}%
                  </span>
                </div>
                <span className='text-xs text-gray-500'>este mês</span>
              </div>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300'>
              <Users className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300 group'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Emails Monitorizados
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {(stats.totalEmailsMonitored / 1000000).toFixed(1)}M
              </p>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <ArrowUpRight className='w-4 h-4 text-green-400' />
                  <span className='text-sm font-medium text-green-400'>
                    +{stats.monthlyGrowth}%
                  </span>
                </div>
                <span className='text-xs text-gray-500'>este mês</span>
              </div>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-green-500/10 text-green-400 border-green-500/20 group-hover:bg-green-500/20 transition-colors duration-300'>
              <Mail className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300 group'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Uptime do Sistema
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.systemUptime}
              </p>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  <span className='text-sm font-medium text-green-400'>
                    Operacional
                  </span>
                </div>
              </div>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-orange-500/10 text-orange-400 border-orange-500/20 group-hover:bg-orange-500/20 transition-colors duration-300'>
              <TrendingUp className='w-6 h-6' />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-white'>Estado das Empresas</h3>
            <Activity className='w-5 h-5 text-primary' />
          </div>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-400'>Ativas</span>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                <span className='text-white font-medium'>{stats.activeCompanies}</span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-400'>Inativas</span>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-red-400 rounded-full'></div>
                <span className='text-white font-medium'>{stats.inactiveCompanies}</span>
              </div>
            </div>
            <div className='pt-2 border-t border-tertiary'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-400'>Taxa de Atividade</span>
                <span className='text-primary font-medium'>
                  {((stats.activeCompanies / stats.totalCompanies) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-white'>Média por Empresa</h3>
            <BarChart3 className='w-5 h-5 text-primary' />
          </div>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-400'>Emails/Empresa</span>
              <span className='text-white font-medium'>{stats.avgEmailsPerCompany.toLocaleString()}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-400'>Funcionários/Empresa</span>
              <span className='text-white font-medium'>{Math.round(stats.totalUsers / stats.totalCompanies)}</span>
            </div>
            <div className='pt-2 border-t border-tertiary'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-400'>Crescimento Médio</span>
                <span className='text-green-400 font-medium'>+{stats.monthlyGrowth}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-white'>Período de Análise</h3>
            <Calendar className='w-5 h-5 text-primary' />
          </div>
          <div className='space-y-2'>
            {(['week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  selectedTimeframe === period
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-tertiary'
                }`}
              >
                {period === 'week' ? 'Última Semana' : 
                 period === 'month' ? 'Último Mês' : 'Último Trimestre'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Growth Chart */}
        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white mb-2'>
                Crescimento da Plataforma
              </h3>
              <p className='text-gray-400'>Evolução de empresas e funcionários ao longo do tempo</p>
            </div>
            <BarChart3 className='w-8 h-8 text-primary' />
          </div>

          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id='companiesGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#d83dff' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#d83dff' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='employeesGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#3d83ff' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#3d83ff' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='#2b1b2f' />
                <XAxis dataKey='month' stroke='#9ca3af' fontSize={12} />
                <YAxis stroke='#9ca3af' fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type='monotone'
                  dataKey='companies'
                  stroke='#d83dff'
                  strokeWidth={2}
                  fill='url(#companiesGradient)'
                />
                <Area
                  type='monotone'
                  dataKey='employees'
                  stroke='#3d83ff'
                  strokeWidth={2}
                  fill='url(#employeesGradient)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Distribution */}
        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white mb-2'>
                Distribuição por Setor
              </h3>
              <p className='text-gray-400'>Empresas clientes por indústria</p>
            </div>
          </div>

          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={industryDistribution}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  fill='#d83dff'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Companies Table */}
      <div className='bg-secondary rounded-xl border border-tertiary overflow-hidden'>
        <div className='p-6 border-b border-tertiary'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl font-bold text-white'>
                Top Empresas Clientes
              </h3>
              <p className='text-gray-400 mt-1'>
                Empresas com maior volume de monitorização
              </p>
            </div>
            <div className='flex items-center space-x-2 text-sm text-gray-400'>
              <span>Ordenado por emails monitorizados</span>
              <TrendingUp className='w-4 h-4' />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-tertiary'>
              <tr>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Empresa
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Setor
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Emails Monitorizados
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Funcionários
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Estado
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Última Atividade
                </th>
                <th className='text-center px-6 py-4 text-sm font-medium text-gray-300'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-tertiary'>
              {topCompanies.map((company, index) => (
                <tr
                  key={company.id}
                  className='hover:bg-tertiary/50 transition-colors duration-200'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center relative'>
                        <Building2 className='w-5 h-5 text-white' />
                        {index < 3 && (
                          <div className='absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center'>
                            <span className='text-xs font-bold text-black'>{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className='text-white font-medium'>{company.name}</span>
                        <p className='text-xs text-gray-400'>
                          Cliente desde {company.joinDate.toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 bg-tertiary text-gray-300 rounded-full text-xs'>
                      {company.industry}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-gray-300 font-medium'>
                    {company.emailsMonitored.toLocaleString()}
                  </td>
                  <td className='px-6 py-4 text-gray-300'>{company.users}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${
                        company.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        company.status === "active" ? "bg-green-400" : "bg-red-400"
                      }`}></div>
                      <span>{company.status === "active" ? "Ativo" : "Inativo"}</span>
                    </span>
                  </td>
                  <td className='px-6 py-4 text-gray-300 text-sm'>
                    <div>
                      <p>{company.lastActivity.toLocaleDateString("pt-PT")}</p>
                      <p className='text-xs text-gray-500'>
                        {company.lastActivity.toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-center'>
                      <button className='p-2 text-gray-400 hover:text-primary transition-colors duration-200 hover:bg-tertiary rounded-lg'>
                        <Eye className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
        <h3 className='text-xl font-bold text-white mb-4'>Ações Rápidas</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <button className='flex items-center space-x-3 p-4 bg-tertiary rounded-lg hover:bg-tertiary/80 transition-colors duration-200 group'>
            <div className='w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200'>
              <Building2 className='w-5 h-5 text-primary' />
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Adicionar Empresa</p>
              <p className='text-xs text-gray-400'>Criar nova conta de cliente</p>
            </div>
          </button>

          <button className='flex items-center space-x-3 p-4 bg-tertiary rounded-lg hover:bg-tertiary/80 transition-colors duration-200 group'>
            <div className='w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200'>
              <BarChart3 className='w-5 h-5 text-blue-400' />
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Gerar Relatório</p>
              <p className='text-xs text-gray-400'>Relatório completo da plataforma</p>
            </div>
          </button>

          <button className='flex items-center space-x-3 p-4 bg-tertiary rounded-lg hover:bg-tertiary/80 transition-colors duration-200 group'>
            <div className='w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-200'>
              <Activity className='w-5 h-5 text-green-400' />
            </div>
            <div className='text-left'>
              <p className='text-white font-medium'>Monitorizar Sistema</p>
              <p className='text-xs text-gray-400'>Ver estado dos serviços</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;