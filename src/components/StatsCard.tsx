
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTasks } from "@/context/TaskContext";
import { CheckCircle, Circle } from "lucide-react";

export function StatsCard() {
  const { tasks, completedTasks, pendingTasks } = useTasks();
  
  const totalTasks = completedTasks + pendingTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm font-medium">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Tasks</div>
              <div className="text-3xl font-bold">{totalTasks}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-950/30 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">Completed</div>
              <div className="text-3xl font-bold">{completedTasks}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-0">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-1">
                <Circle className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">Pending</div>
              <div className="text-3xl font-bold">{pendingTasks}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
