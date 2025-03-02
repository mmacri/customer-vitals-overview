
import { useState } from 'react';
import { Check, ChevronDown, Search, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock data for customers and sales reps
const mockCustomers = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'TechNova Solutions' },
  { id: '3', name: 'Global Enterprises' },
  { id: '4', name: 'Future Innovations' },
  { id: '5', name: 'Quantum Systems' },
  { id: '6', name: 'Pinnacle Group' },
  { id: '7', name: 'Horizon Technology' },
  { id: '8', name: 'Summit Partners' },
  { id: '9', name: 'Nexus Industries' },
  { id: '10', name: 'Vertex Networks' },
];

const mockSalesReps = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Brown' },
  { id: '4', name: 'Emily Davis' },
  { id: '5', name: 'David Wilson' },
  { id: '6', name: 'Jessica Taylor' },
  { id: '7', name: 'Robert Martinez' },
  { id: '8', name: 'Lisa Anderson' },
];

interface CustomerFilterProps {
  selectedCustomer: string | null;
  selectedSalesRep: string | null;
  onCustomerChange: (customerId: string | null) => void;
  onSalesRepChange: (salesRepId: string | null) => void;
}

const CustomerFilter = ({
  selectedCustomer,
  selectedSalesRep,
  onCustomerChange,
  onSalesRepChange
}: CustomerFilterProps) => {
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openSalesRep, setOpenSalesRep] = useState(false);

  const selectedCustomerName = selectedCustomer 
    ? mockCustomers.find(c => c.id === selectedCustomer)?.name 
    : "All Customers";

  const selectedSalesRepName = selectedSalesRep 
    ? mockSalesReps.find(r => r.id === selectedSalesRep)?.name 
    : "All Sales Reps";

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg shadow-sm">
      <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCustomer}
            className="justify-between min-w-[200px]"
          >
            <User className="mr-2 h-4 w-4" />
            {selectedCustomerName}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search customers..." />
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onCustomerChange(null);
                  setOpenCustomer(false);
                }}
                className="flex items-center"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCustomer === null ? "opacity-100" : "opacity-0"
                  )}
                />
                All Customers
              </CommandItem>
              {mockCustomers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  onSelect={() => {
                    onCustomerChange(customer.id);
                    setOpenCustomer(false);
                  }}
                  className="flex items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCustomer === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {customer.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openSalesRep} onOpenChange={setOpenSalesRep}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openSalesRep}
            className="justify-between min-w-[200px]"
          >
            <Users className="mr-2 h-4 w-4" />
            {selectedSalesRepName}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search sales reps..." />
            <CommandEmpty>No sales rep found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onSalesRepChange(null);
                  setOpenSalesRep(false);
                }}
                className="flex items-center"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSalesRep === null ? "opacity-100" : "opacity-0"
                  )}
                />
                All Sales Reps
              </CommandItem>
              {mockSalesReps.map((rep) => (
                <CommandItem
                  key={rep.id}
                  onSelect={() => {
                    onSalesRepChange(rep.id);
                    setOpenSalesRep(false);
                  }}
                  className="flex items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSalesRep === rep.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {rep.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerFilter;
