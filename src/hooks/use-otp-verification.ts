
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendOTPEmail } from "@/utils/emailUtils";

interface UseOTPVerificationProps {
  onAuthSuccess: (email: string, name: string, isAdmin: boolean, selectedLab?: string) => void;
}

export function useOTPVerification({ onAuthSuccess }: UseOTPVerificationProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [name, setName] = useState("");
  const [selectedLab, setSelectedLab] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "name" | "lab">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const generatedOtp = generateOTP();
      setSentOtp(generatedOtp);
      
      await sendOTPEmail(email, generatedOtp);
      
      setStep("otp");
      setCountdown(60); // 60 seconds countdown
      
      toast({
        title: "OTP sent",
        description: "Check your email for the verification code",
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "There was an error sending the verification code to your email",
        variant: "destructive",
      });
      console.error("Email sending error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === sentOtp) {
        const storedName = localStorage.getItem(email);
        
        if (storedName) {
          setName(storedName);
          
          const storedLab = localStorage.getItem(`${email}_lab`);
          if (storedLab) {
            setSelectedLab(storedLab);
          }
          
          const isAdmin = email === "nightstark1010@gmail.com";
          
          onAuthSuccess(email, storedName, isAdmin, storedLab || undefined);
          
          toast({
            title: "Authentication successful",
            description: "You have been successfully logged in",
          });
        } else {
          setStep("name");
        }
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying your OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitName = async () => {
    if (name.trim() === "") {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    setStep("lab");
  };

  const handleSubmitLab = async () => {
    if (!selectedLab) {
      toast({
        title: "Lab selection required",
        description: "Please select your lab",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem(email, name);
      localStorage.setItem(`${email}_lab`, selectedLab);
      
      const isAdmin = email === "nightstark1010@gmail.com";
      
      onAuthSuccess(email, name, isAdmin, selectedLab);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    name,
    setName,
    selectedLab,
    setSelectedLab,
    step,
    isLoading,
    countdown,
    handleSendOTP,
    handleVerifyOTP,
    handleSubmitName,
    handleSubmitLab,
  };
}
