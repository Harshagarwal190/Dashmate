import { useTasks } from "@/context/TaskContext";
import { StatsCard } from "@/components/StatsCard";
import { TaskForm } from "@/components/TaskForm";
import { TaskItem } from "@/components/TaskItem";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "./Profile";
import { ModeToggle } from "@/components/theme-togge";

const Index = () => {
  const { tasks } = useTasks();
  const [user] = useLocalStorage<UserProfile>("userProfile", {
    name: "Harsh Agarwal",
    email: "harshoct03@gmail.com",
    role: "Software Developer",
    avatar:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop",
  });

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full">
        <div className="container py-6 px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold pl-12 md:pl-0">Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2.5 md:mr-4">
                <ModeToggle />
              </span>
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <StatsCard />
          </div>

          <div className="bg-card rounded-lg border p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
            <TaskForm />

            <div className="mt-4">
              {recentTasks.length > 0 ? (
                <div className="space-y-2">
                  {recentTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                  {tasks.length > 5 && (
                    <a
                      href="/tasks"
                      className="inline-block mt-2 text-sm text-primary hover:underline"
                    >
                      View all {tasks.length} tasks
                    </a>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No tasks yet. Add your first task above!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
