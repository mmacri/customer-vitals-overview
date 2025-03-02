
import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import MetricCard from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import BarChart from '@/components/charts/BarChart';
import MapChart from '@/components/charts/MapChart';
import { generateMockData, mockDashboardData } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Index = () => {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(true);

  // Handle date range change
  const handleDateChange = (startDate: Date, endDate: Date) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newData = generateMockData();
      newData.dateRange = { startDate, endDate };
      setDashboardData(newData);
      setLoading(false);
    }, 800);
  };

  // Format map data for the charts
  const countryMapData = dashboardData.arrByCountry.reduce((acc, { country, value }) => {
    acc[country] = value;
    return acc;
  }, {} as { [key: string]: number });

  const stateMapData = dashboardData.arrByState.reduce((acc, { state, value }) => {
    acc[state] = value;
    return acc;
  }, {} as { [key: string]: number });

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <DashboardHeader 
          title="Customer Success Dashboard 2017" 
          dateRange={dashboardData.dateRange}
          onDateChange={handleDateChange}
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants} className="md:col-span-4">
            <MetricCard 
              title="Paying Customers" 
              count={dashboardData.payingCustomers.count} 
              trend={dashboardData.payingCustomers.trend}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="data-card p-4 md:col-span-1 bg-green-50">
            <div className="mb-2">
              <h2 className="text-xl font-semibold">New</h2>
            </div>
            <MetricCard 
              title=""
              count={dashboardData.newCustomers.count} 
              label={dashboardData.newCustomers.label}
              mrrChange={dashboardData.newCustomers.mrrChange}
              mrrValue={dashboardData.newCustomers.mrrValue}
              arrValue={dashboardData.newCustomers.arrValue}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="data-card p-4 md:col-span-1 bg-blue-50">
            <div className="mb-2">
              <h2 className="text-xl font-semibold">Upsell</h2>
            </div>
            <MetricCard 
              title=""
              count={dashboardData.upsellCustomers.count} 
              label={dashboardData.upsellCustomers.label}
              mrrChange={dashboardData.upsellCustomers.mrrChange}
              mrrValue={dashboardData.upsellCustomers.mrrValue}
              arrValue={dashboardData.upsellCustomers.arrValue}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="data-card p-4 md:col-span-1 bg-orange-50">
            <div className="mb-2">
              <h2 className="text-xl font-semibold">Downgrade</h2>
            </div>
            <MetricCard 
              title=""
              count={dashboardData.downgradeCustomers.count} 
              label={dashboardData.downgradeCustomers.label}
              mrrChange={dashboardData.downgradeCustomers.mrrChange}
              mrrValue={dashboardData.downgradeCustomers.mrrValue}
              arrValue={dashboardData.downgradeCustomers.arrValue}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="data-card p-4 md:col-span-1 bg-red-50">
            <div className="mb-2">
              <h2 className="text-xl font-semibold">Churn</h2>
            </div>
            <MetricCard 
              title=""
              count={dashboardData.churnCustomers.count} 
              label={dashboardData.churnCustomers.label}
              mrrChange={dashboardData.churnCustomers.mrrChange}
              mrrValue={dashboardData.churnCustomers.mrrValue}
              arrValue={dashboardData.churnCustomers.arrValue}
            />
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DataTable data={dashboardData.upsells} title="Upsells" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <DataTable data={dashboardData.downgrades} title="Downgrades" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <BarChart data={dashboardData.arrChangesByMonth} title="ARR Changes" />
        </motion.div>
        
        <Tabs defaultValue="country" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Geographic Distribution</h3>
            <TabsList>
              <TabsTrigger value="country">By Country</TabsTrigger>
              <TabsTrigger value="state">By US State</TabsTrigger>
            </TabsList>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <TabsContent value="country">
              <MapChart 
                data={countryMapData} 
                geoType="world" 
                title="ARR by Country" 
              />
            </TabsContent>
            
            <TabsContent value="state">
              <MapChart 
                data={stateMapData} 
                geoType="usa" 
                title="ARR by US State" 
              />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
