import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '../ui/badge';
import { User } from 'lucide-react';

export function Navbar() {
  const { user } = useAuth();

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Enterprise Admin';
      case 'manager':
        return 'Risk / Business Manager';
      case 'auditor':
        return 'Auditor / Compliance Analyst';
      default:
        return role;
    }
  };

  const getRoleVariant = (role: string): 'default' | 'secondary' | 'outline' => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'manager':
        return 'secondary';
      case 'auditor':
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (!user) return null;

  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">SAP Due Diligence</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <Badge variant={getRoleVariant(user.role)}>
            {getRoleDisplay(user.role)}
          </Badge>
        </div>
      </div>
    </div>
  );
}

