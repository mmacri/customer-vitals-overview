
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { 
  formatCurrency, 
  formatPercentage, 
  formatNumber, 
  getTrendClass 
} from '@/utils/formatters';

interface MetricCardProps {
  title: string;
  count: number;
  label?: string;
  mrrChange?: number;
  mrrValue?: number;
  arrValue?: number;
  trend?: number;
  delay?: number;
  className?: string;
}

const MetricCard = ({ 
  title, 
  count, 
  label = '', 
  mrrChange, 
  mrrValue, 
  arrValue, 
  trend = 0,
  delay = 0,
  className = ''
}: MetricCardProps) => {
  // If this is a main card with only a count and trend
  const isMainCard = mrrChange === undefined;
  const trendClass = getTrendClass(isMainCard ? trend : (mrrChange || 0));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`data-card p-4 ${isMainCard ? 'bg-white rounded-lg shadow-sm' : ''} ${className}`}
    >
      {isMainCard ? (
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatNumber(count)}</span>
            {trend !== 0 && (
              <div className={`flex items-center ${trendClass} text-sm font-medium`}>
                {trend > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {formatPercentage(Math.abs(trend))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium text-2xl">{count}</span>
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          
          <div className="flex flex-col">
            <div className={`font-medium text-2xl ${trendClass}`}>
              {mrrChange && mrrChange > 0 && '+'}
              {mrrChange && formatPercentage(mrrChange)}
            </div>
            <span className="text-sm text-muted-foreground">MRR Change</span>
          </div>
          
          <div className="flex flex-col">
            <div className="font-medium text-2xl">
              {mrrValue && formatCurrency(mrrValue, 0)}
            </div>
            <span className="text-sm text-muted-foreground">{label} MRR</span>
          </div>
          
          <div className="flex flex-col">
            <div className="font-medium text-2xl">
              {arrValue && formatCurrency(arrValue, 0)}
            </div>
            <span className="text-sm text-muted-foreground">{label} ARR</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
