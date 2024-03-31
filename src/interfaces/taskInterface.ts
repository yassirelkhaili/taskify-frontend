export enum TaskStatuses {
    COMPLETED = "completed",
    PENDING = "pending",
    IN_PROGRESS = "in_progress"
  }
  
  export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
  }

  export interface SelectPriority {
    label: string;
    value: TaskPriority;
  }

  export interface SelectStatus {
    label: string;
    value: TaskStatuses;
  }
  
export interface Task {
  id: number;
  title: string;
  status: TaskStatuses;
  due_date: string;
  priority: TaskPriority;
}

export interface TaskInput {
  title: string;
  description: string;
  status?: TaskStatuses;
  due_date?: Date;
  priority?: TaskPriority;
};

  export interface TaskResponse {
    status: string;
    message: string;
    data: Array<Task>
  }