
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/context/TaskContext";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Analytics = () => {
  const { tasks, completedTasks, pendingTasks } = useTasks();
  
  // Generate mock weekly data
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = weekDays.map((day, index) => {
    const completedValue = Math.floor(Math.random() * 5) + (index % 3);
    const totalValue = completedValue + Math.floor(Math.random() * 3);
    return {
      name: day,
      completed: completedValue,
      total: totalValue,
    };
  });
  
  // Calculate priority percentages
  const totalTasks = tasks.length;
  const highPriorityPercentage = totalTasks 
    ? Math.round((tasks.filter(t => t.priority === "high").length / totalTasks) * 100) 
    : 0;
  const mediumPriorityPercentage = totalTasks 
    ? Math.round((tasks.filter(t => t.priority === "medium").length / totalTasks) * 100) 
    : 0;
  const lowPriorityPercentage = totalTasks 
    ? Math.round((tasks.filter(t => t.priority === "low").length / totalTasks) * 100) 
    : 0;
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container py-6">
          <h1 className="text-2xl font-bold mb-6 ml-8 pt-1 md:ml-0 md:pt-0">Analytics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingTasks} pending, {completedTasks} completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {completedTasks} out of {totalTasks} tasks
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highPriorityPercentage}%</div>
                <p className="text-xs text-muted-foreground">
                  {tasks.filter(t => t.priority === "high").length} tasks
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Task Priority Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">High Priority</span>
                      <span className="text-sm font-medium">{highPriorityPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-red-500 h-2.5 rounded-full" 
                        style={{ width: `${highPriorityPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Medium Priority</span>
                      <span className="text-sm font-medium">{mediumPriorityPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-amber-500 h-2.5 rounded-full" 
                        style={{ width: `${mediumPriorityPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Low Priority</span>
                      <span className="text-sm font-medium">{lowPriorityPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${lowPriorityPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <StatsCard />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
