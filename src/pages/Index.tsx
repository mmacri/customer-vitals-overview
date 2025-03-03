import { useState, useEffect, useMemo } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import MetricCard from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import BarChart from '@/components/charts/BarChart';
import MapChart from '@/components/charts/MapChart';
import DashboardNav from '@/components/DashboardNav';
import UserTypeSwitch from '@/components/UserTypeSwitch';
import CustomerHealthCard from '@/components/CustomerHealthCard';
import CustomerMetricsCard from '@/components/CustomerMetricsCard';
import CustomerFilter from '@/components/CustomerFilter';
import CustomerAccountDetails from '@/components/CustomerAccountDetails';
import CustomerMetricsSummary from '@/components/CustomerMetricsSummary';
import CustomerHealthRenewalMetrics from '@/components/CustomerHealthRenewalMetrics';
import { generateMockData, mockDashboardData } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock customer account data
const mockCustomerAccount = {
  accountTeam: [
    { 
      id: '1', 
      name: 'John Smith', 
      role: 'Customer Success Manager',
      email: 'john.smith@company.com',
      phone: '(555) 123-4567'
    },
    { 
      id: '2', 
      name: 'Emily Davis', 
      role: 'Technical Account Manager',
      email: 'emily.davis@company.com',
      phone: '(555) 234-5678'
    },
    { 
      id: '3', 
      name: 'Michael Brown', 
      role: 'Solutions Engineer',
      email: 'michael.brown@company.com',
      phone: '(555) 345-6789'
    }
  ],
  supportTickets: [
    { 
      id: 'TICK-1234', 
      title: 'Integration with CRM not working', 
      priority: 'High',
      status: 'Open',
      created: '2023-06-15',
      updated: '2023-06-16'
    },
    { 
      id: 'TICK-1235', 
      title: 'User permissions issue', 
      priority: 'Medium',
      status: 'In Progress',
      created: '2023-06-10',
      updated: '2023-06-14'
    },
    { 
      id: 'TICK-1236', 
      title: 'Report data inaccuracy', 
      priority: 'Low',
      status: 'Closed',
      created: '2023-05-28',
      updated: '2023-06-02'
    },
    { 
      id: 'TICK-1237', 
      title: 'Dashboard loading slowly', 
      priority: 'Medium',
      status: 'Open',
      created: '2023-06-14',
      updated: '2023-06-14'
    }
  ],
  products: [
    {
      id: '1',
      name: 'Core Platform',
      status: 'Active',
      usageTarget: 90,
      currentUsage: 85
    },
    {
      id: '2',
      name: 'Analytics Suite',
      status: 'Active',
      usageTarget: 75,
      currentUsage: 68
    },
    {
      id: '3',
      name: 'Integration Platform',
      status: 'Implementation',
      usageTarget: 60,
      currentUsage: 25
    }
  ],
  escalations: [
    {
      id: 'ESC-001',
      title: 'API Performance Issue',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Emily Davis',
      created: '2023-06-10',
      updated: '2023-06-15'
    },
    {
      id: 'ESC-002',
      title: 'Data Migration Blocker',
      priority: 'Critical',
      status: 'Open',
      assignedTo: 'Michael Brown',
      created: '2023-06-16',
      updated: '2023-06-16'
    }
  ]
};

// Mock customer health data
const mockCustomerHealth = [
  { 
    id: '1', 
    name: 'Acme Corporation', 
    healthScore: 85, 
    previousHealthScore: 80, 
    status: 'Healthy' as const, 
    csm: 'John Smith',
    issues: 0,
    daysToRenewal: 120
  },
  { 
    id: '2', 
    name: 'TechNova Solutions', 
    healthScore: 72, 
    previousHealthScore: 78, 
    status: 'Neutral' as const, 
    csm: 'Sarah Johnson',
    issues: 1,
    daysToRenewal: 60
  },
  { 
    id: '3', 
    name: 'Global Enterprises', 
    healthScore: 45, 
    previousHealthScore: 40, 
    status: 'At Risk' as const, 
    csm: 'Michael Brown',
    issues: 3,
    daysToRenewal: 25
  },
  { 
    id: '4', 
    name: 'Future Innovations', 
    healthScore: 92, 
    previousHealthScore: 88, 
    status: 'Healthy' as const, 
    csm: 'Emily Davis',
    issues: 0,
    daysToRenewal: 180
  },
  { 
    id: '5', 
    name: 'Quantum Systems', 
    healthScore: 63, 
    previousHealthScore: 70, 
    status: 'Neutral' as const, 
    csm: 'David Wilson',
    issues: 2,
    daysToRenewal: 45
  },
  { 
    id: '6', 
    name: 'Pinnacle Group', 
    healthScore: 38, 
    previousHealthScore: 55, 
    status: 'At Risk' as const, 
    csm: 'Jessica Taylor',
    issues: 4,
    daysToRenewal: 15
  }
];

// Mock metrics data
const mockMetricsData = {
  csat: {
    current: 87,
    previous: 82,
    target: 90,
    data: [
      { month: 'Jan', value: 78 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 82 },
      { month: 'Apr', value: 85 },
      { month: 'May', value: 87 },
      { month: 'Jun', value: 87 }
    ]
  },
  nps: {
    current: 42,
    previous: 38,
    target: 50,
    data: [
      { month: 'Jan', value: 32 },
      { month: 'Feb', value: 35 },
      { month: 'Mar', value: 38 },
      { month: 'Apr', value: 40 },
      { month: 'May', value: 41 },
      { month: 'Jun', value: 42 }
    ]
  },
  retention: {
    current: 92,
    previous: 90,
    target: 95,
    data: [
      { month: 'Jan', value: 89 },
      { month: 'Feb', value: 90 },
      { month: 'Mar', value: 90 },
      { month: 'Apr', value: 91 },
      { month: 'May', value: 92 },
      { month: 'Jun', value: 92 }
    ]
  },
  onboarding: {
    current: 78,
    previous: 72,
    target: 85,
    data: [
      { month: 'Jan', value: 68 },
      { month: 'Feb', value: 70 },
      { month: 'Mar', value: 72 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 77 },
      { month: 'Jun', value: 78 }
    ]
  },
  health: {
    current: 81,
    previous: 76,
    target: 85,
    data: [
      { month: 'Jan', value: 72 },
      { month: 'Feb', value: 74 },
      { month: 'Mar', value: 76 },
      { month: 'Apr', value: 78 },
      { month: 'May', value: 80 },
      { month: 'Jun', value: 81 }
    ]
  }
};

// Mock customer health and renewal data by time period
const mockCustomersByTimePeriod = [
  {
    period: 'This Quarter',
    healthy: 480,
    neutral: 220,
    atRisk: 95,
    renewed: 180,
    lost: 35,
    total: 795
  },
  {
    period: 'Next Quarter',
    healthy: 520,
    neutral: 190,
    atRisk: 75,
    renewed: 210,
    lost: 30,
    total: 785
  },
  {
    period: 'Last Quarter',
    healthy: 450,
    neutral: 230,
    atRisk: 110,
    renewed: 160,
    lost: 45,
    total: 790
  },
  {
    period: 'Last 6 Months',
    healthy: 915,
    neutral: 440,
    atRisk: 195,
    renewed: 330,
    lost: 72,
    total: 1550
  },
  {
    period: 'Fiscal Year',
    healthy: 1850,
    neutral: 820,
    atRisk: 380,
    renewed: 640,
    lost: 140,
    total: 3050
  },
  {
    period: 'YTD',
    healthy: 1520,
    neutral: 680,
    atRisk: 305,
    renewed: 510,
    lost: 115,
    total: 2505
  }
];

const Index = () => {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'internal' | 'customer'>('internal');
  const [activeView, setActiveView] = useState('overview');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedSalesRep, setSelectedSalesRep] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Handle filter change from pie chart selection
  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

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

  // Filter data based on active filter
  const filteredData = useMemo(() => {
    if (!activeFilter) return dashboardData;

    // Create a copy of the dashboard data to modify
    const filtered = {...dashboardData};
    
    // Filter tables based on the selected segment
    if (activeFilter === 'New') {
      // Only show new customer data
      filtered.upsells = [];
      filtered.downgrades = [];
    } else if (activeFilter === 'Upsell') {
      // Only show upsell data
      filtered.downgrades = [];
    } else if (activeFilter === 'Downgrade') {
      // Only show downgrade data
      filtered.upsells = [];
    } else if (activeFilter === 'Churn') {
      // Don't show upsells or downgrades for churned customers
      filtered.upsells = [];
      filtered.downgrades = [];
    }

    return filtered;
  }, [dashboardData, activeFilter]);

  // Format map data for the charts
  const countryMapData = filteredData.arrByCountry.reduce((acc, { country, value }) => {
    acc[country] = value;
    return acc;
  }, {} as { [key: string]: number });

  const stateMapData = filteredData.arrByState.reduce((acc, { state, value }) => {
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

  // Prepare data for customer metrics pie chart
  const customerMetricsPieData = [
    { name: 'New', value: dashboardData.newCustomers.arrValue, color: '#22c55e' },
    { name: 'Upsell', value: dashboardData.upsellCustomers.arrValue, color: '#3b82f6' },
    { name: 'Downgrade', value: Math.abs(dashboardData.downgradeCustomers.arrValue), color: '#f97316' },
    { name: 'Churn', value: Math.abs(dashboardData.churnCustomers.arrValue), color: '#ef4444' }
  ];

  // Get total customers and trend
  const totalCustomers = 4825; // Total customer count
  const totalCustomersTrend = 0.087; // 8.7% growth

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

  // Render the appropriate dashboard based on userType and activeView
  const renderDashboardContent = () => {
    // Internal team views
    if (userType === 'internal') {
      switch (activeView) {
        case 'customers':
          return (
            <div>
              <CustomerAccountDetails customerId={selectedCustomer || undefined} />
            </div>
          );
          
        case 'health':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCustomerHealth.map((customer, index) => (
                <CustomerHealthCard key={customer.id} customer={customer} index={index} />
              ))}
            </div>
          );
        
        case 'metrics':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CustomerMetricsCard 
                title="Customer Satisfaction (CSAT)" 
                data={mockMetricsData.csat.data}
                metric="CSAT"
                currentValue={mockMetricsData.csat.current}
                previousValue={mockMetricsData.csat.previous}
                target={mockMetricsData.csat.target}
              />
              <CustomerMetricsCard 
                title="Net Promoter Score (NPS)" 
                data={mockMetricsData.nps.data}
                metric="NPS"
                currentValue={mockMetricsData.nps.current}
                previousValue={mockMetricsData.nps.previous}
                target={mockMetricsData.nps.target}
              />
              <CustomerMetricsCard 
                title="Customer Retention Rate" 
                data={mockMetricsData.retention.data}
                metric="Retention"
                currentValue={mockMetricsData.retention.current}
                previousValue={mockMetricsData.retention.previous}
                target={mockMetricsData.retention.target}
              />
              <CustomerMetricsCard 
                title="Onboarding Completion Rate" 
                data={mockMetricsData.onboarding.data}
                metric="Onboarding"
                currentValue={mockMetricsData.onboarding.current}
                previousValue={mockMetricsData.onboarding.previous}
                target={mockMetricsData.onboarding.target}
              />
              <CustomerMetricsCard 
                title="Customer Health Score" 
                data={mockMetricsData.health.data}
                metric="Health"
                currentValue={mockMetricsData.health.current}
                previousValue={mockMetricsData.health.previous}
                target={mockMetricsData.health.target}
              />
            </div>
          );
        
        // Default to overview
        default:
          return (
            <>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6"
              >
                {/* Customer Health & Renewal Metrics */}
                <CustomerHealthRenewalMetrics 
                  totalCustomers={totalCustomers}
                  totalCustomersTrend={totalCustomersTrend}
                  customersByTimePeriod={mockCustomersByTimePeriod}
                  filter={activeFilter}
                />
                
                {/* Customer Metrics Summary Component */}
                <CustomerMetricsSummary 
                  newCustomers={dashboardData.newCustomers}
                  upsellCustomers={dashboardData.upsellCustomers}
                  downgradeCustomers={dashboardData.downgradeCustomers}
                  churnCustomers={dashboardData.churnCustomers}
                  pieChartData={customerMetricsPieData}
                  onFilterChange={handleFilterChange}
                  activeFilter={activeFilter}
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{ opacity: !activeFilter || activeFilter === 'Upsell' ? 1 : 0.5 }}
                >
                  <DataTable 
                    data={filteredData.upsells} 
                    title={activeFilter ? `${activeFilter} - Upsells` : "Upsells"} 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  style={{ opacity: !activeFilter || activeFilter === 'Downgrade' ? 1 : 0.5 }}
                >
                  <DataTable 
                    data={filteredData.downgrades} 
                    title={activeFilter ? `${activeFilter} - Downgrades` : "Downgrades"} 
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
                style={{ opacity: activeFilter ? 0.7 : 1 }}
              >
                <BarChart 
                  data={filteredData.arrChangesByMonth} 
                  title={activeFilter ? `ARR Changes (Filtered by ${activeFilter})` : "ARR Changes"} 
                />
              </motion.div>
              
              <Tabs defaultValue="country" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Geographic Distribution
                    {activeFilter && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        (Filtered by {activeFilter})
                      </span>
                    )}
                  </h3>
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
                      title={activeFilter ? `ARR by Country (${activeFilter})` : "ARR by Country"}
                    />
                  </TabsContent>
                  
                  <TabsContent value="state">
                    <MapChart 
                      data={stateMapData} 
                      geoType="usa" 
                      title={activeFilter ? `ARR by US State (${activeFilter})` : "ARR by US State"} 
                    />
                  </TabsContent>
                </motion.div>
              </Tabs>
            </>
          );
      }
    } 
    // Customer views
    else {
      switch (activeView) {
        case 'products':
          return (
            <CustomerAccountDetails customerId={selectedCustomer || undefined} />
          );
          
        case 'adoption':
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Product Adoption</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomerMetricsCard 
                  title="Feature Adoption" 
                  data={mockMetricsData.onboarding.data}
                  metric="Onboarding"
                  currentValue={mockMetricsData.onboarding.current}
                  previousValue={mockMetricsData.onboarding.previous}
                  target={mockMetricsData.onboarding.target}
                />
                <CustomerMetricsCard 
                  title="User Engagement" 
                  data={mockMetricsData.health.data.map(item => ({ ...item, value: item.value * 0.9 }))}
                  metric="Health"
                  currentValue={mockMetricsData.health.current * 0.9}
                  previousValue={mockMetricsData.health.previous * 0.9}
                  target={mockMetricsData.health.target * 0.9}
                />
              </div>
            </div>
          );
        
        case 'team':
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Account Team</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {mockCustomerAccount.accountTeam.map((member) => (
                    <div key={member.id} className="flex items-start p-3 border rounded-lg">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.email}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                          <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
          
        case 'tickets':
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Support Tickets</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCustomerAccount.supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                          <Badge className={
                            ticket.priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                            ticket.priority.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                            'bg-green-100 text-green-800 hover:bg-green-200'
                          }>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            ticket.status.toLowerCase() === 'open' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                            ticket.status.toLowerCase() === 'in progress' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                            'bg-green-100 text-green-800 hover:bg-green-200'
                          }>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.created}</TableCell>
                        <TableCell>{ticket.updated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
          
        case 'kpis':
          return (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Key Performance Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomerMetricsCard 
                  title="Customer Satisfaction" 
                  data={mockMetricsData.csat.data}
                  metric="CSAT"
                  currentValue={mockMetricsData.csat.current}
                  previousValue={mockMetricsData.csat.previous}
                  target={mockMetricsData.csat.target}
                />
                <CustomerMetricsCard 
                  title="Net Promoter Score" 
                  data={mockMetricsData.nps.data}
                  metric="NPS"
                  currentValue={mockMetricsData.nps.current}
                  previousValue={mockMetricsData.nps.previous}
                  target={mockMetricsData.nps.target}
                />
                <CustomerMetricsCard 
                  title="Overall Health Score" 
                  data={mockMetricsData.health.data}
                  metric="Health"
                  currentValue={mockMetricsData.health.current}
                  previousValue={mockMetricsData.health.previous}
                  target={mockMetricsData.health.target}
                />
              </div>
            </div>
          );
        
        // Default to customer overview
        default:
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to Your Success Dashboard</h2>
                <p className="text-muted-foreground mb-2">
                  This dashboard provides a comprehensive view of your account's health, adoption metrics, and key performance indicators.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-semibold mb-2">Your Customer Success Manager</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        JS
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">john.smith@company.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-semibold mb-2">Health Score</h3>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                        <span>Current Score</span>
                        <span>{mockCustomerHealth[0].healthScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${mockCustomerHealth[0].healthScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 flex flex-col">
                    <h3 className="font-semibold mb-2">Renewal Information</h3>
                    <div className="mt-auto">
                      <p className="text-sm text-muted-foreground">Next renewal in</p>
                      <p className="text-2xl font-bold">{mockCustomerHealth[0].daysToRenewal} days</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomerMetricsCard 
                  title="Product Adoption" 
                  data={mockMetricsData.onboarding.data}
                  metric="Onboarding"
                  currentValue={mockMetricsData.onboarding.current}
                  previousValue={mockMetricsData.onboarding.previous}
                  target={mockMetricsData.onboarding.target}
                />
                <CustomerMetricsCard 
                  title="Customer Satisfaction" 
                  data={mockMetricsData.csat.data}
                  metric="CSAT"
                  currentValue={mockMetricsData.csat.current}
                  previousValue={mockMetricsData.csat.previous}
                  target={mockMetricsData.csat.target}
                />
              </div>
            </div>
          );
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <DashboardHeader 
            title={userType === 'internal' ? "Customer Success Dashboard" : "Your Success Dashboard"}
            dateRange={dashboardData.dateRange}
            onDateChange={handleDateChange}
          />
          <UserTypeSwitch userType={userType} onUserTypeChange={setUserType} />
        </div>
        
        {userType === 'internal' && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <CustomerFilter 
              selectedCustomer={selectedCustomer}
              selectedSalesRep={selectedSalesRep}
              onCustomerChange={setSelectedCustomer}
              onSalesRepChange={setSelectedSalesRep}
            />
            
            {activeFilter && (
              <button 
                onClick={() => setActiveFilter(null)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Clear "{activeFilter}" Filter
              </button>
            )}
          </div>
        )}
        
        <DashboardNav 
          activeView={activeView} 
          onViewChange={setActiveView} 
          userType={userType} 
        />
        
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Index;
