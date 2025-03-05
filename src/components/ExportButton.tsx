import React from "react";
import { Button } from "@/components/ui/button"; // Adjust this based on your UI components
import Papa from "papaparse";

interface AttendanceRecord {
  name: string;
  email: string;
  trainingName: string;
  labName: string;
  date: string;
  time: string;
}

interface ExportButtonProps {
  attendanceData: AttendanceRecord[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ attendanceData }) => {
  const handleExportCSV = () => {
    if (!attendanceData || attendanceData.length === 0) {
      alert("No attendance data available for export.");
      return;
    }

    // Group data by lab name
    const groupedData = attendanceData.reduce((acc, record) => {
      acc[record.labName] = acc[record.labName] || [];
      acc[record.labName].push(record);
      return acc;
    }, {} as Record<string, AttendanceRecord[]>);

    // Generate CSV for each lab
    Object.entries(groupedData).forEach(([labName, records]) => {
      const csvData = [
        ["Name", "Email", "Training", "Lab", "Date", "Time"],
        ...records.map(({ name, email, trainingName, labName, date, time }) => [
          name,
          email,
          trainingName,
          labName,
          date,
          time,
        ]),
      ];

      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${labName}_attendance.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Button className="mt-4" onClick={handleExportCSV}>
      Export Attendance (CSV)
    </Button>
  );
};

export default ExportButton;
