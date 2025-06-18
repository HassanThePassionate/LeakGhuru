import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { EmailVolumeData } from '../../types';

interface EmailVolumeChartProps {
  data: EmailVolumeData[];
}

const EmailVolumeChart: React.FC<EmailVolumeChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary border border-tertiary rounded-lg p-4 shadow-xl">
          <p className="text-white font-medium mb-2">{`Mês: ${label}`}</p>
          <p className="text-primary">
            {`Emails: ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-red-400">
            {`Fugas: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Monitorização do Volume de Email</h3>
        <p className="text-gray-400">Tendências mensais de monitorização de email e deteção de fugas</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d83dff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d83dff" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="leakGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b1b2f" />
            <XAxis 
              dataKey="month" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="emails"
              stroke="#d83dff"
              strokeWidth={2}
              fill="url(#emailGradient)"
            />
            <Line
              type="monotone"
              dataKey="leaks"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmailVolumeChart;