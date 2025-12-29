import { useAuth } from '../../contexts/AuthContext';
import { Dropdown } from '../ui/dropdown';
import { Shield, UserCheck, FileCheck } from 'lucide-react';
import { UserRole } from '../../types';
import { roleDisplayNames } from '../../theme/theme';

export function Navbar() {
  const { user, switchRole } = useAuth();

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
        {/* Role Switcher Dropdown */}
        <div className="w-[220px]">
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
