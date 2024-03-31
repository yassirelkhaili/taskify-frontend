"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import Loader from "../components/ui/loader";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "sonner";
import taskService from "../services/taskService";
import {
  TaskPriority,
  SelectPriority,
  TaskResponse,
  SelectStatus,
  TaskStatuses,
} from "../interfaces/taskInterface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useUi } from "../providers/UiProvider";
import { formSchema } from "../data/schema";
import { useEffect } from "react";
import { ModalMode } from "../interfaces/authInterface";

const selectPriorities: Array<SelectPriority> = [
  { label: "Low", value: TaskPriority.LOW },
  { label: "Medium", value: TaskPriority.MEDIUM },
  { label: "High", value: TaskPriority.HIGH },
];

const selectStatuses: Array<SelectStatus> = [
  { label: "pending", value: TaskStatuses.PENDING },
  { label: "in progress", value: TaskStatuses.IN_PROGRESS },
  { label: "completed", value: TaskStatuses.COMPLETED },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export type Submissionvalues = Omit<z.infer<typeof formSchema>, "due_date"> & {
  due_date: string;
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const {
    isLoading,
    setIsLoading,
    setIsModalOpen,
    isModalOpen,
    modalMode,
    selectedRow,
    setSelectedRow,
    setTasks,
  } = useUi();
  const { isAuthenticated } = useAuth();
  const { updatedFormData } = useUi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: updatedFormData,
  });

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])
  

  useEffect(() => {
    if (modalMode === ModalMode.EDIT) {
      form.reset(updatedFormData);
    } else {
      form.reset({
        title: "",
        description: "",
        priority: "" as TaskPriority,
        due_date: "" as unknown as Date, // this is ugly as hell I promise to come back and refactor (said every programmer ever)
        status: "" as TaskStatuses,
      });
    }
  }, [updatedFormData, form, modalMode]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const prepareSubmissionValues = (
      values: z.infer<typeof formSchema>
    ): Submissionvalues => {
      const dueDateAsString =
        values.due_date instanceof Date
          ? format(values.due_date, "yyyy-MM-dd")
          : "";
      return {
        ...values,
        due_date: dueDateAsString,
      };
    };
    const submissionValues = prepareSubmissionValues(values);
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        let response: TaskResponse;
        if (modalMode === ModalMode.ADD) {
          response = await taskService.postTask(submissionValues);
          toast.success(response.message);
        } else {
          if (selectedRow) {
            response = await taskService.editTask(
              submissionValues,
              selectedRow
            );
            toast.success(response.message);
          } else {
            const error: string =
              "No row has been selected for edition, selected another element";
            console.error(error);
            toast.error(error);
          }
        }
      } catch (error) {
        toast.error(
          "Failed to login. Please check your credentials and try again."
        );
        console.error(error);
        setIsLoading(false);
      }
    }
    const newTasks = await taskService.fetchTasks();
    setTasks(newTasks.data);
    setIsLoading(false);
    setIsModalOpen(false);
    setSelectedRow(undefined);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {modalMode === ModalMode.ADD ? "Add task" : "Edit task"}
              </DialogTitle>
              <DialogDescription>
                {modalMode === ModalMode.ADD ? "Create" : "Edit"} new tasks
                here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Task Title"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Task Description"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>due date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-fullpl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as any}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Task Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectPriorities.map((priority: SelectPriority) => {
                            return (
                              <SelectItem
                                value={priority.value}
                                key={priority.value}
                              >
                                {priority.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Task Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectStatuses.map((status: SelectStatus) => {
                            return (
                              <SelectItem
                                value={status.value}
                                key={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  {!isLoading ? (
                    <Button type="submit" className="bg-blue-600">
                      {modalMode === ModalMode.ADD
                        ? "Create task"
                        : "Edit task"}
                    </Button>
                  ) : (
                    <Loader />
                  )}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
