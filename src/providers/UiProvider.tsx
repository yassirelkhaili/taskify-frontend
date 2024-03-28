import { createContext, useContext, useState } from 'react';
import type { UiContextType } from '../interfaces/authInterface';
import type { ReactNode } from 'react';
import type { Task } from '../interfaces/taskInterface';

const UiContext = createContext<UiContextType | undefined>(undefined);

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};

export const UiProvider = ({ children }: {children: ReactNode}) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <UiContext.Provider value={{ isLoading, setIsLoading, tasks, setTasks }}>
      {children}
    </UiContext.Provider>
  );
};
