import { createContext, useContext, useState } from 'react';
import type { AuthContextType, AuthProviderProps } from '../interfaces/authInterface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const checkIsAuthenticated: boolean = !!localStorage.getItem("accessToken") || false;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};