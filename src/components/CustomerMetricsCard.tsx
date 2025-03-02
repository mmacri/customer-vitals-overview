
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { formatPercentage } from '@/utils/formatters';

interface CustomerMetricsCardProps {
  title: string;
  data: {
    month: string;
    value: number;
    target?: number;
  }[];
  metric: 'CSAT' | 'NPS' | 'Retention' | 'Onboarding' | 'Health';
  currentValue: number;
  previousValue: number;
  target: number;
}

const CustomerMetricsCard = ({ 
  title, 
  data, 
  metric, 
  currentValue, 
  previousValue, 
  target 
}: CustomerMetricsCardProps) => {
  const getStatusColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1) return 'text-green-600';
    if (ratio >= 0.8) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getBarColor = (metric: string) => {
    switch(metric) {
      case 'CSAT': return '#4f46e5';
      case 'NPS': return '#06b6d4';
      case 'Retention': return '#10b981';
      case 'Onboarding': return '#f59e0b';
      case 'Health': return '#8b5cf6';
      default: return '#6b7280';
    }
  };
  
  const change = currentValue - previousValue;
  const statusColor = getStatusColor(currentValue, target);
  const barColor = getBarColor(metric);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className={`text-lg font-bold ${statusColor}`}>
          {formatPercentage(currentValue / 100)}
          <span className={`text-xs ml-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}
            {formatPercentage(change / 100)}
          </span>
        </div>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              domain={[0, Math.max(100, ...data.map(d => d.value)) * 1.1]} 
              tickFormatter={(value) => `${value}%`}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <RechartsTooltip 
              formatter={(value: number) => [`${value}%`, metric]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar 
              dataKey="value" 
              fill={barColor} 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 text-sm text-center text-muted-foreground">
        Target: {formatPercentage(target / 100)}
      </div>
    </div>
  );
};

export default CustomerMetricsCard;
