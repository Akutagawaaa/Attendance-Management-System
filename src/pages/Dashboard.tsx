
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardCheck, History, Building, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { availableLabs } from "@/utils/labData";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userLab, setUserLab] = useState<string>("");
  const [labName, setLabName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data only once when component mounts
    const loadUserData = () => {
      const authenticated = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const storedName = localStorage.getItem("userName") || "";
        const storedEmail = localStorage.getItem("userEmail") || "";
        const storedLab = localStorage.getItem("userLab") || "";
        const adminStatus = localStorage.getItem("isAdmin") === "true";

        setUserName(storedName);
        setUserEmail(storedEmail);
        setUserLab(storedLab);
        setIsAdmin(adminStatus);

        if (storedLab) {
          const lab = availableLabs.find((lab) => lab.id === storedLab);
          if (lab) {
            setLabName(lab.name);
          }
        }
      }
      
      // Set loading to false once we've determined authentication status
      setIsLoading(false);
    };

    loadUserData();
  }, []); // Empty dependency array ensures this only runs once

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Show loading state while determining authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout showNavigation={true} userName={userName} userEmail={userEmail} isAdmin={isAdmin}>
      <div className="px-4 py-6 md:px-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {userName}!</h1>
            <p className="text-muted-foreground mt-2">
              This is your attendance management dashboard. Here you can submit your attendance and view your history.
            </p>
            {labName && (
              <div className="flex items-center gap-2 mt-4 text-sm">
                <Building className="h-4 w-4 text-primary" />
                <span>Your lab: <span className="font-semibold">{labName}</span></span>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass-card hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  Mark Attendance
                </CardTitle>
                <CardDescription>
                  Submit your attendance for today's training session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleNavigate('/attendance')}
                  className="w-full"
                >
                  Go to Attendance Form
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Attendance History
                </CardTitle>
                <CardDescription>
                  View your past attendance records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleNavigate('/history')}
                  className="w-full"
                  variant="outline"
                >
                  View History
                </Button>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card className="glass-card hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Admin Panel
                  </CardTitle>
                  <CardDescription>
                    Manage labs, trainings, and view all attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleNavigate('/admin')}
                    className="w-full"
                    variant="outline"
                  >
                    Open Admin Panel
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
