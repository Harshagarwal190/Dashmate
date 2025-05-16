import { useTheme } from "@/context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Activity,
  CheckSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "@/pages/Profile";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [user] = useLocalStorage<UserProfile>("userProfile", {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility
  const navItems = [
    { path: "/", name: "Dashboard", icon: <Home className="w-5 h-5 mr-2" /> },
    {
      path: "/profile",
      name: "Profile",
      icon: <User className="w-5 h-5 mr-2" />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <Activity className="w-5 h-5 mr-2" />,
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: <CheckSquare className="w-5 h-5 mr-2" />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <Settings className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <div className="relative md:flex">
      {/* Sidebar for both Mobile and Desktop */}
      <div
        className={cn(
          "w-full md:w-64 h-screen bg-card border-b md:border-r border-border flex flex-col fixed md:relative z-10 transition-all duration-300",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
          isSidebarOpen ? "md:w-64" : "md:w-0"
        )}
      >
        {/* Close Button inside Sidebar for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden p-2 text-white rounded-md"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-4 border-b border-border flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
            D
          </div>
          <h1 className="text-xl font-bold">DashMate</h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/profile"
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted"
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 md:hidden p-2 pt-4  rounded-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar (fixed and always visible) */}
      <div className="hidden md:flex w-64 h-screen bg-card border-b md:border-r border-border flex-col fixed top-0 left-0 z-10">
        <div className="p-4 border-b border-border flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
            D
          </div>
          <h1 className="text-xl font-bold">DashMate</h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/profile"
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted"
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
