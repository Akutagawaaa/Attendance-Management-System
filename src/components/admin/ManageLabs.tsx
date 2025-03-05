
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Lab, availableLabs, removeLab } from "@/utils/labData";
import LabForm from "./labs/LabForm";
import LabList from "./labs/LabList";
import DeleteLabDialog from "./labs/DeleteLabDialog";

const ManageLabs = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [labToDelete, setLabToDelete] = useState<Lab | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    setLabs(availableLabs);
    setIsLoading(false);
  }, []);

  const handleLabAdded = () => {
    setLabs(availableLabs);
  };

  const handleLabEdited = () => {
    setLabs(availableLabs);
  };

  const handleDeleteLab = async () => {
    if (!labToDelete) return;
    
    setIsProcessing(true);
    
    try {
      removeLab(labToDelete.id);
      setLabs(availableLabs);
      
      toast({
        title: "Lab deleted",
        description: `"${labToDelete.name}" has been deleted`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete lab",
        description: "There was an error deleting the lab",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setLabToDelete(null);
    }
  };

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Manage Labs</h3>
          </div>
          
          <LabForm onLabAdded={handleLabAdded} />
          
          <LabList 
            labs={labs}
            isLoading={isLoading}
            isProcessing={isProcessing}
            onEdit={handleLabEdited}
            onDelete={setLabToDelete}
          />
        </div>
      </CardContent>
      
      <DeleteLabDialog 
        labToDelete={labToDelete}
        isProcessing={isProcessing}
        onClose={() => setLabToDelete(null)}
        onConfirm={handleDeleteLab}
      />
    </Card>
  );
};

export default ManageLabs;
