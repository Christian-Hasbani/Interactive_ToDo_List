export interface Task {
  id: number | null;
  title: string;
  task_is_done: boolean;
  created_at: Date | null;
  priority: number;
  due_date: Date | null;
}