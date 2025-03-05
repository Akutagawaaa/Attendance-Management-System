import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, CheckCheck, Users, FileText, Download, Calendar, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format, parseISO, isWithinInterval, subDays } from "date-fns";
import AnimatedAvatar from "@/components/ui/AnimatedAvatar";
import ManageLabs from "./ManageLabs";
import ManageTrainings from "./ManageTrainings";

interface AttendanceRecord {
  email: string;
  name: string;
  lab: string;
  training: string;
  timestamp: string;
  date: string;
  time: string;
}

interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

const AdminPanel = () => {
  const [allRecords, setAllRecords] = useState<AttendanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterLab, setFilterLab] = useState("all-labs");
  const [filterTraining, setFilterTraining] = useState("all-trainings");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [labs, setLabs] = useState<string[]>([]);
  const [trainings, setTrainings] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("all-users");
  const [activeTab, setActiveTab] = useState("records");

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use localStorage
    const loadAllData = () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        setTimeout(() => {
          // Get all users
          const allUsers: User[] = [];
          const userKeys = Object.keys(localStorage).filter(key => !key.includes("-"));
          
          userKeys.forEach(email => {
            const name = localStorage.getItem(email) || "";
            const isAdmin = email === "admin@qualityveda.com";
            allUsers.push({ email, name, isAdmin });
          });
          
          setUsers(allUsers);
          
          // Get all attendance records
          let allAttendanceRecords: AttendanceRecord[] = [];
          
          userKeys.forEach(email => {
            const historyKey = `attendance-history-${email}`;
            const userHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");
            allAttendanceRecords = [...allAttendanceRecords, ...userHistory];
          });
          
          // Sort by timestamp descending (newest first)
          allAttendanceRecords.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          setAllRecords(allAttendanceRecords);
          setFilteredRecords(allAttendanceRecords);
          
          // Get unique labs and trainings
          const uniqueLabs = [...new Set(allAttendanceRecords.map(record => record.lab))];
          const uniqueTrainings = [...new Set(allAttendanceRecords.map(record => record.training))];
          
          setLabs(uniqueLabs);
          setTrainings(uniqueTrainings);
          
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error loading admin data", error);
        setAllRecords([]);
        setFilteredRecords([]);
        setIsLoading(false);
      }
    };
    
    loadAllData();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...allRecords];
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.lab.toLowerCase().includes(lowerCaseSearch) ||
          record.training.toLowerCase().includes(lowerCaseSearch) ||
          record.name.toLowerCase().includes(lowerCaseSearch) ||
          record.email.toLowerCase().includes(lowerCaseSearch) ||
          record.date.includes(lowerCaseSearch)
      );
    }
    
    // Filter by lab
    if (filterLab && filterLab !== "all-labs") {
      filtered = filtered.filter(record => record.lab === filterLab);
    }
    
    // Filter by training
    if (filterTraining && filterTraining !== "all-trainings") {
      filtered = filtered.filter(record => record.training === filterTraining);
    }
    
    // Filter by user
    if (selectedUser && selectedUser !== "all-users") {
      filtered = filtered.filter(record => record.email === selectedUser);
    }
    
    // Filter by time period
    const now = new Date();
    if (filterPeriod === "today") {
      filtered = filtered.filter(record => 
        format(parseISO(record.timestamp), "yyyy-MM-dd") === format(now, "yyyy-MM-dd")
      );
    } else if (filterPeriod === "week") {
      const oneWeekAgo = subDays(now, 7);
      filtered = filtered.filter(record => 
        isWithinInterval(parseISO(record.timestamp), { start: oneWeekAgo, end: now })
      );
    } else if (filterPeriod === "month") {
      const oneMonthAgo = subDays(now, 30);
      filtered = filtered.filter(record => 
        isWithinInterval(parseISO(record.timestamp), { start: oneMonthAgo, end: now })
      );
    }
    
    setFilteredRecords(filtered);
  }, [searchTerm, filterLab, filterTraining, selectedUser, filterPeriod, allRecords]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterLab("all-labs");
    setFilterTraining("all-trainings");
    setSelectedUser("all-users");
    setFilterPeriod("all");
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Lab", "Training", "Date", "Time"];
    const csvRows = [headers];
    
    filteredRecords.forEach(record => {
      const formattedDate = format(parseISO(record.timestamp), "yyyy-MM-dd");
      const formattedTime = format(parseISO(record.timestamp), "HH:mm:ss");
      
      csvRows.push([
        record.name,
        record.email,
        record.lab,
        record.training,
        formattedDate,
        formattedTime
      ]);
    });
    
    // Convert to CSV string
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_export_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="glass-card animate-scale-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-semibold">Admin Dashboard</CardTitle>
          <CardDescription>
            Manage attendance records, labs, trainings, and users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="records" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Attendance Records</span>
              </TabsTrigger>
              <TabsTrigger value="labs" className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Manage Labs</span>
              </TabsTrigger>
              <TabsTrigger value="trainings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Manage Trainings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="space-y-4">
              {/* Search and filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Filter by Lab</Label>
                  <Select value={filterLab} onValueChange={setFilterLab}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Labs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-labs">All Labs</SelectItem>
                      {labs.map(lab => (
                        <SelectItem key={lab} value={lab}>{lab}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Filter by Training</Label>
                  <Select value={filterTraining} onValueChange={setFilterTraining}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Trainings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-trainings">All Trainings</SelectItem>
                      {trainings.map(training => (
                        <SelectItem key={training} value={training}>{training}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Filter by User</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">All Users</SelectItem>
                      {users.map(user => (
                        <SelectItem key={user.email} value={user.email}>{user.name} ({user.email})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Time Period</Label>
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end space-x-2">
                  <Button variant="outline" onClick={resetFilters} className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                  <Button onClick={handleExportCSV} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>
              
              {/* Attendance records table */}
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
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[500px] rounded-md border">
                  <div className="p-4">
                    <table className="min-w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="py-3 px-4 text-left">User</th>
                          <th className="py-3 px-4 text-left">Lab</th>
                          <th className="py-3 px-4 text-left">Training</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecords.map((record, index) => (
                          <tr 
                            key={index}
                            className="border-b hover:bg-muted/30 transition-colors duration-200"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <AnimatedAvatar 
                                  name={record.name}
                                  email={record.email}
                                  className="h-8 w-8 mr-2"
                                />
                                <div>
                                  <p className="font-medium">{record.name}</p>
                                  <p className="text-xs text-muted-foreground">{record.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{record.lab}</td>
                            <td className="py-3 px-4">{record.training}</td>
                            <td className="py-3 px-4">{format(parseISO(record.timestamp), "PPP")}</td>
                            <td className="py-3 px-4">{format(parseISO(record.timestamp), "p")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
            
            <TabsContent value="labs" className="space-y-4">
              <ManageLabs />
            </TabsContent>
            
            <TabsContent value="trainings" className="space-y-4">
              <ManageTrainings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
