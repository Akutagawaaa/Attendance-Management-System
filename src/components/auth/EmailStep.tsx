
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  handleSendOTP: () => Promise<void>;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  setEmail,
  isLoading,
  handleSendOTP
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="email"
            placeholder="example@qualityveda.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
      </div>
      <Button 
        className="w-full"
        onClick={handleSendOTP}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-4 w-4" />
        )}
        Send Verification Code
      </Button>
    </div>
  );
};

export default EmailStep;
