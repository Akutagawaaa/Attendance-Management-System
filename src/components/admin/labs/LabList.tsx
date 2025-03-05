
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lab } from "@/utils/labData";
import LabItem from "./LabItem";

interface LabListProps {
  labs: Lab[];
  isLoading: boolean;
  isProcessing: boolean;
  onEdit: () => void;
  onDelete: (lab: Lab) => void;
}

const LabList: React.FC<LabListProps> = ({ 
  labs, 
  isLoading, 
  isProcessing,
  onEdit, 
  onDelete 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-pulse flex space-x-3">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (labs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No labs found</p>
        <p className="text-sm text-muted-foreground">Add a new lab to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] rounded-md border">
      <div className="p-4 space-y-2">
        {labs.map((lab) => (
          <div 
            key={lab.id}
            className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
          >
            <LabItem 
              lab={lab} 
              onEdit={onEdit} 
              onDelete={() => onDelete(lab)}
              isProcessing={isProcessing}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LabList;
