import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../ui/dropdown';
import { Shield, UserCheck, FileCheck, Database, LogOut } from 'lucide-react';
import { UserRole } from '../../types';
import { roleDisplayNames } from '../../theme/theme';
import { Button } from '../ui/button';

export function Navbar() {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-sm shadow-sm flex items-center justify-between px-6 lg:px-8">
      {/* Left Section - Branding */}
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #4160F0 0%, #FF6700 100%)',
          }}
        >
          <Database className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground leading-none">Enterprise ROI</h2>
          <p className="text-xs text-muted-foreground leading-none mt-0.5">Dashboard</p>
        </div>
      </div>
      
      {/* Right Section - Actions */}
      <div className="flex items-center gap-4">
        {/* Role Switcher Dropdown */}
        <div className="w-[200px]">
          <Dropdown
            options={roleOptions}
            value={user.role}
            onChange={(value) => switchRole(value as UserRole)}
            placeholder="Select Role"
          />
        </div>
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
}
