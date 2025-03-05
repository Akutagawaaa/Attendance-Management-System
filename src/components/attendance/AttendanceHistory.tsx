
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Search, Building, Calendar, Bookmark, ClipboardCheck } from "lucide-react";
import { format, parseISO } from "date-fns";

interface AttendanceRecord {
  email: string;
  name: string;
  lab: string;
  training: string;
  timestamp: string;
  date: string;
  time: string;
}

interface AttendanceHistoryProps {
  userEmail: string;
}

const AttendanceHistory = ({ userEmail }: AttendanceHistoryProps) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use localStorage
    const fetchAttendanceHistory = () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        setTimeout(() => {
          const historyKey = `attendance-history-${userEmail}`;
          const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
          
          // Sort by timestamp descending (newest first)
          history.sort((a: AttendanceRecord, b: AttendanceRecord) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          setAttendanceRecords(history);
          setFilteredRecords(history);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching attendance history", error);
        setAttendanceRecords([]);
        setFilteredRecords([]);
        setIsLoading(false);
      }
    };
    
    fetchAttendanceHistory();
  }, [userEmail]);

  useEffect(() => {
    // Filter records based on search term
    if (searchTerm.trim() === "") {
      setFilteredRecords(attendanceRecords);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = attendanceRecords.filter(
        (record) =>
          record.lab.toLowerCase().includes(lowerCaseSearch) ||
          record.training.toLowerCase().includes(lowerCaseSearch) ||
          record.date.includes(lowerCaseSearch)
      );
      setFilteredRecords(filtered);
    }
  }, [searchTerm, attendanceRecords]);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="glass-card animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
              Attendance History
            </CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by lab, training, or date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <CardDescription>
            View your attendance history for all trainings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-pulse flex space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No attendance records found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px] rounded-md">
              <div className="space-y-4 p-2">
                {filteredRecords.map((record, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-200 ease-in-out"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Lab:</span> 
                          <span className="ml-2">{record.lab}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Bookmark className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Training:</span>
                          <span className="ml-2">{record.training}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">{format(parseISO(record.timestamp), "PPP")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Time:</span>
                          <span className="ml-2">{format(parseISO(record.timestamp), "p")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceHistory;
