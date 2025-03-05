
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

interface OTPStepProps {
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  countdown: number;
  handleVerifyOTP: () => Promise<void>;
  handleResendOTP: () => Promise<void>;
  email: string;
}

const OTPStep: React.FC<OTPStepProps> = ({
  otp,
  setOtp,
  isLoading,
  countdown,
  handleVerifyOTP,
  handleResendOTP,
  email
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="text-center text-lg tracking-widest"
          maxLength={6}
          autoFocus
        />
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-1">We sent a code to {email}</p>
          {countdown > 0 ? (
            <p>Resend code in {countdown}s</p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-primary hover:underline focus:outline-none"
              disabled={isLoading}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
      <Button 
        className="w-full"
        onClick={handleVerifyOTP}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-4 w-4" />
        )}
        Verify Code
      </Button>
    </div>
  );
};

export default OTPStep;
