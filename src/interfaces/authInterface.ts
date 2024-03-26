import type { ReactNode } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
  
export interface AuthProviderProps {
    children: ReactNode;
}

export interface LoginReponse {
    status: string,
    message: string,
    bearerToken: string
}

export interface LoginRequest {
    email: string,
    password: string
}