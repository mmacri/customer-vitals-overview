
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, User, Users, AlertTriangle } from 'lucide-react';
import { formatPercentage } from '@/utils/formatters';

interface CustomerHealthCardProps {
  customer: {
    id: string;
    name: string;
    healthScore: number;
    previousHealthScore: number;
    status: 'Healthy' | 'Neutral' | 'At Risk';
    csm: string;
    issues: number;
    daysToRenewal: number;
  };
  index: number;
}

const CustomerHealthCard = ({ customer, index }: CustomerHealthCardProps) => {
  const scoreChange = customer.healthScore - customer.previousHealthScore;
  
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800';
      case 'Neutral':
        return 'bg-amber-100 text-amber-800';
      case 'At Risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-lg shadow-sm p-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{customer.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <User className="h-3.5 w-3.5 mr-1" />
            <span>CSM: {customer.csm}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(customer.status)}`}>
          {customer.status}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Health Score</div>
          <div className={`text-xl font-bold ${getScoreColor(customer.healthScore)}`}>
            {customer.healthScore}%
            <span className="ml-1 text-xs">
              {scoreChange > 0 && <ArrowUp className="inline h-3 w-3 text-green-500" />}
              {scoreChange < 0 && <ArrowDown className="inline h-3 w-3 text-red-500" />}
              {scoreChange !== 0 && formatPercentage(Math.abs(scoreChange / 100))}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Issues</div>
          <div className="text-xl font-bold flex justify-center items-center">
            {customer.issues > 0 ? (
              <>
                <AlertTriangle className={`h-4 w-4 mr-1 ${customer.issues > 2 ? 'text-red-500' : 'text-amber-500'}`} />
                {customer.issues}
              </>
            ) : (
              <span className="text-green-500">0</span>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-1">Renewal</div>
          <div className={`text-xl font-bold ${customer.daysToRenewal < 30 ? 'text-red-500' : customer.daysToRenewal < 90 ? 'text-amber-500' : 'text-primary'}`}>
            {customer.daysToRenewal} days
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerHealthCard;
