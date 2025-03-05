
import React from "react";
import { useOTPVerification } from "@/hooks/use-otp-verification";
import EmailStep from "./EmailStep";
import OTPStep from "./OTPStep"; 
import NameStep from "./NameStep";
import LabStep from "./LabStep";
import { sendOTPEmail } from "@/utils/emailUtils";

interface OTPFormProps {
  onAuthSuccess: (email: string, name: string, isAdmin: boolean, selectedLab?: string) => void;
}

const OTPForm = ({ onAuthSuccess }: OTPFormProps) => {
  const {
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
  } = useOTPVerification({ onAuthSuccess });

  // Handle resending OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      await sendOTPEmail(email, generatedOtp);
      
      // Update the UI state as needed
      const { toast } = await import('@/hooks/use-toast');
      toast({
        title: "OTP resent",
        description: "Check your email for the new verification code",
      });
    } catch (error) {
      const { toast } = await import('@/hooks/use-toast');
      toast({
        title: "Failed to resend OTP",
        description: "There was an error sending the verification code to your email",
        variant: "destructive",
      });
      console.error("Email resending error:", error);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto glass-card p-8 md:p-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === "email" && "Sign in to your account"}
            {step === "otp" && "Enter verification code"}
            {step === "name" && "What's your name?"}
            {step === "lab" && "Select your lab"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === "email" && "Enter your email to receive a verification code"}
            {step === "otp" && "Enter the code sent to your email"}
            {step === "name" && "Please enter your name to continue registration"}
            {step === "lab" && "Please select the lab you're associated with"}
          </p>
        </div>

        <div className="space-y-4">
          {step === "email" && (
            <EmailStep 
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              handleSendOTP={handleSendOTP}
            />
          )}

          {step === "otp" && (
            <OTPStep 
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              countdown={countdown}
              handleVerifyOTP={handleVerifyOTP}
              handleResendOTP={handleResendOTP}
              email={email}
            />
          )}

          {step === "name" && (
            <NameStep 
              name={name}
              setName={setName}
              isLoading={isLoading}
              handleSubmitName={handleSubmitName}
            />
          )}

          {step === "lab" && (
            <LabStep 
              selectedLab={selectedLab}
              setSelectedLab={setSelectedLab}
              isLoading={isLoading}
              handleSubmitLab={handleSubmitLab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
