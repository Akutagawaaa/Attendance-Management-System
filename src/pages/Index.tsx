
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPForm from "@/components/auth/OTPForm";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (authenticated) {
      // Get user data
      const userEmail = localStorage.getItem("userEmail");
      const userName = localStorage.getItem("userName");
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      
      // If authenticated, redirect to dashboard
      if (userEmail && userName) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleAuthSuccess = (email: string, name: string, isAdmin: boolean, selectedLab?: string) => {
    // Store authentication state
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
    
    // Store selected lab if available
    if (selectedLab) {
      localStorage.setItem("userLab", selectedLab);
    }
    
    setIsAuthenticated(true);
    
    // Redirect to dashboard
    navigate("/dashboard");
    
    toast({
      title: "Welcome to Qualityveda",
      description: `Hello, ${name}!`,
    });
  };

  return (
    <Layout showNavigation={false}>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 max-w-md w-full rounded-2xl flex flex-col items-center justify-center mb-8 animate-scale-in">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-2 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-2xl font-semibold">QV</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">QualityVeda</h1>
            <p className="text-lg text-muted-foreground text-center">
              Attendance Management System
            </p>
            <div className="h-1 w-16 bg-primary/40 rounded-full my-4" />
          </div>
        </div>
        
        <OTPForm onAuthSuccess={handleAuthSuccess} />
        
        <div className="mt-6 text-center text-sm text-muted-foreground max-w-md">
          <p className="mb-2">Enter your email to receive a verification code. New users will be guided through registration.</p>
          <p>Hint: Use <span className="font-semibold">admin@qualityveda.com</span> to access admin features</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
