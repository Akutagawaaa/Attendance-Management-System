
import React from "react";
import { Button } from "@/components/ui/button";
import { Building, ArrowRight, Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableLabs } from "@/utils/labData";

interface LabStepProps {
  selectedLab: string;
  setSelectedLab: (lab: string) => void;
  isLoading: boolean;
  handleSubmitLab: () => Promise<void>;
}

const LabStep: React.FC<LabStepProps> = ({
  selectedLab,
  setSelectedLab,
  isLoading,
  handleSubmitLab
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Select value={selectedLab} onValueChange={setSelectedLab}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select a lab" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {availableLabs.map((lab) => (
                <SelectItem key={lab.id} value={lab.id}>
                  <div className="flex flex-col">
                    <span>{lab.name}</span>
                    <span className="text-xs text-muted-foreground">{lab.location}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button 
        className="w-full"
        onClick={handleSubmitLab}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="mr-2 h-4 w-4" />
        )}
        Complete Registration
      </Button>
    </div>
  );
};

export default LabStep;
