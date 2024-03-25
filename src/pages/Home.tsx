import { columns } from "../partials/columns"
import { Task, TaskStatus, TaskPriority} from "../partials/columns"
import { DataTable } from "../partials/data-table"
import { UserNav } from "../partials/user-nav";

const tasks: Task[] = [
    {
      id: 1,
      title: "Task 1",
      status: TaskStatus.PENDING,
      due_date: "2024-03-26",
      priority: TaskPriority.LOW
    },
    {
      id: 2,
      title: "Task 2",
      status: TaskStatus.IN_PROGRESS,
      due_date: "2024-03-27",
      priority: TaskPriority.MEDIUM
    },
    {
      id: 3,
      title: "Task 3",
      status: TaskStatus.COMPLETED,
      due_date: "2024-03-28",
      priority: TaskPriority.HIGH
    },
    {
      id: 4,
      title: "Task 4",
      status: TaskStatus.PENDING,
      due_date: "2024-03-29",
      priority: TaskPriority.LOW
    },
    {
      id: 5,
      title: "Task 5",
      status: TaskStatus.IN_PROGRESS,
      due_date: "2024-03-30",
      priority: TaskPriority.MEDIUM
    },
    {
      id: 6,
      title: "Task 6",
      status: TaskStatus.COMPLETED,
      due_date: "2024-04-01",
      priority: TaskPriority.HIGH
    },
    {
      id: 7,
      title: "Task 7",
      status: TaskStatus.PENDING,
      due_date: "2024-04-02",
      priority: TaskPriority.LOW
    },
    {
      id: 8,
      title: "Task 8",
      status: TaskStatus.IN_PROGRESS,
      due_date: "2024-04-03",
      priority: TaskPriority.MEDIUM
    },
    {
      id: 9,
      title: "Task 9",
      status: TaskStatus.COMPLETED,
      due_date: "2024-04-04",
      priority: TaskPriority.HIGH
    },
    {
      id: 10,
      title: "Task 10",
      status: TaskStatus.PENDING,
      due_date: "2024-04-05",
      priority: TaskPriority.LOW
    },
    {
      id: 11,
      title: "Task 11",
      status: TaskStatus.IN_PROGRESS,
      due_date: "2024-04-06",
      priority: TaskPriority.MEDIUM
    },
    {
      id: 12,
      title: "Task 12",
      status: TaskStatus.COMPLETED,
      due_date: "2024-04-07",
      priority: TaskPriority.HIGH
    },
    {
      id: 13,
      title: "Task 13",
      status: TaskStatus.PENDING,
      due_date: "2024-04-08",
      priority: TaskPriority.LOW
    },
    {
      id: 14,
      title: "Task 14",
      status: TaskStatus.IN_PROGRESS,
      due_date: "2024-04-09",
      priority: TaskPriority.MEDIUM
    },
    {
      id: 15,
      title: "Task 15",
      status: TaskStatus.COMPLETED,
      due_date: "2024-04-10",
      priority: TaskPriority.HIGH
    }
];

export default function Home() {
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
