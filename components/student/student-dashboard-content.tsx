"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BellIcon, CalendarIcon, CheckCircleIcon, ClockIcon, FileTextIcon, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const announcements = [
  {
    id: 1,
    title: "New Learning Resources Available",
    description: "Check out the new math resources for algebra in the resources section.",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "Schedule Change",
    description: "Your session on Friday has been moved to 3:00 PM.",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Assignment Reminder",
    description: "Don't forget to submit your science project by tomorrow.",
    date: "2 days ago",
  },
]

const upcomingSessions = [
  {
    id: 1,
    teacher: "Mr. Johnson",
    subject: "Mathematics",
    time: "Today, 2:00 PM",
    duration: "45 minutes",
  },
  {
    id: 2,
    teacher: "Ms. Smith",
    subject: "Science",
    time: "Tomorrow, 10:00 AM",
    duration: "45 minutes",
  },
]

const assignments = [
  {
    id: 1,
    title: "Algebra Equations",
    subject: "Mathematics",
    dueDate: "May 15, 2025",
    status: "pending",
  },
  {
    id: 2,
    title: "Science Lab Report",
    subject: "Science",
    dueDate: "May 18, 2025",
    status: "pending",
  },
  {
    id: 3,
    title: "Historical Timeline",
    subject: "History",
    dueDate: "May 10, 2025",
    status: "completed",
  },
]

export function StudentDashboardContent() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const joinSession = (sessionId: number) => {
    router.push(`/student/live-sessions/join?session=${sessionId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#191970]">Student Dashboard</h1>
          <p className="text-[#019583]">Welcome back! Here's what's happening with your learning.</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-[#ff7f00]">
          <ClockIcon className="h-4 w-4" />
          <span>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#191970] to-[#191970]/90 text-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <VideoIcon className="h-4 w-4 text-[#ff7f00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-white/70">Scheduled for you</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#019583] to-[#019583]/90 text-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileTextIcon className="h-4 w-4 text-[#ff7f00]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
            <p className="text-xs text-white/70">Due soon</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#ff7f00] to-[#ff7f00]/90 text-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "completed").length}</div>
            <p className="text-xs text-white/70">Submitted successfully</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#a6c732] to-[#a6c732]/90 text-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CalendarIcon className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-white/70">Overall attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#191970]">Announcements</CardTitle>
            <CardDescription className="text-[#019583]">Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Alert key={announcement.id} className="bg-white/50 border-[#ff7f00]/20">
                  <BellIcon className="h-4 w-4 text-[#ff7f00]" />
                  <AlertTitle className="flex justify-between text-[#191970]">
                    <span>{announcement.title}</span>
                    <span className="text-xs text-[#019583]">{announcement.date}</span>
                  </AlertTitle>
                  <AlertDescription className="mt-1 text-[#191970]/80">
                    <p>{announcement.description}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#191970]">Upcoming Sessions</CardTitle>
            <CardDescription className="text-[#019583]">Your next learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-[#ff7f00]/20">
                  <div>
                    <h4 className="font-medium text-[#191970]">{session.subject}</h4>
                    <p className="text-sm text-[#019583]">with {session.teacher}</p>
                    <div className="flex items-center text-sm text-[#ff7f00] mt-1">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{session.time}</span>
                      <span className="mx-2">•</span>
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => joinSession(session.id)}
                    className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white"
                  >
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#191970]">Pending Assignments</CardTitle>
          <CardDescription className="text-[#019583]">Assignments that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ff7f00]/20">
                  <th className="text-left py-3 px-4 text-[#191970]">Assignment</th>
                  <th className="text-left py-3 px-4 text-[#191970]">Subject</th>
                  <th className="text-left py-3 px-4 text-[#191970]">Due Date</th>
                  <th className="text-center py-3 px-4 text-[#191970]">Status</th>
                  <th className="text-right py-3 px-4 text-[#191970]">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-[#ff7f00]/10">
                    <td className="py-3 px-4 text-[#191970]">{assignment.title}</td>
                    <td className="py-3 px-4 text-[#191970]">{assignment.subject}</td>
                    <td className="py-3 px-4 text-[#191970]">{assignment.dueDate}</td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          assignment.status === "completed"
                            ? "bg-[#a6c732]/20 text-[#a6c732]"
                            : "bg-[#ff7f00]/20 text-[#ff7f00]"
                        }`}
                      >
                        {assignment.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`${
                          assignment.status === "completed"
                            ? "border-[#a6c732] text-[#a6c732] hover:bg-[#a6c732]/10"
                            : "border-[#ff7f00] text-[#ff7f00] hover:bg-[#ff7f00]/10"
                        }`}
                      >
                        {assignment.status === "completed" ? "View" : "Submit"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
