"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import taskService from "../services/taskService";
import { toast } from "sonner";
import { useUi } from "../providers/UiProvider";
import { ModalMode } from "../interfaces/authInterface";
import type { Task, TaskInput } from "../interfaces/taskInterface";

interface withId {
  id: number;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends withId>({
  row,
}: DataTableRowActionsProps<TData>) {
  const {
    setTasks,
    setIsLoading,
    setIsModalOpen,
    setModalMode,
    updateFormData,
    tasks,
  } = useUi();

  const handleDelete = async (): Promise<void> => {
    const elementId: number = row.original.id;
    setIsLoading(true);
    try {
      const response = await taskService.deleteTask(elementId);
      const newTasks = await taskService.fetchTasks();
      setTasks(newTasks.data);
      toast.success(response.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(
        "Failed to delete task. Please check your credentials and try again."
      );
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleEdit = async (): Promise<void> => {
    setModalMode(ModalMode.EDIT);
    setIsModalOpen(true);
    const selectedTask: Task | undefined = tasks.find(
      (task: Task) => task.id === row.original.id
    );
    let formData: TaskInput;
    if (selectedTask) {
      const description = (selectedTask as any).description as string;
      formData = {
        title: selectedTask.title,
        status: selectedTask.status,
        due_date: new Date(selectedTask.due_date),
        priority: selectedTask.priority,
        description: description,
      };
      updateFormData(formData);
    } else {
      formData = {
        title: "",
        description: "",
      };
      console.error("Task was not found");
      updateFormData(formData);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
