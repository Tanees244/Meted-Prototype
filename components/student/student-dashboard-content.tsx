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
    id: 2,
    teacher: "Ms. Smith",
    subject: "Science",
    time: "Tomorrow, 10:00 AM",
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
    <div className="space-y-6 bg-[#EDE8FE] rounded-lg  min-h-screen w-full">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-br from-[#C5D2FA] to-[#EDE8FE] border-none shadow-lg">
            <div className="flex justify-between items-center h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#191970]">Welcome back, Mehdi</h2>
                <p className="text-[#019583] mt-2">You've learned 70% of your goal this week!</p>
                <p className="text-[#019583]">Keep it up and improve your progress.</p>
              </div>
              {/* User Avatar */}
              <img src="/Humaaans Space.svg" alt="User avatar" className="h-full w-auto object-contain" />
            </div>
          </Card>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-[#191970] text-white border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <VideoIcon className="h-4 w-4 text-[#ff7f00]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                <p className="text-xs text-white/70">Scheduled for you</p>
              </CardContent>
            </Card>
            <Card className="bg-[#191970] text-white border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <FileTextIcon className="h-4 w-4 text-[#ff7f00]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
                <p className="text-xs text-white/70">Due soon</p>
              </CardContent>
            </Card>
            <Card className="bg-[#191970] text-white border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-[#ff7f00]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "completed").length}</div>
                <p className="text-xs text-white/70">Submitted successfully</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Assignments Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#191970]">Pending Assignments</CardTitle>
              <CardDescription className="text-[#019583]">Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.filter(a => a.status === "pending").map((assignment) => (
                  <Alert key={assignment.id} className="bg-white/50 border-[#ff7f00]/20">
                    <FileTextIcon className="h-4 w-4 text-[#ff7f00]" />
                    <AlertTitle className="flex justify-between text-[#191970]">
                      <span>{assignment.title}</span>
                      <span className="text-xs text-[#019583]">Due: {assignment.dueDate}</span>
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-[#191970]/80">
                      <p>{assignment.description}</p>
                      <p className="text-xs text-[#019583] mt-1">Subject: {assignment.subject}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Original Upcoming Sessions Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
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

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Sessions Card with Calendar */}
          <Card className="bg-white border-[#C5D2FA] shadow-lg p-4">
            <CardHeader className="p-0 pb-3 border-b border-[#C5D2FA]/50 mb-3">
              <CardTitle className="text-[#191970] text-lg font-semibold">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border border-[#C5D2FA] rounded-md p-2">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="!bg-white"
                  modifiers={{
                    session: upcomingSessions.map(session => session.date),
                    today: new Date(),
                    selected: selectedDate
                  }}
                  modifiersStyles={{
                    session: { 
                      fontWeight: 'bold', 
                      border: '2px solid #ff7f00',
                      backgroundColor: '#fff5e6',
                      color: '#ff7f00',
                      borderRadius: '50%'
                    },
                    today: {
                      backgroundColor: '#191970',
                      color: 'white',
                      borderRadius: '50%'
                    },
                    selected: {
                      backgroundColor: '#ff7f00',
                      color: 'white',
                      borderRadius: '50%'
                    }
                  }}
                  styles={{
                    caption: { color: '#191970', fontSize: '1rem', fontWeight: '600' },
                    day: { 
                      color: '#191970',
                      margin: '0.1rem',
                      transition: 'all 0.2s ease'
                    },
                    head_cell: { 
                      color: '#019583',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    },
                    button: { 
                      color: '#191970'
                    },
                    nav_button: { 
                      color: '#191970'
                    },
                    nav_button_previous: { 
                      color: '#191970'
                    },
                    nav_button_next: { 
                      color: '#191970'
                    },
                    caption_label: {
                      fontSize: '1rem',
                      fontWeight: '600'
                    }
                  }}
                />
              </div>
              {sessionsForSelectedDate.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <h3 className="text-[#191970] font-semibold text-sm">Sessions on {selectedDate && format(selectedDate, 'PPP')}</h3>
                  {sessionsForSelectedDate.map(session => (
                    <div key={session.id} className="text-sm text-[#191970]/80 p-2 rounded-lg bg-[#fff5e6] border border-[#ff7f00]/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{session.subject}</span>
                        <span className="text-[#ff7f00]">{session.time}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1 text-[#019583]" />
                        <span className="text-[#019583]">with {session.teacher}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 text-center py-3 text-[#191970]/60">
                  <p>No sessions scheduled for this day</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Resources Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-[#ff7f00]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#191970]">Featured Resources</CardTitle>
              <CardDescription className="text-[#019583]">Helpful materials for your studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredResources.slice(0, 2).map(resource => (
                  <div key={resource.id} className="flex items-center space-x-3">
                    {resource.type === 'document' && <FileTextIcon className="h-5 w-5 text-[#ff7f00]" />}
                    {resource.type === 'video' && <VideoIcon className="h-5 w-5 text-[#ff7f00]" />}
                    <span className="text-[#191970]">{resource.title}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full border-[#ff7f00] text-[#ff7f00] hover:bg-[#ff7f00]/10"
                onClick={() => router.push('/student/resources')}
              >
                See More Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
