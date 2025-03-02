import { motion } from 'framer-motion';
import { Mail, Phone, Clock, CheckCircle, AlertTriangle, User, Building, Package, BarChart, TicketCheck, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for a customer account
const mockCustomerAccount = {
  id: '1',
  name: 'Acme Corporation',
  industry: 'Technology',
  segment: 'Enterprise',
  website: 'www.acmecorp.com',
  renewalDate: new Date(2024, 11, 15),
  accountTeam: [
    { id: '1', name: 'John Smith', role: 'Account Executive', email: 'john.smith@company.com', phone: '+1 (555) 123-4567' },
    { id: '2', name: 'Emily Davis', role: 'Customer Success Manager', email: 'emily.davis@company.com', phone: '+1 (555) 987-6543' },
    { id: '3', name: 'Michael Johnson', role: 'Technical Account Manager', email: 'michael.johnson@company.com', phone: '+1 (555) 456-7890' },
    { id: '4', name: 'Sarah Wilson', role: 'Solutions Architect', email: 'sarah.wilson@company.com', phone: '+1 (555) 234-5678' },
  ],
  products: [
    { id: '1', name: 'Analytics Platform', status: 'Active', version: '3.2.1', usage: 87 },
    { id: '2', name: 'Reporting Suite', status: 'Active', version: '2.0.4', usage: 65 },
    { id: '3', name: 'Integration API', status: 'Active', version: '1.5.0', usage: 92 },
    { id: '4', name: 'Mobile App', status: 'Inactive', version: '1.0.0', usage: 0 },
  ],
  supportTickets: [
    { id: 'T-1001', title: 'API Integration Issue', priority: 'High', status: 'Open', created: '2023-06-10', updated: '2023-06-12' },
    { id: 'T-982', title: 'Dashboard Loading Slow', priority: 'Medium', status: 'In Progress', created: '2023-06-05', updated: '2023-06-11' },
    { id: 'T-975', title: 'User Permission Error', priority: 'Low', status: 'Resolved', created: '2023-05-28', updated: '2023-06-02' },
  ],
  escalations: [
    { id: 'E-342', title: 'Data Migration Delay', severity: 'Medium', status: 'Active', owner: 'Michael Johnson', created: '2023-06-01', updated: '2023-06-10' },
    { id: 'E-329', title: 'SLA Breach - API Downtime', severity: 'High', status: 'Resolved', owner: 'Emily Davis', created: '2023-05-15', updated: '2023-05-20' },
  ],
  metrics: {
    healthScore: 78,
    csat: 92,
    nps: 68,
    timeToValue: 45, // days
    activeUsers: {
      total: 120,
      active: 98,
      percentActive: 82
    },
    implementation: {
      progress: 94,
      remainingTasks: 2
    }
  }
};

interface CustomerAccountDetailsProps {
  customerId?: string;
}

const CustomerAccountDetails = ({ customerId = '1' }: CustomerAccountDetailsProps) => {
  // In a real app, this would fetch the data for the specific customer
  const customerData = mockCustomerAccount;
  
  const daysToRenewal = Math.ceil(
    (customerData.renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const renderStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
      case 'open':
      case 'in progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const renderPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{priority}</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{priority}</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{priority}</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold">{customerData.name}</h2>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4 mr-1" />
                <span className="mr-3">{customerData.industry}</span>
                <User className="h-4 w-4 mr-1" />
                <span>{customerData.segment}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm text-muted-foreground">Renewal in</div>
              <div className="text-xl font-bold">
                {daysToRenewal} days
              </div>
              <div className="text-sm text-muted-foreground">{customerData.renewalDate.toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Customer Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Health Score</div>
              <div className="flex items-end mb-2">
                <span className="text-2xl font-bold">{customerData.metrics.healthScore}%</span>
              </div>
              <Progress value={customerData.metrics.healthScore} className="h-2" />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">CSAT Score</div>
              <div className="flex items-end mb-2">
                <span className="text-2xl font-bold">{customerData.metrics.csat}%</span>
              </div>
              <Progress value={customerData.metrics.csat} className="h-2" />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">NPS</div>
              <div className="flex items-end mb-2">
                <span className="text-2xl font-bold">{customerData.metrics.nps}</span>
              </div>
              <Progress value={customerData.metrics.nps} max={100} className="h-2" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Account Team</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {customerData.accountTeam.map((member) => (
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Products & Usage</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {customerData.products.map((product) => (
                <div key={product.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">v{product.version}</p>
                    </div>
                    {renderStatusBadge(product.status)}
                  </div>
                  {product.status === 'Active' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Usage</span>
                        <span className="font-medium">{product.usage}%</span>
                      </div>
                      <Progress value={product.usage} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Support Tickets</h3>
        </div>
        <div className="p-0">
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
              {customerData.supportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{renderPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>{ticket.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Escalations</h3>
        </div>
        <div className="p-0">
          {customerData.escalations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData.escalations.map((escalation) => (
                  <TableRow key={escalation.id}>
                    <TableCell className="font-medium">{escalation.id}</TableCell>
                    <TableCell>{escalation.title}</TableCell>
                    <TableCell>{renderPriorityBadge(escalation.severity)}</TableCell>
                    <TableCell>{renderStatusBadge(escalation.status)}</TableCell>
                    <TableCell>{escalation.owner}</TableCell>
                    <TableCell>{escalation.created}</TableCell>
                    <TableCell>{escalation.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
              <p>No active escalations</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerAccountDetails;
