import type { ReactNode } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
  
export interface AuthProviderProps {
    children: ReactNode;
}