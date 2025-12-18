import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authenticateUser } from '../../utils/authService';

export type UserRole = "estudiante" | "docente" | "administrador";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
};

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (username: string, password: string) => boolean;
  loginWithRole: (role: UserRole, userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, password: string): boolean => {
    const response = authenticateUser(username, password);

    if (!response.success || !response.user || !response.token) {
      return false;
    }

    setUser({
      id: String(response.user.id),
      username: response.user.username,
      email: response.user.email,
      role: response.user.role as UserRole,
      name: response.user.fullName,
    });
    setToken(response.token);

    return true;
  };

  const loginWithRole = (role: UserRole, userName: string) => {
    const mockUser: AuthUser = {
      id: Math.random().toString(36).substring(7),
      username: userName,
      email: `${userName}@universidad.edu`,
      role: role,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
    };
    
    setUser(mockUser);
    setToken(`mock-token-${role}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
