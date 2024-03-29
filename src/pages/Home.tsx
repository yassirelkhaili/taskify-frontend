import { columns } from "../partials/columns"
import { DataTable } from "../partials/data-table"
import { UserNav } from "../partials/user-nav";
import { useEffect, useLayoutEffect } from "react";
import taskService from "../services/taskService";
import { toast } from "sonner";
import { useAuth } from "../providers/AuthProvider";
import { useUi } from "../providers/UiProvider";

export default function Home() {
  const { tasks, setTasks} = useUi();
  const {login} = useAuth();

  useLayoutEffect(() => {
   localStorage.getItem("accessToken") && login();
  }, [login])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const newTasks = await taskService.fetchTasks();
        setTasks(newTasks.data);
      }
        catch (error) {
        toast.error(
          "Failed fetch tasks. Refresh the page and try again."
        );
        console.error(error);
      }
    };
    fetchTasks();
  }, [setTasks])

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
