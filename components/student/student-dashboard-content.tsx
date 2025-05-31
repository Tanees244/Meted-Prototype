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
    <div className="space-y-6 bg-[#E9F8FB] rounded-lg min-h-screen w-full">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <Card className="card overflow-hidden bg-white shadow-lg border border-[#E0F2F1]">
            <div className="relative flex justify-between items-center h-full p-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#0D47A1]" >Welcome back, Mehdi!</h2>
                  <p className="text-[#1BA7BC] text-lg">You've completed <span className='font-bold'>70%</span> of your goal this week. Keep it up and pursue your progress!</p>
                </div>
                <div className="flex space-x-4">
                  <Button className="bg-[#1BA7BC] text-white hover:bg-[#37B8C6] transition-all duration-200">
                    View Progress
                  </Button>
                  <Button className="bg-[#E0F7FA] text-[#1BA7BC] hover:bg-[#BDECF6] transition-all duration-200">
                    Set New Goals
                  </Button>
                </div>
              </div>
              <div className="relative mt-6">
                <img src="/Humaaans Space.svg" alt="User avatar" className="relative h-[180px] w-auto object-cover" />
              </div>
            </div>
          </Card>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card bg-white shadow-md border border-[#E0F2F1]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-[#0D47A1]">Upcoming Sessions</CardTitle>
                <VideoIcon className="h-5 w-5 text-[#0D47A1]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1BA7BC] mb-1">{upcomingSessions.length}</div>
                <p className="text-xs text-[#0D47A1] font-medium">Scheduled for you</p>
              </CardContent>
            </Card>
            <Card className="card bg-white shadow-md border border-[#E0F2F1]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-[#0D47A1]">Pending Assignments</CardTitle>
                <FileTextIcon className="h-5 w-5 text-[#0D47A1]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1BA7BC] mb-1">{assignments.filter((a) => a.status === "pending").length}</div>
                <p className="text-xs text-[#0D47A1] font-medium">Due soon</p>
              </CardContent>
            </Card>
            <Card className="card bg-white shadow-md border border-[#E0F2F1]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-[#0D47A1]">Completed Assignments</CardTitle>
                <CheckCircleIcon className="h-5 w-5 text-[#0D47A1]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1BA7BC] mb-1">{assignments.filter((a) => a.status === "completed").length}</div>
                <p className="text-xs text-[#0D47A1] font-medium">Submitted successfully</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Assignments Card */}
          <Card className="card bg-white shadow-md border border-[#E0F2F1]">
            <CardHeader>
              <CardTitle className="text-[#0D47A1] font-bold">Pending Assignments</CardTitle>
              <CardDescription className="text-[#0D47A1]">Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.filter(a => a.status === "pending").map((assignment) => (
                  <Alert key={assignment.id} className="bg-[#E0F7FA] border-[#E0F2F1] shadow-sm flex items-center gap-3">
                    <FileTextIcon className="h-5 w-5 text-[#0D47A1]" />
                    <div className="flex-1">
                      <AlertTitle className="text-[#0D47A1] font-bold">{assignment.title}</AlertTitle>
                      <AlertDescription className="mt-1 text-[#0D47A1]">
                        {assignment.description}
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-[#0D47A1] font-semibold">Due: {assignment.dueDate}</span>
                          <span className="text-xs text-[#FF9800] font-semibold">Due soon</span>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Resources Card */}
          <Card className="card bg-white shadow-md border border-[#E0F2F1]">
            <CardHeader>
              <CardTitle className="text-[#0D47A1] font-bold">Featured Resources</CardTitle>
              <CardDescription className="text-[#0D47A1]">Helpful materials for your studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredResources.map(resource => (
                  <div key={resource.id} className="flex items-center space-x-3 p-3 bg-[#E0F7FA] rounded-lg border border-[#E0F2F1] shadow-sm">
                    {resource.type === 'document' && <FileTextIcon className="h-5 w-5 text-[#0D47A1]" />}
                    {resource.type === 'video' && <VideoIcon className="h-5 w-5 text-[#0D47A1]" />}
                    <div className="flex-1">
                      <h4 className="font-medium text-[#0D47A1]">{resource.title}</h4>
                      <p className="text-sm text-[#0D47A1]">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="bg-[#1BA7BC] text-white hover:bg-[#37B8C6] transition-all duration-200 mt-4 w-full shadow-md">
                See More Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar Card */}
          <Card className="bg-gradient-to-br from-white/90 to-[#f0f8ff] backdrop-blur-md border border-[#191970]/10 shadow-lg rounded-xl">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-[#0D47A1] text-xl font-bold">Upcoming Sessions</CardTitle>
              <CardDescription className="text-[#1BA7BC] text-sm">
                Select a date to view your sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  session: upcomingSessions.map(session => session.date),
                  today: new Date(),
                  selected: selectedDate ? [selectedDate] : []
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
                classNames={{
                  caption: "relative flex justify-center items-center text-lg font-bold text-[#0D47A1] mb-2",
                  nav: "absolute inset-0 flex justify-between items-center px-2",
                  nav_button: "w-8 h-8 rounded-full hover:bg-[#191970]/10 text-[#191970]",
                  table: "w-full border-collapse",
                  head_row: "flex justify-between border-b mb-2",
                  head_cell: "text-[#ff7f00] font-semibold text-sm",
                  row: "flex justify-between mb-2",
                  cell: "w-10 h-10 flex items-center justify-center",
                  day: "rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-[#191970] hover:bg-[#191970]/10",
                  day_selected: "bg-[#ff7f00] text-white font-bold border border-[#ff7f00] shadow-md",
                  day_today: "border border-[#ff7f00] text-[#ff7f00] font-semibold",
                  day_outside: "text-gray-300",
                }}
              />
              {sessionsForSelectedDate.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <h3 className="text-[#0D47A1] font-semibold text-sm">Sessions on {selectedDate && format(selectedDate, 'PPP')}</h3>
                  {sessionsForSelectedDate.map(session => (
                    <div key={session.id} className="text-sm text-[#191970]/80 p-3 rounded-lg bg-[#E0F7FA] border border-[#ff7f00]/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{session.subject}</span>
                        <span className="text-[#ff7f00]">{session.time}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1 text-[#0D47A1]" />
                        <span className="text-[#0D47A1]">with {session.teacher}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-[#ff7f00]">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          <span>{session.duration}</span>
                        </div>
                        <Button
                          onClick={() => router.push('/student/live-sessions')}
                          className="bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white text-xs px-3 py-1 h-7"
                        >
                          Join Now
                        </Button>
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


          {/* Upcoming Sessions Card */}
          <Card className="card bg-white shadow-md border border-[#E0F2F1]">
            <CardHeader>
              <CardTitle className="text-[#0D47A1] font-bold">Upcoming Sessions</CardTitle>
              <CardDescription className="text-[#0D47A1]">Your next learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionsForSelectedDate.map((session) => (
                  <div key={session.id} className="p-4 bg-[#E0F7FA] rounded-lg border border-[#E0F2F1] shadow-sm flex items-center gap-3">
                    <VideoIcon className="h-5 w-5 text-[#0D47A1]" />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#0D47A1]">{session.subject}</h4>
                      <p className="text-sm text-[#0D47A1]">with {session.teacher}</p>
                      <div className="flex justify-between mt-1">
                        <Badge className="bg-[#FFF3E0] text-[#FF9800] border border-[#FFE0B2]">{session.duration}</Badge>
                        <Button className="bg-[#FF9800] text-white hover:bg-[#FB8C00] transition-all duration-200 shadow-md px-3 py-1 h-auto text-xs">Join Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card className="card bg-white shadow-md border border-[#E0F2F1]">
            <CardHeader>
              <CardTitle className="text-[#0D47A1] font-bold">Announcements</CardTitle>
              <CardDescription className="text-[#0D47A1]">Latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-[#E0F7FA] rounded-lg border border-[#E0F2F1] shadow-sm flex items-center gap-3">
                    <BellIcon className="h-5 w-5 text-[#0D47A1]" />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#0D47A1]">{announcement.title}</h4>
                      <p className="text-sm text-[#0D47A1] mt-1">{announcement.description}</p>
                      <p className="text-xs text-[#0D47A1]/80 mt-2">{announcement.date}</p>
                    </div>
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
