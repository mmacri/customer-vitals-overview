import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomerMetricsSummaryProps {
  newCustomers: {
    count: number;
    mrrChange: number;
    mrrValue: number;
    arrValue: number;
    label: string;
    trend: number;
  };
  upsellCustomers: {
    count: number;
    mrrChange: number;
    mrrValue: number;
    arrValue: number;
    label: string;
    trend: number;
  };
  downgradeCustomers: {
    count: number;
    mrrChange: number;
    mrrValue: number;
    arrValue: number;
    label: string;
    trend: number;
  };
  churnCustomers: {
    count: number;
    mrrChange: number;
    mrrValue: number;
    arrValue: number;
    label: string;
    trend: number;
  };
  pieChartData: {
    name: string;
    value: number;
    color: string;
  }[];
  onFilterChange?: (filter: string | null) => void;
  activeFilter: string | null;
}

const CustomerMetricsSummary: React.FC<CustomerMetricsSummaryProps> = ({
  newCustomers,
  upsellCustomers,
  downgradeCustomers,
  churnCustomers,
  pieChartData,
  onFilterChange,
  activeFilter
}) => {
  // Calculate percentages for the pie chart
  const totalValue = pieChartData.reduce((sum, item) => sum + item.value, 0);
  
  // Animation variants for the metrics cards
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Get trend indicator arrow and color
  const getTrendIndicator = (value: number) => {
    if (value === 0) return null;
    
    const isPositive = value > 0;
    const color = isPositive ? 'text-green-500' : 'text-red-500';
    const Arrow = isPositive ? ArrowUp : ArrowDown;
    
    return (
      <span className={`flex items-center ${color}`}>
        <Arrow className="w-4 h-4 mr-1" />
        {formatPercentage(Math.abs(value))}
      </span>
    );
  };

  // Handle pie segment clicks
  const handlePieClick = (data: any, index: number) => {
    const clickedSegment = data.name;
    if (activeFilter === clickedSegment) {
      // If already selected, deselect it
      onFilterChange?.(null);
    } else {
      // Otherwise, select it
      onFilterChange?.(clickedSegment);
    }
  };

  // Determine if a card should be highlighted based on the active filter
  const isCardHighlighted = (cardType: string) => {
    return activeFilter === cardType || activeFilter === null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Chart showing percentage breakdown */}
      <motion.div 
        className="md:col-span-4 lg:col-span-1 bg-white rounded-lg shadow-sm p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          Customer Distribution
          {activeFilter && (
            <button 
              onClick={() => onFilterChange?.(null)} 
              className="ml-2 text-sm text-primary hover:underline"
            >
              (Clear Filter)
            </button>
          )}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                onClick={handlePieClick}
                cursor="pointer"
              >
                {pieChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={activeFilter === null || activeFilter === entry.name ? 1 : 0.4}
                    stroke={activeFilter === entry.name ? "#000" : "none"}
                    strokeWidth={activeFilter === entry.name ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'ARR']}
              />
              <Legend 
                formatter={(value, entry, index) => {
                  const percentage = pieChartData[index!].value / totalValue;
                  return (
                    <span 
                      style={{ 
                        color: activeFilter === null || activeFilter === value ? '#000' : '#aaa',
                        fontWeight: activeFilter === value ? 'bold' : 'normal',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePieClick({ name: value }, index!)}
                    >
                      {value}: {formatPercentage(percentage)}
                    </span>
                  );
                }}
                onClick={(data) => handlePieClick(data, pieChartData.findIndex(item => item.name === data.value))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* New Customers Card */}
      <motion.div 
        variants={cardVariants} 
        initial="initial" 
        animate="animate" 
        transition={{ delay: 0.3 }}
        className={`bg-green-50 rounded-lg p-4 ${isCardHighlighted('New') ? 'ring-2 ring-green-500' : 'opacity-80'}`}
        style={{ opacity: isCardHighlighted('New') ? 1 : 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-3">New</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold">{newCustomers.count}</span>
            {getTrendIndicator(newCustomers.trend)}
          </div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>
              <div className="text-muted-foreground">MRR Change</div>
              <div className="font-medium text-green-600">
                {formatPercentage(newCustomers.mrrChange)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">MRR Value</div>
              <div className="font-medium">
                {formatCurrency(newCustomers.mrrValue, 0)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">ARR Value</div>
              <div className="font-medium">
                {formatCurrency(newCustomers.arrValue, 0)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upsell Customers Card */}
      <motion.div 
        variants={cardVariants} 
        initial="initial" 
        animate="animate" 
        transition={{ delay: 0.4 }}
        className={`bg-blue-50 rounded-lg p-4 ${isCardHighlighted('Upsell') ? 'ring-2 ring-blue-500' : 'opacity-80'}`}
        style={{ opacity: isCardHighlighted('Upsell') ? 1 : 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-3">Upsell</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold">{upsellCustomers.count}</span>
            {getTrendIndicator(upsellCustomers.trend)}
          </div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>
              <div className="text-muted-foreground">MRR Change</div>
              <div className="font-medium text-blue-600">
                {formatPercentage(upsellCustomers.mrrChange)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">MRR Value</div>
              <div className="font-medium">
                {formatCurrency(upsellCustomers.mrrValue, 0)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">ARR Value</div>
              <div className="font-medium">
                {formatCurrency(upsellCustomers.arrValue, 0)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Downgrade Customers Card */}
      <motion.div 
        variants={cardVariants} 
        initial="initial" 
        animate="animate" 
        transition={{ delay: 0.5 }}
        className={`bg-orange-50 rounded-lg p-4 ${isCardHighlighted('Downgrade') ? 'ring-2 ring-orange-500' : 'opacity-80'}`}
        style={{ opacity: isCardHighlighted('Downgrade') ? 1 : 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-3">Downgrade</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold">{downgradeCustomers.count}</span>
            {getTrendIndicator(downgradeCustomers.trend)}
          </div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>
              <div className="text-muted-foreground">MRR Change</div>
              <div className="font-medium text-orange-600">
                {formatPercentage(downgradeCustomers.mrrChange)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">MRR Value</div>
              <div className="font-medium">
                {formatCurrency(downgradeCustomers.mrrValue, 0)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">ARR Value</div>
              <div className="font-medium">
                {formatCurrency(downgradeCustomers.arrValue, 0)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Churn Customers Card */}
      <motion.div 
        variants={cardVariants} 
        initial="initial" 
        animate="animate" 
        transition={{ delay: 0.6 }}
        className={`bg-red-50 rounded-lg p-4 ${isCardHighlighted('Churn') ? 'ring-2 ring-red-500' : 'opacity-80'}`}
        style={{ opacity: isCardHighlighted('Churn') ? 1 : 0.7 }}
      >
        <h3 className="text-xl font-semibold mb-3">Churn</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-3xl font-bold">{churnCustomers.count}</span>
            {getTrendIndicator(churnCustomers.trend)}
          </div>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>
              <div className="text-muted-foreground">MRR Change</div>
              <div className="font-medium text-red-600">
                {formatPercentage(churnCustomers.mrrChange)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">MRR Value</div>
              <div className="font-medium">
                {formatCurrency(churnCustomers.mrrValue, 0)}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">ARR Value</div>
              <div className="font-medium">
                {formatCurrency(churnCustomers.arrValue, 0)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerMetricsSummary;
