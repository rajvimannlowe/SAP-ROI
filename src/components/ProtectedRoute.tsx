import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requirePermission?: 'create' | 'edit' | 'view' | 'export';
}

export function ProtectedRoute({ children, requirePermission }: ProtectedRouteProps) {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requirePermission && !hasPermission(requirePermission)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this resource.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

