import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Database, 
  FileText,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '@/lib/utils';
import { SAP_MODULES } from '../../data/mockData';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-sidebar-primary" />
          <h1 className="text-lg font-bold text-sidebar-foreground">ROI Platform</h1>
        </div>
        <p className="text-xs text-sidebar-accent-foreground mt-1">Due Diligence System</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <Link
          to="/enterprise"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive('/enterprise')
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <Building2 className="h-4 w-4" />
          Enterprise Overview
        </Link>

        <div className="pt-2">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-sidebar-accent-foreground uppercase tracking-wider">
            <LayoutDashboard className="h-4 w-4" />
            Departments
          </div>
          
          <Link
            to="/sap"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-4",
              isActive('/sap')
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <Database className="h-4 w-4" />
            SAP ROI
            <ChevronRight className="h-3 w-3 ml-auto" />
          </Link>

          {isActive('/sap') && (
            <div className="ml-8 mt-1 space-y-1">
              {SAP_MODULES.map((module) => (
                <Link
                  key={module.id}
                  to={`/sap/${module.id}`}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                    isActive(`/sap/${module.id}`)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                  )}
                >
                  <FileText className="h-3 w-3" />
                  {module.code} - {module.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

