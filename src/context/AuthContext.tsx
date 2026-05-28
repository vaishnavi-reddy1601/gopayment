import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser } from '../data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<typeof mockUser | null>(null);

  const login = (userId: string, password: string) => {
    if (userId === mockUser.userId && password === mockUser.password) {
      setIsAuthenticated(true);
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
