
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import { Lab, updateLab } from "@/utils/labData";
import { useToast } from "@/hooks/use-toast";

interface LabItemProps {
  lab: Lab;
  onEdit: () => void;
  onDelete: (lab: Lab) => void;
  isProcessing: boolean;
}

const LabItem: React.FC<LabItemProps> = ({ lab, onEdit, onDelete, isProcessing }) => {
  const [editingLab, setEditingLab] = useState<{ id: string; name: string; location: string } | null>(null);
  const { toast } = useToast();

  const handleEditLab = async () => {
    if (!editingLab) return;
    
    if (!editingLab.name.trim() || !editingLab.location.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both lab name and location",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const updatedLab = updateLab(editingLab.id, {
        name: editingLab.name.trim(),
        location: editingLab.location.trim(),
      });
      
      if (updatedLab) {
        setEditingLab(null);
        onEdit();
        
        toast({
          title: "Lab updated",
          description: `Lab has been updated successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update lab",
        description: "There was an error updating the lab",
        variant: "destructive",
      });
    }
  };

  const startEditing = () => {
    setEditingLab({ id: lab.id, name: lab.name, location: lab.location });
  };

  const cancelEditing = () => {
    setEditingLab(null);
  };

  if (editingLab && editingLab.id === lab.id) {
    return (
      <div className="flex-1 grid gap-2">
        <Input
          value={editingLab.name}
          onChange={(e) => setEditingLab({ ...editingLab, name: e.target.value })}
          placeholder="Lab name"
          autoFocus
        />
        <Input
          value={editingLab.location}
          onChange={(e) => setEditingLab({ ...editingLab, location: e.target.value })}
          placeholder="Lab location"
        />
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            onClick={handleEditLab}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={cancelEditing}
            disabled={isProcessing}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1">
        <p className="font-medium">{lab.name}</p>
        <p className="text-sm text-muted-foreground">{lab.location}</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={startEditing}
          disabled={isProcessing}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(lab)}
          disabled={isProcessing}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default LabItem;
