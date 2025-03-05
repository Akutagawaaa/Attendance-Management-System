
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  ClipboardCheck,
  Home,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import ExportButton from "@/components/export/ExportButton";
interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  userEmail?: string;
  userName?: string;
  isAdmin?: boolean;
}

const Layout = ({
  children,
  showNavigation = true,
  userEmail = "",
  userName = "",
  isAdmin = false,
}: LayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // In a real app, implement actual logout logic here
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    // Force reload to clear state
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen">
      {showNavigation && (
        <aside className="w-16 md:w-64 glass-card bg-white/60 dark:bg-slate-900/60 fixed inset-y-0 z-50 flex flex-col h-screen">
          <div className="flex flex-col h-full justify-between p-2 md:p-4">
            <div className="space-y-4">
              <div className="px-3 py-2">
                <Link to="/dashboard" className="flex items-center">
                <div className="relative w-8 h-8 mr-2 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                     <img src="/logo.png" alt="App Icon" className="w-full h-full object-cover" />
                </div>
                  <h1 className="hidden md:block text-lg font-semibold tracking-tight">
                    Qualityveda
                  </h1>
                </Link>
              </div>

              <nav className="grid gap-2 px-2">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-accent/10 
                  ${location.pathname === "/dashboard" ? "bg-accent/20 text-accent" : ""}`}
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden md:block">Dashboard</span>
                </Link>
                <Link
                  to="/attendance"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-accent/10 
                  ${location.pathname === "/attendance" ? "bg-accent/20 text-accent" : ""}`}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden md:block">Attendance</span>
                </Link>
                <Link
                  to="/history"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-accent/10 
                  ${location.pathname === "/history" ? "bg-accent/20 text-accent" : ""}`}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden md:block">History</span>
                </Link>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-accent/10 
                    ${location.pathname === "/admin" ? "bg-accent/20 text-accent" : ""}`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:block">Admin Panel</span>
                  </Link>
                )}
              </nav>
            </div>
            
            <div className="mt-auto">
              <div className="flex flex-col gap-2">
                {userEmail && (
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm font-medium">{userName || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{userEmail}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-destructive hover:bg-destructive/10 transition-all duration-200 ease-in-out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
      
      <main className={`flex-1 ${showNavigation ? "md:ml-64 ml-16" : ""} transition-all duration-300 ease-in-out`}>
        <div className="container py-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
