
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/context/TaskContext";
import { UserProfile } from "@/pages/Profile";

interface ProfileCardProps {
  profile: UserProfile;
  showStats?: boolean;
}

export function ProfileCard({ profile, showStats = true }: ProfileCardProps) {
  const { completedTasks, pendingTasks } = useTasks();
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-muted-foreground">{profile.email}</p>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
        </div>
        
        {showStats && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed Tasks</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <div className="text-sm text-muted-foreground">Pending Tasks</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
