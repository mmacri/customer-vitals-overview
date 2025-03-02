
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Customer } from '@/utils/mockData';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface DataTableProps {
  data: Customer[];
  title: string;
}

const DataTable = ({ data, title }: DataTableProps) => {
  const [visibleRows, setVisibleRows] = useState(5);
  
  const handleShowMore = () => {
    setVisibleRows(prev => prev + 5);
  };
  
  const handleShowLess = () => {
    setVisibleRows(Math.max(5, visibleRows - 5));
  };
  
  return (
    <div className="data-card overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Contract Length</TableHead>
              <TableHead>Signup Type</TableHead>
              <TableHead>Delta</TableHead>
              <TableHead>MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, visibleRows).map((item) => (
              <TableRow key={item.id} className="group hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{formatDate(item.startDate)}</TableCell>
                <TableCell>{item.endDate ? formatDate(item.endDate) : '-'}</TableCell>
                <TableCell>{item.contractLength} mo</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.signupType === 'SaaS' 
                      ? 'bg-blue-100 text-blue-800' 
                      : item.signupType === 'Enterprise' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {item.signupType}
                  </span>
                </TableCell>
                <TableCell className={item.delta > 0 ? 'text-success' : 'text-danger'}>
                  {formatCurrency(item.delta)}
                </TableCell>
                <TableCell>{formatCurrency(item.mrr)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-3 border-t flex justify-between items-center bg-muted/20">
        <span className="text-sm text-muted-foreground">
          Viewing {Math.min(visibleRows, data.length)} of {data.length} rows
        </span>
        <div className="flex gap-2">
          {visibleRows > 5 && (
            <button 
              onClick={handleShowLess}
              className="text-sm text-primary hover:text-primary/80"
            >
              Show Less
            </button>
          )}
          {visibleRows < data.length && (
            <button 
              onClick={handleShowMore}
              className="text-sm text-primary hover:text-primary/80"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
