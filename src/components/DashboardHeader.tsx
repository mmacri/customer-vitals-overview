
import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { formatDate } from '@/utils/formatters';

interface DashboardHeaderProps {
  title: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DashboardHeader = ({ title, dateRange, onDateChange }: DashboardHeaderProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date());

  const handleMonthSelect = (month: Date | undefined) => {
    if (!month) return;
    
    setSelectedMonth(month);
    
    // Create date range for the selected month
    const startDate = new Date(month);
    startDate.setDate(1); // First day of month
    
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Last day of month
    
    onDateChange(startDate, endDate);
    setIsCalendarOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 py-2 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">Updated just now</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 px-3 py-2 hover:bg-secondary transition-colors duration-200"
            >
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={selectedMonth}
              onSelect={handleMonthSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default DashboardHeader;
