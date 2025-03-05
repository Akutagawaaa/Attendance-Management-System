
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Plus, Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Training, availableTrainings, addTraining, removeTraining, updateTraining } from "@/utils/labData";

const ManageTrainings = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [newTraining, setNewTraining] = useState("");
  const [editingTraining, setEditingTraining] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState<Training | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    setTrainings(availableTrainings);
    setIsLoading(false);
  }, []);

  const handleAddTraining = async () => {
    if (!newTraining.trim()) {
      toast({
        title: "Empty training name",
        description: "Please enter a training name",
        variant: "destructive",
      });
      return;
    }
    
    if (trainings.some(t => t.name === newTraining.trim())) {
      toast({
        title: "Duplicate training",
        description: "This training already exists",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const training = addTraining(newTraining.trim());
      setTrainings(availableTrainings);
      setNewTraining("");
      
      toast({
        title: "Training added",
        description: `"${training.name}" has been added successfully`,
      });
    } catch (error) {
      toast({
        title: "Failed to add training",
        description: "There was an error adding the training",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditTraining = async () => {
    if (!editingTraining || !editingTraining.name.trim()) {
      toast({
        title: "Empty training name",
        description: "Please enter a training name",
        variant: "destructive",
      });
      return;
    }
    
    if (trainings.some(t => t.name === editingTraining.name.trim() && t.id !== editingTraining.id)) {
      toast({
        title: "Duplicate training",
        description: "This training already exists",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const training = updateTraining(editingTraining.id, { name: editingTraining.name.trim() });
      if (training) {
        setTrainings(availableTrainings);
        setEditingTraining(null);
        
        toast({
          title: "Training updated",
          description: `Training has been updated successfully`,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update training",
        description: "There was an error updating the training",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTraining = async () => {
    if (!trainingToDelete) return;
    
    setIsProcessing(true);
    
    try {
      removeTraining(trainingToDelete.id);
      setTrainings(availableTrainings);
      
      toast({
        title: "Training deleted",
        description: `"${trainingToDelete.name}" has been deleted`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete training",
        description: "There was an error deleting the training",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTrainingToDelete(null);
    }
  };

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Manage Trainings</h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add new training..."
              value={newTraining}
              onChange={(e) => setNewTraining(e.target.value)}
            />
            <Button 
              onClick={handleAddTraining}
              disabled={isProcessing}
              className="flex items-center"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Training
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-pulse flex space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
          ) : trainings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No trainings found</p>
              <p className="text-sm text-muted-foreground">Add a new training to get started</p>
            </div>
          ) : (
            <ScrollArea className="h-[300px] rounded-md border">
              <div className="p-4 space-y-2">
                {trainings.map((training) => (
                  <div 
                    key={training.id}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    {editingTraining && editingTraining.id === training.id ? (
                      <div className="flex-1 flex space-x-2">
                        <Input
                          value={editingTraining.name}
                          onChange={(e) => setEditingTraining({ ...editingTraining, name: e.target.value })}
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          onClick={handleEditTraining}
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
                          onClick={() => setEditingTraining(null)}
                          disabled={isProcessing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1">{training.name}</span>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setEditingTraining({ id: training.id, name: training.name })}
                            disabled={isProcessing}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => setTrainingToDelete(training)}
                            disabled={isProcessing}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={trainingToDelete !== null} onOpenChange={(open) => !open && setTrainingToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Training</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{trainingToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteTraining}
              disabled={isProcessing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ManageTrainings;
