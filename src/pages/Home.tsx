import { columns } from "../partials/columns"
import { DataTable } from "../partials/data-table"
import { UserNav } from "../partials/user-nav";
import { useEffect, useState } from "react";
import taskService from "../services/taskService";
import { toast } from "sonner";
import { Task } from "../interfaces/taskInterface";

export default function Home() {
  const [tasks, settasks] = useState<Array<Task>>([]);

  useEffect(() => {
    fetchTasks();
  }, [])
  
  const fetchTasks = async () => {
    try {
      const tasks = await taskService.fetchTasks();
      settasks(tasks);
    }
      catch (error) {
      toast.error(
        "Failed fetch tasks. Refresh the page and try again."
      );
      console.error(error);
    }
  };
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
  )
}
