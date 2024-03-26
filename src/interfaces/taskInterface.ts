export enum TaskStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    IN_PROGRESS = "in_progress"
  }
  
  export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
  }
  
  export interface Task {
    id: number,
    title: string,
    status: TaskStatus
    due_date: string,
    priority: TaskPriority
  }