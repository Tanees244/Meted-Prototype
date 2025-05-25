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
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your learning.</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <VideoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled for you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Due soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Submitted successfully</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Overall attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Alert key={announcement.id}>
                  <BellIcon className="h-4 w-4" />
                  <AlertTitle className="flex justify-between">
                    <span>{announcement.title}</span>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </AlertTitle>
                  <AlertDescription className="mt-1">
                    <p>{announcement.description}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex flex-col space-y-2 border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{session.subject}</h3>
                      <p className="text-sm text-muted-foreground">with {session.teacher}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="ml-2">
                          Join
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join Session</DialogTitle>
                          <DialogDescription>
                            You are about to join a live session with {session.teacher} for {session.subject}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button onClick={() => joinSession(session.id)}>Join Now</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{session.time}</span>
                    <span className="mx-2">•</span>
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{session.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Assignments</CardTitle>
          <CardDescription>Assignments that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Assignment</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Due Date</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b">
                    <td className="py-3 px-4">{assignment.title}</td>
                    <td className="py-3 px-4">{assignment.subject}</td>
                    <td className="py-3 px-4">{assignment.dueDate}</td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          assignment.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {assignment.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <Button variant="outline" size="sm">
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
