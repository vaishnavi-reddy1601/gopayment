import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser } from '../data/mockData';

type StoredUser = Omit<typeof mockUser, 'password'>;

interface AuthContextType {
  isAuthenticated: boolean;
  user: StoredUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const SESSION_KEY = 'gopayment_session';

function loadSession(): StoredUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(loadSession);
  const isAuthenticated = user !== null;

  const login = (email: string, password: string) => {
    if (email === mockUser.email && password === mockUser.password) {
      const { password: _pw, ...userWithoutPassword } = mockUser;
      localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
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
