
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { Task, useTasks } from "@/context/TaskContext";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    toggleTaskCompletion(task.id);
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2 bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <button
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
            isChecked
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground"
          )}
          onClick={handleToggle}
        >
          {isChecked && <Check className="w-3 h-3" />}
        </button>
        
        <span className={cn("flex-1", isChecked && "line-through text-muted-foreground")}>
          {task.title}
        </span>
        
        <span className={cn("text-xs px-2 py-1 rounded", priorityColors[task.priority])}>
          {task.priority}
        </span>
      </div>
      
      <button
        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
        onClick={() => deleteTask(task.id)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
