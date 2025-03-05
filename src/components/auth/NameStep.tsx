
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

interface NameStepProps {
  name: string;
  setName: (name: string) => void;
  isLoading: boolean;
  handleSubmitName: () => Promise<void>;
}

const NameStep: React.FC<NameStepProps> = ({
  name,
  setName,
  isLoading,
  handleSubmitName
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg"
          autoFocus
        />
      </div>
      <Button 
        className="w-full"
        onClick={handleSubmitName}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-4 w-4" />
        )}
        Continue
      </Button>
    </div>
  );
};

export default NameStep;
