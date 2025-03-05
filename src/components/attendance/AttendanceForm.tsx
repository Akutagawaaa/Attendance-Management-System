
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ClipboardCheck, Calendar, Building, Bookmark, Loader2, Clock } from "lucide-react";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";
import { format } from "date-fns";
import { availableLabs, availableTrainings } from "@/utils/labData";

interface AttendanceFormProps {
  userEmail: string;
  userName: string;
}

const AttendanceForm = ({ userEmail, userName }: AttendanceFormProps) => {
  const [selectedLab, setSelectedLab] = useState("");
  const [previousLab, setPreviousLab] = useState("");
  const [selectedTraining, setSelectedTraining] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  
  const { toast } = useToast();
  const currentDate = format(new Date(), "PPP");
  const currentTime = format(new Date(), "p");

  // Load user data and check if attendance is already submitted
  useEffect(() => {
    // Load user's previous lab selection
    const savedLab = localStorage.getItem(`${userEmail}-lab`);
    if (savedLab) {
      setSelectedLab(savedLab);
      setPreviousLab(savedLab);
    }
    
    // Check if user has already submitted attendance today
    checkAttendanceSubmitted();
  }, [userEmail]);

  const checkAttendanceSubmitted = () => {
    // In a real app, this would check the database
    // For demo purposes, we'll use localStorage
    const today = format(new Date(), "yyyy-MM-dd");
    const key = `attendance-${userEmail}-${today}`;
    const submitted = localStorage.getItem(key);
    
    if (submitted) {
      setAttendanceSubmitted(true);
      
      // Parse the submitted data to show selected values
      try {
        const data = JSON.parse(submitted);
        setSelectedLab(data.lab);
        setSelectedTraining(data.training);
      } catch (e) {
        console.error("Error parsing attendance data", e);
      }
    }
  };

  const handleLabChange = (value: string) => {
    if (previousLab && value !== previousLab) {
      setShowWarning(true);
    } else {
      setSelectedLab(value);
    }
  };

  const confirmLabChange = () => {
    // User confirmed the lab change
    setSelectedLab(selectedLab);
    setPreviousLab(selectedLab);
    localStorage.setItem(`${userEmail}-lab`, selectedLab);
    setShowWarning(false);
  };

  const cancelLabChange = () => {
    // User canceled the lab change
    setSelectedLab(previousLab);
    setShowWarning(false);
  };

  const handleSubmitAttendance = async () => {
    if (!selectedLab) {
      toast({
        title: "Lab selection required",
        description: "Please select a lab",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTraining) {
      toast({
        title: "Training selection required",
        description: "Please select a training",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to submit attendance
      // For demo purposes, we'll use localStorage to simulate this
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save lab preference
      localStorage.setItem(`${userEmail}-lab`, selectedLab);
      setPreviousLab(selectedLab);
      
      // Save attendance record
      const timestamp = new Date().toISOString();
      const today = format(new Date(), "yyyy-MM-dd");
      const attendanceData = {
        email: userEmail,
        name: userName,
        lab: selectedLab,
        training: selectedTraining,
        timestamp,
        date: format(new Date(), "yyyy-MM-dd"),
        time: format(new Date(), "HH:mm:ss"),
      };
      
      // Save to localStorage for demo
      // In a real app, this would be saved to a database
      
      // Store the attendance for today
      localStorage.setItem(`attendance-${userEmail}-${today}`, JSON.stringify(attendanceData));
      
      // Also store in attendance history
      const historyKey = `attendance-history-${userEmail}`;
      const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
      history.push(attendanceData);
      localStorage.setItem(historyKey, JSON.stringify(history));
      
      // Update UI
      setAttendanceSubmitted(true);
      
      toast({
        title: "Attendance submitted",
        description: "Your attendance has been recorded successfully",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your attendance",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
            Attendance Form
          </h2>
          <AnimatedAvatar name={userName} email={userEmail} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                Date
              </Label>
              <Input value={currentDate} disabled />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                Time
              </Label>
              <Input value={currentTime} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
              Lab Name
            </Label>
            <Select
              value={selectedLab}
              onValueChange={handleLabChange}
              disabled={attendanceSubmitted}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a lab" />
              </SelectTrigger>
              <SelectContent>
                {availableLabs.map((lab) => (
                  <SelectItem key={lab.id} value={lab.name}>
                    {lab.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Bookmark className="mr-2 h-4 w-4 text-muted-foreground" />
              Training Name
            </Label>
            <Select
              value={selectedTraining}
              onValueChange={setSelectedTraining}
              disabled={attendanceSubmitted}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a training" />
              </SelectTrigger>
              <SelectContent>
                {availableTrainings.map((training) => (
                  <SelectItem key={training.id} value={training.name}>
                    {training.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmitAttendance}
            className="w-full"
            disabled={isSubmitting || attendanceSubmitted}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : attendanceSubmitted ? (
              "Attendance Submitted"
            ) : (
              "Submit Attendance"
            )}
          </Button>
          
          {attendanceSubmitted && (
            <p className="text-center text-sm text-muted-foreground animate-fade-in">
              You have already submitted attendance for today.
            </p>
          )}
        </div>
      </div>

      {/* Warning dialog for lab change */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Lab?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to change your lab. This will update your lab preference for future attendance records. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelLabChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLabChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AttendanceForm;
