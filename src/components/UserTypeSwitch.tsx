
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Users } from 'lucide-react';

interface UserTypeSwitchProps {
  userType: 'internal' | 'customer';
  onUserTypeChange: (userType: 'internal' | 'customer') => void;
}

const UserTypeSwitch = ({ userType, onUserTypeChange }: UserTypeSwitchProps) => {
  const handleToggle = () => {
    onUserTypeChange(userType === 'internal' ? 'customer' : 'internal');
  };

  return (
    <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <Users className={`h-4 w-4 ${userType === 'internal' ? 'text-primary' : 'text-muted-foreground'}`} />
        <Label htmlFor="user-type" className={userType === 'internal' ? 'font-medium' : 'text-muted-foreground'}>
          Internal Team
        </Label>
      </div>
      
      <Switch
        id="user-type"
        checked={userType === 'customer'}
        onCheckedChange={handleToggle}
      />
      
      <div className="flex items-center space-x-2">
        <User className={`h-4 w-4 ${userType === 'customer' ? 'text-primary' : 'text-muted-foreground'}`} />
        <Label htmlFor="user-type" className={userType === 'customer' ? 'font-medium' : 'text-muted-foreground'}>
          Customer
        </Label>
      </div>
    </div>
  );
};

export default UserTypeSwitch;
