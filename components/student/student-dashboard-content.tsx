"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellIcon, CalendarIcon, CheckCircleIcon, ClockIcon, FileTextIcon, VideoIcon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

// Mock data
const announcements = [
  { id: 1, title: "New Learning Resources Available", description: "Check out the new math resources for algebra.", date: "2 hours ago" },
  { id: 2, title: "Schedule Change", description: "Friday session moved to 3:00 PM.", date: "Yesterday" },
  { id: 3, title: "Assignment Reminder", description: "Submit your science project tomorrow.", date: "2 days ago" },
];

const upcomingSessions = [
  { id: 1, teacher: "Mr. Johnson", subject: "Mathematics", time: "Tue, May 25th, 2025 8:00 AM", duration: "45 mins", date: new Date("2025-05-25") },
  { id: 3, teacher: "Mrs. Brown", subject: "English", time: "Tomorrow, 10:00 AM", duration: "45 mins", date: new Date(new Date().setDate(new Date().getDate() + 1)) },
  { id: 4, teacher: "Mr. Wilson", subject: "History", time: "Tomorrow, 2:00 PM", duration: "45 mins", date: new Date(new Date().setDate(new Date().getDate() + 1)) },
];

const assignments = [
  { id: 1, title: "Mathematics Problem Set", subject: "Mathematics", dueDate: "Tomorrow", description: "Assignment 7 - Due Apr 25 at Chap 5", status: "pending" },
  { id: 2, title: "English Essay", subject: "English", dueDate: "May 1", description: "Subject: Seven Ages", status: "pending" },
  { id: 3, title: "Science Lab Report", subject: "Science", dueDate: "July 10, 2024", status: "completed" },
];

export function StudentDashboardContent() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState<typeof upcomingSessions>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const sessions = upcomingSessions.filter(session => session.date.toDateString() === selectedDate.toDateString());
      setSessionsForSelectedDate(sessions);
    } else {
      setSessionsForSelectedDate([]);
    }
  }, [selectedDate]);

  const joinSession = (sessionId) => {
    console.log(`Joining session ${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] space-y-6">
      {/* Welcome Card */}
      <Card className="bg-white border border-[#E0E7EF] shadow-lg rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-4 max-w-lg p-6 ">
            <div className="flex items-center space-x-3">
              <img src="/smile.jpg" alt="User avatar" className="h-28 w-28 rounded-full" />
              <div>
                <h2 className="text-3xl font-bold text-[#191970]">Welcome back, Mehdi!</h2>
                <p className="text-[#4B5563] text-lg">You've completed <span className="font-bold text-[#191970]">70%</span> of your goal week. Keep it up and pursue your progress!</p>
              </div>
            </div>
            <div className="w-full bg-[#E0E7EF] rounded-full h-2.5 mt-4">
              <div className="bg-[#ff7f00] h-2.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <p className="text-sm text-[#4B5563]">Progress towards weekly goal</p>
            <div className="flex space-x-4 mt-6">
              <Button className="bg-[#191970] text-white hover:bg-[#131352] transition-all duration-200">View Progress</Button>
              <Button className="bg-white text-[#191970] border border-[#191970] hover:bg-[#F0F4F8] transition-all duration-200">Set New Goals</Button>
            </div>
          </div>
          <img src="/6722.jpg" alt="Illustration" className="md:block h-[300px] w-[500px]" />
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border border-[#E0F2F1] text-center shadow-md">
              <CardHeader className="pb-2">
                <VideoIcon className="h-6 w-6 text-[#1BA7BC] mx-auto mb-2" />
                <CardTitle className="text-xl font-bold text-[#191970]">{upcomingSessions.length}</CardTitle>
                <CardDescription className="text-sm text-[#4B5563]">Upcoming Sessions</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white text-white border text-center shadow-md">
              <CardHeader className="pb-2">
                <FileTextIcon className="h-6 w-6 text-[#1BA7BC] mx-auto mb-2" />
                <CardTitle className="text-xl  text-[#191970] font-bold">{assignments.filter(a => a.status === "pending").length}</CardTitle>
                <CardDescription className="text-md text-[#4B5563]">Pending Assignments</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white border border-[#E0F2F1] text-center shadow-md">
              <CardHeader className="pb-2">
                <CheckCircleIcon className="h-6 w-6 text-[#1BA7BC] mx-auto mb-2" />
                <CardTitle className="text-xl font-bold text-[#191970]">{assignments.filter(a => a.status === "completed").length}</CardTitle>
                <CardDescription className="text-sm text-[#4B5563]">Completed Assignments</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Pending Assignments Card */}
          <Card className="bg-white border border-[#E0F2F1] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#191970] font-bold text-xl">Pending Assignments</CardTitle>
              <CardDescription className="text-[#4B5563]">Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.filter(a => a.status === "pending").map((assignment) => (
                <div key={assignment.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-[#E0F2F1]">
                  <FileTextIcon className="h-5 w-5 text-[#1BA7BC] mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-[#191970]">{assignment.title}</h4>
                    <p className="text-sm text-[#4B5563] mt-1">{assignment.description}</p>
                    <div className="flex justify-between items-center mt-2 text-sm text-[#4B5563]">
                      <span className="font-semibold">Subject: {assignment.subject}</span>
                      <span className="text-[#ff7f00] font-semibold">Due: {assignment.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Sessions Card */}
          <Card className="bg-white border border-[#E0F2F1] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#191970] font-bold text-xl">Upcoming Sessions</CardTitle>
              <CardDescription className="text-[#4B5563]">Select a date to view your sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ session: upcomingSessions.map(session => session.date), today: new Date() }}
                modifiersStyles={{
                  session: { fontWeight: "bold", border: "2px solid #ff7f00", backgroundColor: "#fff5e6", color: "#ff7f00", borderRadius: "50%" },
                  today: { backgroundColor: "#191970", color: "white", borderRadius: "50%" },
                }}
                classNames={{
                  months: "flex justify-center",
                  caption: "relative flex justify-center items-center text-lg font-bold text-[#191970] mb-4",
                  nav: "absolute inset-0 flex justify-between items-center px-4",
                  nav_button: "w-8 h-8 rounded-full hover:bg-[#F0F4F8] text-[#191970]",
                  table: "w-full border-collapse",
                  head_row: "flex justify-between mb-2",
                  head_cell: "text-[#4B5563] font-semibold text-sm",
                  row: "flex justify-between mb-2",
                  cell: "w-10 h-10 flex items-center justify-center",
                  day: "rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-[#191970] hover:bg-[#F0F4F8]",
                  day_selected: "bg-[#ff7f00] text-white font-bold border border-[#ff7f00]",
                  day_today: "border border-[#191970] text-[#191970] font-semibold",
                }}
              />
              {sessionsForSelectedDate.length > 0 ? (
                <div className="mt-4 space-y-3 border-t pt-4 border-[#E0E7EF]">
                  <h3 className="text-[#191970] font-semibold text-base">Sessions on {selectedDate && format(selectedDate, "PPP")}</h3>
                  {sessionsForSelectedDate.map(session => (
                    <div key={session.id} className="text-sm text-[#4B5563] p-3 rounded-lg bg-[#F0F4F8] shadow-sm border border-[#E0E7EF]">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#191970]">{session.subject}</span>
                        <span className="text-[#ff7f00] font-semibold">{session.time}</span>
                      </div>
                      <div className="flex items-center mt-1 text-[#4B5563]">
                        <User className="h-3 w-3 mr-1" />
                        <span>with {session.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-[#4B5563]">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          <span>{session.duration}</span>
                        </div>
                        <Button
                          className="bg-[#ff7f00] hover:bg-[#e67300] text-white text-xs px-3 py-1 h-auto"
                          onClick={() => joinSession(session.id)}
                        >
                          Join Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center py-3 text-[#4B5563] border-t border-[#E0E7EF]">
                  <p>No sessions scheduled for this day</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card className="bg-white border border-[#E0F2F1] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#191970] font-bold text-xl">Announcements</CardTitle>
              <CardDescription className="text-[#4B5563]">Latest updates and news</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-3 bg-[#F0F4F8] rounded-lg shadow-sm border border-[#E0E7EF]">
                  <div className="flex items-start space-x-3">
                    <BellIcon className="h-5 w-5 text-[#1BA7BC] mt-1" />
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h4 className="font-medium text-[#191970]">{announcement.title}</h4>
                        <p className="text-sm text-[#4B5563] mt-1">{announcement.description}</p>
                      </div>
                      <p className="text-xs text-[#4B5563] mt-2">{announcement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}