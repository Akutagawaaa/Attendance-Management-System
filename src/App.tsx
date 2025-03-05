import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Import statements for the components we're adding to routes
import AttendanceForm from "@/components/attendance/AttendanceForm";
import AttendanceHistory from "@/components/attendance/AttendanceHistory";
import AdminPanel from "@/components/admin/AdminPanel";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check authentication status
    const authenticated = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authenticated);
    setIsLoading(false);
    
    setUserEmail(localStorage.getItem("userEmail") || "");
    setUserName(localStorage.getItem("userName") || "");
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading application...</p>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated === null 
                ? <p>Loading...</p> 
                : (!isAuthenticated ? <Index /> : <Navigate to="/dashboard" replace />)
              } 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/attendance" 
              element={<AttendanceForm userEmail={userEmail} userName={userName} />} 
            />
            <Route 
              path="/history" 
              element={<AttendanceHistory userEmail={userEmail} />} 
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
