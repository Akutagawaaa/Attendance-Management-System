
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface AnimatedAvatarProps {
  name: string;
  email: string;
  className?: string;
}

const AnimatedAvatar = ({ name, email, className }: AnimatedAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Generate a consistent color based on email
  const getAvatarColor = (email: string) => {
    const colors = [
      "bg-rose-500",
      "bg-pink-500",
      "bg-fuchsia-500",
      "bg-purple-500",
      "bg-violet-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-sky-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-emerald-500",
      "bg-green-500",
      "bg-lime-500",
      "bg-yellow-500",
      "bg-amber-500",
      "bg-orange-500",
      "bg-red-500",
    ];
    
    // Simple hash function for email to get index
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash << 5) - hash + email.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Get absolute value and mod with colors array length
    hash = Math.abs(hash) % colors.length;
    
    return colors[hash];
  };

  // Use a consistent avatar based on email
  useEffect(() => {
    // For demo purposes we'll use a placeholder, in a real app you might have user avatars
    setAvatarUrl(`https://api.dicebear.com/7.x/micah/svg?seed=${email}&backgroundColor=b6e3f4`);
  }, [email]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        className={cn(
          "transition-all duration-300",
          isHovered ? "scale-110" : "",
          className
        )}
      >
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className={cn("text-white", getAvatarColor(email))}>
          {getInitials(name) || <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      {/* Animation dots */}
      <div
        className={cn(
          "absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white",
          "transition-all duration-300",
          isHovered ? "animate-pulse" : ""
        )}
      />
    </div>
  );
};

export default AnimatedAvatar;
