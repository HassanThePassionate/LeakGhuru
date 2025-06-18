/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Building2,
  Mail,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
} from "lucide-react";
import {
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
} from "recharts";

interface AdminStats {
  totalCompanies: number;
  totalEmailsMonitored: number;
  totalUsers: number;
  monthlyGrowth: number;
}

interface CompanyData {
  id: string;
  name: string;
  emailsMonitored: number;
  users: number;
  status: "active" | "inactive";
  lastActivity: Date;
}

interface EmailVolumeData {
  month: string;
  emails: number;
  companies: number;
}

const AdminDashboard: React.FC = () => {
  const [stats] = useState<AdminStats>({
    totalCompanies: 45,
    totalEmailsMonitored: 2847392,
    totalUsers: 1247,
    monthlyGrowth: 18.5,
  });

  const [emailVolumeData] = useState<EmailVolumeData[]>([
    { month: "Jan", emails: 185000, companies: 32 },
    { month: "Feb", emails: 210000, companies: 35 },
    { month: "Mar", emails: 245000, companies: 38 },
    { month: "Apr", emails: 280000, companies: 41 },
    { month: "May", emails: 315000, companies: 43 },
    { month: "Jun", emails: 350000, companies: 45 },
  ]);

  const [companyDistribution] = useState([
    { name: "Tecnologia", value: 18, color: "#d83dff" },
    { name: "Finanças", value: 12, color: "#ff3d83" },
    { name: "Saúde", value: 8, color: "#3d83ff" },
    { name: "Educação", value: 4, color: "#83ff3d" },
    { name: "Outros", value: 3, color: "#ff833d" },
  ]);

  const [topCompanies] = useState<CompanyData[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      emailsMonitored: 124536,
      users: 247,
      status: "active",
      lastActivity: new Date("2024-01-15T14:30:00"),
    },
    {
      id: "2",
      name: "FinanceMax Ltd",
      emailsMonitored: 98742,
      users: 189,
      status: "active",
      lastActivity: new Date("2024-01-15T13:45:00"),
    },
    {
      id: "3",
      name: "HealthCare Pro",
      emailsMonitored: 87321,
      users: 156,
      status: "active",
      lastActivity: new Date("2024-01-15T12:20:00"),
    },
    {
      id: "4",
      name: "EduTech Systems",
      emailsMonitored: 65489,
      users: 98,
      status: "inactive",
      lastActivity: new Date("2024-01-14T16:15:00"),
    },
    {
      id: "5",
      name: "RetailChain Inc",
      emailsMonitored: 54321,
      users: 87,
      status: "active",
      lastActivity: new Date("2024-01-15T11:30:00"),
    },
  ]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-secondary border border-tertiary rounded-lg p-4 shadow-xl'>
          <p className='text-white font-medium mb-2'>{`Mês: ${label}`}</p>
          <p className='text-primary'>
            {`Emails: ${payload[0].value.toLocaleString()}`}
          </p>
          {payload[1] && (
            <p className='text-blue-400'>{`Empresas: ${payload[1].value}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='space-y-6 animate-fade-in'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Painel Administrativo
          </h1>
          <p className='text-gray-400'>Visão geral da plataforma LeakGuard</p>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='text-right'>
            <p className='text-sm font-medium text-white'>Admin Dashboard</p>
            <p className='text-xs text-gray-400'>
              Última atualização: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Empresas Clientes
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.totalCompanies}
              </p>
              <p className='text-sm font-medium text-green-400'>
                +12% este mês
              </p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-primary/10 text-primary border-primary/20'>
              <Building2 className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Emails Monitorados
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.totalEmailsMonitored.toLocaleString()}
              </p>
              <p className='text-sm font-medium text-green-400'>
                +{stats.monthlyGrowth}% este mês
              </p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-blue-500/10 text-blue-400 border-blue-500/20'>
              <Mail className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Usuários Totais
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className='text-sm font-medium text-green-400'>+8% este mês</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-green-500/10 text-green-400 border-green-500/20'>
              <Users className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-secondary rounded-xl p-6 border border-tertiary hover:border-primary/30 transition-all duration-300'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <p className='text-gray-400 text-sm font-medium mb-2'>
                Crescimento Mensal
              </p>
              <p className='text-3xl font-bold text-white mb-2'>
                {stats.monthlyGrowth}%
              </p>
              <p className='text-sm font-medium text-green-400'>
                Tendência positiva
              </p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center border bg-orange-500/10 text-orange-400 border-orange-500/20'>
              <TrendingUp className='w-6 h-6' />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Email Volume Chart */}
        <div className='bg-secondary rounded-xl p-6 border border-tertiary'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white mb-2'>
                Volume de Emails Monitorados
              </h3>
              <p className='text-gray-400'>Crescimento mensal da plataforma</p>
            </div>
            <BarChart3 className='w-8 h-8 text-primary' />
          </div>

          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={emailVolumeData}>
                <defs>
                  <linearGradient
                    id='emailGradient'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='5%' stopColor='#d83dff' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#d83dff' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='#2b1b2f' />
                <XAxis dataKey='month' stroke='#9ca3af' fontSize={12} />
                <YAxis stroke='#9ca3af' fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type='monotone'
                  dataKey='emails'
                  stroke='#d83dff'
                  strokeWidth={2}
                  fill='url(#emailGradient)'
                />
                <Line
                  type='monotone'
                  dataKey='companies'
                  stroke='#3d83ff'
                  strokeWidth={2}
                  dot={{ fill: "#3d83ff", strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Distribution */}
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
                  data={companyDistribution}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  fill='#d83dff'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {companyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Companies Table */}
      <div className='bg-secondary rounded-xl border border-tertiary overflow-hidden'>
        <div className='p-6 border-b border-tertiary'>
          <h3 className='text-xl font-bold text-white'>
            Top Empresas Clientes
          </h3>
          <p className='text-gray-400 mt-1'>
            Empresas com maior volume de monitoramento
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-tertiary'>
              <tr>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Empresa
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Emails Monitorados
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Usuários
                </th>
                <th className='text-left px-6 py-4 text-sm font-medium text-gray-300'>
                  Status
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
              {topCompanies.map((company) => (
                <tr
                  key={company.id}
                  className='hover:bg-tertiary/50 transition-colors duration-200'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                        <Building2 className='w-5 h-5 text-white' />
                      </div>
                      <span className='text-white font-medium'>
                        {company.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-300'>
                    {company.emailsMonitored.toLocaleString()}
                  </td>
                  <td className='px-6 py-4 text-gray-300'>{company.users}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        company.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {company.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-gray-300'>
                    {company.lastActivity.toLocaleDateString("pt-BR")} às{" "}
                    {company.lastActivity.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-center'>
                      <button className='p-2 text-gray-400 hover:text-primary transition-colors duration-200'>
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
    </div>
  );
};

export default AdminDashboard;
