
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ProfileCard } from "@/components/ProfileCard";
import { EditProfileForm } from "@/components/EditProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useLocalStorage<UserProfile>("userProfile", {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop"
  });
  
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container py-6 px-4 md:px-6">
          <h1 className="text-2xl font-bold mb-6 pl-12  pt-1 md:pl-0  md:pt-0">Profile</h1>
          
          <Tabs defaultValue="view">
            <TabsList className="mb-6">
              <TabsTrigger value="view">View Profile</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view">
              <ProfileCard profile={user} showStats={true} />
            </TabsContent>
            
            <TabsContent value="edit">
              <EditProfileForm profile={user} onSave={handleSaveProfile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
