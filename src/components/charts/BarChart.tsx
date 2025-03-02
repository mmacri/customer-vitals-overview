
import { useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface BarChartProps {
  data: {
    date: Date;
    new: number;
    upsell: number;
    downgrade: number;
    churn: number;
  }[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    return (
      <div className="bg-white p-3 border rounded-md shadow-md">
        <p className="font-medium">{formatDate(date)}</p>
        <div className="space-y-1 mt-2">
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}: </span>
              <span className="text-sm font-medium">{formatCurrency(entry.value as number)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const BarChart = ({ data, title }: BarChartProps) => {
  const [focusBar, setFocusBar] = useState<string | null>(null);
  
  const handleMouseEnter = (dataKey: string) => {
    setFocusBar(dataKey);
  };
  
  const handleMouseLeave = () => {
    setFocusBar(null);
  };
  
  // Transform data for recharts
  const transformedData = data.map(item => ({
    date: item.date.toISOString(),
    new: item.new,
    upsell: item.upsell,
    downgrade: item.downgrade,
    churn: item.churn,
  }));
  
  const getOpacity = (dataKey: string) => {
    if (!focusBar) return 1;
    return focusBar === dataKey ? 1 : 0.3;
  };
  
  return (
    <div className="data-card">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
              }}
              tickLine={false}
              axisLine={{ strokeOpacity: 0.3 }}
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value === 0) return '0';
                if (Math.abs(value) >= 1000) {
                  return `${(value / 1000).toFixed(0)}k`;
                }
                return value;
              }}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              onMouseEnter={({ dataKey }) => handleMouseEnter(dataKey as string)}
              onMouseLeave={handleMouseLeave}
            />
            <Bar
              dataKey="new"
              name="New"
              stackId="a"
              fill="#4CAF50"
              opacity={getOpacity('new')}
              animationDuration={1000}
            />
            <Bar
              dataKey="upsell"
              name="Upsell"
              stackId="a"
              fill="#2196F3"
              opacity={getOpacity('upsell')}
              animationDuration={1200}
            />
            <Bar
              dataKey="downgrade"
              name="Downgrade"
              stackId="a"
              fill="#FF9800"
              opacity={getOpacity('downgrade')}
              animationDuration={1400}
            />
            <Bar
              dataKey="churn"
              name="Churn"
              stackId="a"
              fill="#F44336"
              opacity={getOpacity('churn')}
              animationDuration={1600}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
