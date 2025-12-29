import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: 'create' | 'edit' | 'view' | 'export') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@enterprise.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Enterprise Admin',
      email: 'admin@enterprise.com',
      role: 'admin',
    },
  },
  'manager@enterprise.com': {
    password: 'manager123',
    user: {
      id: '2',
      name: 'Risk Manager',
      email: 'manager@enterprise.com',
      role: 'manager',
    },
  },
  'auditor@enterprise.com': {
    password: 'auditor123',
    user: {
      id: '3',
      name: 'Compliance Analyst',
      email: 'auditor@enterprise.com',
      role: 'auditor',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for persisted user
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userData = MOCK_USERS[email.toLowerCase()];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: 'create' | 'edit' | 'view' | 'export'): boolean => {
    if (!user) return false;

    switch (user.role) {
      case 'admin':
        return true; // Full access
      case 'manager':
        return permission === 'view' || permission === 'export'; // View and export only
      case 'auditor':
        return permission === 'view' || permission === 'export'; // Read-only with export
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

