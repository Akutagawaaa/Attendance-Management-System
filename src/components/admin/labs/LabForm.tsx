
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addLab } from "@/utils/labData";

interface LabFormProps {
  onLabAdded: () => void;
}

const LabForm: React.FC<LabFormProps> = ({ onLabAdded }) => {
  const [newLabName, setNewLabName] = useState("");
  const [newLabLocation, setNewLabLocation] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAddLab = async () => {
    if (!newLabName.trim() || !newLabLocation.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both lab name and location",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const newLab = addLab(newLabName.trim(), newLabLocation.trim());
      setNewLabName("");
      setNewLabLocation("");
      onLabAdded();
      
      toast({
        title: "Lab added",
        description: `"${newLab.name}" has been added successfully`,
      });
    } catch (error) {
      toast({
        title: "Failed to add lab",
        description: "There was an error adding the lab",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Lab name..."
        value={newLabName}
        onChange={(e) => setNewLabName(e.target.value)}
      />
      <Input
        placeholder="Lab location..."
        value={newLabLocation}
        onChange={(e) => setNewLabLocation(e.target.value)}
      />
      <Button 
        onClick={handleAddLab}
        disabled={isProcessing}
        className="flex items-center"
      >
        {isProcessing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        Add Lab
      </Button>
    </div>
  );
};

export default LabForm;
