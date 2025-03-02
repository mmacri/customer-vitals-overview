import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CustomersByTimePeriod {
  period: string;
  healthy: number;
  neutral: number;
  atRisk: number;
  renewed: number;
  lost: number;
  total: number;
}

interface CustomerHealthRenewalMetricsProps {
  totalCustomers: number;
  totalCustomersTrend: number;
  customersByTimePeriod: CustomersByTimePeriod[];
  filter: string | null;
}

const CustomerHealthRenewalMetrics: React.FC<CustomerHealthRenewalMetricsProps> = ({
  totalCustomers,
  totalCustomersTrend,
  customersByTimePeriod,
  filter
}) => {
  // Apply filtering if a filter is active
  const filteredData = filter 
    ? customersByTimePeriod.map(period => ({
        ...period,
        // Only keep values related to the selected filter
        healthy: filter === 'New' ? period.healthy : 0,
        neutral: filter === 'Upsell' ? period.neutral : 0,
        atRisk: filter === 'Downgrade' ? period.atRisk : 0,
        lost: filter === 'Churn' ? period.lost : 0,
        renewed: ['New', 'Upsell'].includes(filter || '') ? period.renewed : 0,
      }))
    : customersByTimePeriod;

  // Create data for the health chart
  const healthData = filteredData.map(period => ({
    period: period.period,
    Healthy: period.healthy,
    Neutral: period.neutral,
    'At Risk': period.atRisk
  }));

  // Create data for the renewal chart
  const renewalData = filteredData.map(period => ({
    period: period.period,
    Renewed: period.renewed,
    Lost: period.lost
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Customer Health & Renewal</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filter ? `Filtered by ${filter} customer segment` : 'All customer segments'}
          </p>
        </div>
        <div className="mt-2 md:mt-0 bg-gray-50 rounded-lg px-4 py-2">
          <div className="text-sm text-muted-foreground">Total Customers</div>
          <div className="text-2xl font-bold">{totalCustomers}
            <span className={`ml-2 text-sm ${totalCustomersTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalCustomersTrend >= 0 ? '+' : ''}{formatPercentage(totalCustomersTrend)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Health Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Customer Health by Period</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={healthData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barGap={2}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} Customers`, '']}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                <Bar dataKey="Healthy" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Neutral" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="At Risk" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Renewal Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Customer Renewal by Period</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={renewalData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                barGap={2}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} Customers`, '']}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                <Bar dataKey="Renewed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Lost" fill="#9ca3af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6">
        {customersByTimePeriod.map((period, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-500 mb-1">{period.period}</div>
            <div className="text-lg font-bold">{period.total}</div>
            <div className="text-xs text-muted-foreground mt-2">
              {formatPercentage(period.healthy / period.total)} Healthy
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomerHealthRenewalMetrics;
