import type { ReactNode } from "react";
import type { Task, TaskInput } from "./taskInterface";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
  
export interface AuthProviderProps {
    children: ReactNode;
}

export enum ModalMode {
  ADD = "add",
  EDIT = "edit",
}

export interface UiContextType {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalMode: ModalMode;
  setModalMode: React.Dispatch<React.SetStateAction<ModalMode>>
  updatedFormData: TaskInput;
  updateFormData: (newData: TaskInput) => void;
  selectedRow: number | undefined;
  setSelectedRow: React.Dispatch<React.SetStateAction<UiContextType['selectedRow']>>
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