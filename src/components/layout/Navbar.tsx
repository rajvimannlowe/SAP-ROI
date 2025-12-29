import { useAuth } from '../../contexts/AuthContext';
import { Dropdown } from '../ui/dropdown';
import { User, Shield, UserCheck, FileCheck } from 'lucide-react';
import { UserRole } from '../../types';
import { roleDisplayNames } from '../../theme/theme';

export function Navbar() {
  const { user, switchRole } = useAuth();

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'manager':
        return <UserCheck className="h-4 w-4" />;
      case 'auditor':
        return <FileCheck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const roleOptions = [
    {
      value: 'admin',
      label: roleDisplayNames.admin,
      icon: <Shield className="h-4 w-4" />,
    },
    {
      value: 'manager',
      label: roleDisplayNames.manager,
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      value: 'auditor',
      label: roleDisplayNames.auditor,
      icon: <FileCheck className="h-4 w-4" />,
    },
  ];

  if (!user) return null;

  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">SAP Due Diligence</h2>
      </div>
      
      <div className="flex items-center gap-3">
        {/* User Info & Role Switcher Combined */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </div>
        
        {/* Role Switcher Dropdown with Icon */}
        <div className="w-[200px]">
          <Dropdown
            options={roleOptions}
            value={user.role}
            onChange={(value) => switchRole(value as UserRole)}
            placeholder="Select Role"
          />
        </div>
      </div>
    </div>
  );
}
