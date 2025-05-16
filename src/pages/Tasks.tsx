import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TaskForm } from "@/components/TaskForm";
import { TaskItem } from "@/components/TaskItem";
import { useTasks } from "@/context/TaskContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const Tasks = () => {
  const { tasks, deleteAllTasks } = useTasks();
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      deleteAllTasks();
      toast.success("All tasks cleared successfully!");
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority && filterPriority !== "all" ? task.priority === filterPriority : true;
    const matchesStatus = filterStatus && filterStatus !== "all"
      ? (filterStatus === "completed" ? task.completed : !task.completed)
      : true;
    return matchesSearch && matchesPriority && matchesStatus;
  });
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container py-6 px-4 md:px-6">
          <h1 className="text-2xl font-bold mb-6 ml-12 pt-0.5 md:ml-0 md:pt-0.5">Tasks</h1>
          
          <div className="bg-card rounded-lg border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm />
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">Task List</h2>
              
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                <Input
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-auto"
                />
                
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
              </span>
              {tasks.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleClearAll}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Tasks
                </Button>
              )}
            </div>
            
            {filteredTasks.length > 0 ? (
              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {tasks.length === 0 
                  ? "No tasks yet. Add your first task above!"
                  : "No tasks match your filters."
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
