import type { ReactNode } from "react";
import type { Task } from "./taskInterface";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
  
export interface AuthProviderProps {
    children: ReactNode;
}

export interface UiContextType {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface LoginReponse {
    status: string,
    message: string,
    data: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest extends LoginRequest {
  name: string
}