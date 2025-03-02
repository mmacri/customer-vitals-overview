
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, BarChart3, HeartPulse, AlarmClock, MessageSquare, Package, Ticket, Building } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userType: 'internal' | 'customer';
}

const DashboardNav = ({ activeView, onViewChange, userType }: DashboardNavProps) => {
  const internalViews = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Building },
    { id: 'health', label: 'Customer Health', icon: HeartPulse },
    { id: 'escalations', label: 'Escalations', icon: AlarmClock },
    { id: 'usage', label: 'Product Usage', icon: Package },
    { id: 'implementation', label: 'Implementation', icon: Users },
    { id: 'metrics', label: 'CS Metrics', icon: BarChart3 },
  ];

  const customerViews = [
    { id: 'customer-overview', label: 'Overview', icon: BarChart3 },
    { id: 'adoption', label: 'Adoption', icon: BarChart3 },
    { id: 'products', label: 'Your Products', icon: Package },
    { id: 'tickets', label: 'Support Tickets', icon: Ticket },
    { id: 'escalations', label: 'Escalations', icon: MessageSquare },
    { id: 'team', label: 'Account Team', icon: Users },
    { id: 'kpis', label: 'KPIs', icon: HeartPulse },
  ];

  const views = userType === 'internal' ? internalViews : customerViews;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm mb-6"
    >
      <Tabs value={activeView} onValueChange={onViewChange} className="w-full">
        <TabsList className="w-full p-1 bg-muted/40 grid grid-flow-col auto-cols-fr">
          {views.map((view) => (
            <TabsTrigger 
              key={view.id} 
              value={view.id}
              className="flex items-center gap-2 px-4 py-2"
            >
              <view.icon className="h-4 w-4" />
              <span className="hidden md:inline">{view.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default DashboardNav;
