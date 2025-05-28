"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BellIcon, CalendarIcon, CheckCircleIcon, ClockIcon, FileTextIcon, VideoIcon, SearchIcon, User } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"

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
    date: new Date(),
  },
  
  {
    id: 3,
    teacher: "Mrs. Brown",
    subject: "English",
    time: "Tomorrow, 10:00 AM",
    duration: "45 minutes",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    id: 4,
    teacher: "Mr. Wilson",
    subject: "History",
    time: "Tomorrow, 2:00 PM",
    duration: "45 minutes",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
]

const assignments = [
  {
    id: 1,
    title: "Mathematics Problem Set",
    subject: "Mathematics",
    dueDate: "July 15, 2024",
    description: "Complete problems 1-20 in Chapter 5",
    status: "pending",
  },
  {
    id: 2,
    title: "English Essay",
    subject: "English",
    dueDate: "July 18, 2024",
    description: "Write a 500-word essay on the theme of identity in the assigned novel",
    status: "pending",
  },
  { id: 3, title: "Science Lab Report", subject: "Science", dueDate: "July 10, 2024", status: "completed" },
]

const featuredResources = [
  {
    id: 1,
    title: "Algebra II Study Guide",
    type: "document",
    description: "Comprehensive guide covering key concepts in Algebra II.",
  },
  {
    id: 2,
    title: "Introduction to Biology Lecture",
    type: "video",
    description: "Video lecture introducing fundamental biology topics.",
  },
  {
    id: 3,
    title: "Essay Writing Tips",
    type: "document",
    description: "Tips and tricks for writing effective essays.",
  },
]

export function StudentDashboardContent() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState<typeof upcomingSessions>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (selectedDate) {
      const sessions = upcomingSessions.filter(session =>
        session.date.toDateString() === selectedDate.toDateString()
      )
      setSessionsForSelectedDate(sessions)
    } else {
      setSessionsForSelectedDate([])
    }
  }, [selectedDate])

  const joinSession = (sessionId: number) => {
    // Placeholder for joining a session - replace with actual logic
    console.log(`Joining session ${sessionId}`)
    // router.push(`/student/live-sessions/join?session=${sessionId}`);
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50/50 via-violet-50/30 to-fuchsia-50/30 rounded-lg min-h-screen w-full p-6">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <Card className="card overflow-hidden bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 shadow-xl">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-violet-400/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-fuchsia-400/30 to-violet-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative flex justify-between items-center h-full p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">Welcome back, Mehdi! 👋</h2>
                    <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-white/20 rounded-full h-2.5">
                        <div className="bg-white h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-white font-medium">70%</span>
                    </div>
                    <p className="text-violet-100">You've completed 70% of your weekly goal!</p>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200">
                      View Progress
                    </Button>
                    <Button className="bg-white/20 text-white hover:bg-white/30 transition-all duration-200">
                      Set New Goals
                    </Button>
                  </div>
                </div>
                
                {/* User Avatar with decorative border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-fuchsia-400 rounded-full blur-lg animate-pulse"></div>
                  <img 
                    src="/Humaaans Space.svg" 
                    alt="User avatar" 
                    className="relative h-[200px] w-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <VideoIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                <p className="text-xs text-blue-100">Scheduled for you</p>
              </CardContent>
            </Card>
            <Card className="card bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <FileTextIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
                <p className="text-xs text-violet-100">Due soon</p>
              </CardContent>
            </Card>
            <Card className="card bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
                <CheckCircleIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "completed").length}</div>
                <p className="text-xs text-fuchsia-100">Submitted successfully</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Assignments Card */}
          <Card className="card bg-gradient-to-br from-blue-50 to-violet-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900">Pending Assignments</CardTitle>
              <CardDescription className="text-violet-700">Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.filter(a => a.status === "pending").map((assignment) => (
                  <Alert key={assignment.id} className="bg-white/80 border-violet-200 shadow-sm">
                    <FileTextIcon className="h-4 w-4 text-violet-600" />
                    <AlertTitle className="flex justify-between text-blue-900">
                      <span>{assignment.title}</span>
                      <span className="text-xs text-violet-700">Due: {assignment.dueDate}</span>
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-blue-800">
                      <p>{assignment.description}</p>
                      <p className="text-xs text-violet-700 mt-1">Subject: {assignment.subject}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Resources Card */}
          <Card className="card bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-violet-900">Featured Resources</CardTitle>
              <CardDescription className="text-fuchsia-700">Helpful materials for your studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredResources.map(resource => (
                  <div key={resource.id} className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg border border-fuchsia-200 shadow-sm">
                    {resource.type === 'document' && <FileTextIcon className="h-5 w-5 text-fuchsia-600" />}
                    {resource.type === 'video' && <VideoIcon className="h-5 w-5 text-fuchsia-600" />}
                    <div className="flex-1">
                      <h4 className="font-medium text-violet-900">{resource.title}</h4>
                      <p className="text-sm text-fuchsia-700">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 mt-4 w-full shadow-md"
                onClick={() => router.push('/student/resources')}
              >
                See More Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar Card */}
          <Card className="card bg-gradient-to-br from-blue-50 to-violet-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900">Calendar</CardTitle>
              <CardDescription className="text-violet-700">View your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border-violet-200 rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Upcoming Sessions Card */}
          <Card className="card bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-violet-900">Upcoming Sessions</CardTitle>
              <CardDescription className="text-fuchsia-700">Your next learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionsForSelectedDate.map((session) => (
                  <div key={session.id} className="p-4 bg-white/80 rounded-lg border border-fuchsia-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-violet-900">{session.subject}</h4>
                        <p className="text-sm text-fuchsia-700">with {session.teacher}</p>
                      </div>
                      <Badge className="bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200">{
                        session.duration}</Badge>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-violet-700">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {session.time}
                    </div>
                    <Button
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 mt-3 w-full shadow-md"
                      onClick={() => joinSession(session.id)}
                    >
                      Join Session
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card className="card bg-gradient-to-br from-fuchsia-50 to-pink-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-fuchsia-900">Announcements</CardTitle>
              <CardDescription className="text-pink-700">Latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-white/80 rounded-lg border border-pink-200 shadow-sm">
                    <h4 className="font-medium text-fuchsia-900">{announcement.title}</h4>
                    <p className="text-sm text-pink-700 mt-1">{announcement.description}</p>
                    <p className="text-xs text-pink-600 mt-2">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
