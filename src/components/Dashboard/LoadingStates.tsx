import React from 'react';

export const MetricCardSkeleton: React.FC = () => (
  <div className="bg-secondary rounded-xl p-6 border border-tertiary animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="h-4 bg-tertiary rounded w-24 mb-2"></div>
        <div className="h-8 bg-tertiary rounded w-16 mb-2"></div>
        <div className="h-3 bg-tertiary rounded w-20"></div>
      </div>
      <div className="w-12 h-12 bg-tertiary rounded-lg"></div>
    </div>
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <div className="bg-secondary rounded-xl p-6 border border-tertiary animate-pulse">
    <div className="h-6 bg-tertiary rounded w-32 mb-6"></div>
    <div className="h-64 bg-tertiary rounded"></div>
  </div>
);

export const TableSkeleton: React.FC = () => (
  <div className="bg-secondary rounded-xl border border-tertiary overflow-hidden animate-pulse">
    <div className="p-6 border-b border-tertiary">
      <div className="h-6 bg-tertiary rounded w-32"></div>
    </div>
    <div className="p-6 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-4 bg-tertiary rounded flex-1"></div>
          <div className="h-4 bg-tertiary rounded w-20"></div>
          <div className="h-4 bg-tertiary rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-8 bg-tertiary rounded w-48 mb-2"></div>
        <div className="h-4 bg-tertiary rounded w-64"></div>
      </div>
      <div className="flex space-x-4">
        <div className="h-10 bg-tertiary rounded w-24"></div>
        <div className="h-10 bg-tertiary rounded w-24"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>

    <TableSkeleton />
  </div>
);