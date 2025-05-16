
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, priority: "low" | "medium" | "high") => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteAllTasks: () => void;
  completedTasks: number;
  pendingTasks: number;
  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample mock data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete dashboard project",
    completed: false,
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Review pull requests",
    completed: true,
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Write documentation",
    completed: false,
    priority: "low",
    createdAt: new Date().toISOString(),
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: "low" | "medium" | "high") => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  // Calculate statistics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;
  const mediumPriorityTasks = tasks.filter((task) => task.priority === "medium").length;
  const lowPriorityTasks = tasks.filter((task) => task.priority === "low").length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        deleteAllTasks,
        completedTasks,
        pendingTasks,
        highPriorityTasks,
        mediumPriorityTasks,
        lowPriorityTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
