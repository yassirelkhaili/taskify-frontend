import { createContext, useContext, useState } from "react";
import type { UiContextType } from "../interfaces/authInterface";
import type { ReactNode } from "react";
import type { Task, TaskInput } from "../interfaces/taskInterface";
import { ModalMode } from "../interfaces/authInterface";

const UiContext = createContext<UiContextType | undefined>(undefined);

export const useUi = (): UiContextType => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
};

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.ADD);
  const [updatedFormData, setUpdatedFormData] = useState<TaskInput>({
    title: "",
    description: "",
  });
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined); //row id of element to be edited

  const updateFormData = (newData: TaskInput) => setUpdatedFormData(newData);

  return (
    <UiContext.Provider
      value={{
        isLoading,
        setIsLoading,
        tasks,
        setTasks,
        isModalOpen,
        setIsModalOpen,
        modalMode,
        setModalMode,
        updatedFormData,
        updateFormData,
        selectedRow,
        setSelectedRow,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
