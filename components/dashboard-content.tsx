"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BellIcon, CalendarIcon, CheckCircleIcon, ClockIcon, UserIcon, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data
const announcements = [
  {
    id: 1,
    title: "New Learning Resources Available",
    description: "Check out the new math resources for algebra in the resources section.",
    date: "2 hours ago",
    student: "All Students",
  },
  {
    id: 2,
    title: "Schedule Change",
    description: "Your session with John Doe on Friday has been moved to 3:00 PM.",
    date: "Yesterday",
    student: "John Doe",
  },
  {
    id: 3,
    title: "Assignment Reminder",
    description: "Remind Sarah Smith to submit her science project by tomorrow.",
    date: "2 days ago",
    student: "Sarah Smith",
  },
]

const upcomingClasses = [
  {
    id: 1,
    student: "John Doe",
    subject: "Mathematics",
    time: "Today, 2:00 PM",
    duration: "45 minutes",
  },
  {
    id: 2,
    student: "Sarah Smith",
    subject: "Science",
    time: "Today, 3:30 PM",
    duration: "45 minutes",
  },
  {
    id: 3,
    student: "Michael Johnson",
    subject: "English",
    time: "Tomorrow, 10:00 AM",
    duration: "45 minutes",
  },
]

const attendanceSummary = [
  { student: "John Doe", present: 12, absent: 2, late: 1 },
  { student: "Sarah Smith", present: 14, absent: 0, late: 1 },
  { student: "Michael Johnson", present: 10, absent: 3, late: 2 },
  { student: "Emily Brown", present: 15, absent: 0, late: 0 },
]

// Generate weekly schedule
const generateWeeklySchedule = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
  const students = ["John Doe", "Sarah Smith", "Michael Johnson", "Emily Brown"]
  const subjects = ["Mathematics", "Science", "English", "History"]

  const schedule = []

  days.forEach((day, dayIndex) => {
    const daySchedule = {
      day,
      slots: [],
    }

    timeSlots.forEach((time, timeIndex) => {
      // Randomly decide if there's a class in this slot (70% chance)
      if (Math.random() < 0.7) {
        const studentIndex = Math.floor(Math.random() * students.length)
        daySchedule.slots.push({
          time,
          isEmpty: false,
          student: students[studentIndex],
          subject: subjects[studentIndex],
        })
      } else {
        daySchedule.slots.push({
          time,
          isEmpty: true,
        })
      }
    })

    schedule.push(daySchedule)
  })

  return schedule
}

const weeklySchedule = generateWeeklySchedule()

export function DashboardContent() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const startLiveClass = (studentId: number) => {
    router.push(`/live-sessions/start?student=${studentId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Teacher! Here's what's happening today.</p>
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
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <VideoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Overall attendance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
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
                        <p className="text-xs text-muted-foreground mt-1">Student: {announcement.student}</p>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex flex-col space-y-2 border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{classItem.student}</h3>
                          <p className="text-sm text-muted-foreground">{classItem.subject}</p>
                        </div>
                        <Button size="sm" onClick={() => startLiveClass(classItem.id)} className="ml-2">
                          Start
                        </Button>
                      </div>
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{classItem.time}</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{classItem.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your teaching timetable for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-6 gap-4">
                    {/* Time column */}
                    <div className="space-y-4">
                      <div className="h-12 flex items-center justify-center font-medium">Time</div>
                      {weeklySchedule[0].slots.map((slot, index) => (
                        <div
                          key={index}
                          className="h-24 flex items-center justify-center text-sm text-muted-foreground"
                        >
                          {slot.time}
                        </div>
                      ))}
                    </div>

                    {/* Day columns */}
                    {weeklySchedule.map((day, dayIndex) => (
                      <div key={dayIndex} className="space-y-4">
                        <div className="h-12 flex flex-col items-center justify-center">
                          <div className="font-medium">{day.day}</div>
                        </div>
                        {day.slots.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className={`h-24 p-2 rounded-lg border ${
                              slot.isEmpty
                                ? "border-dashed border-gray-200 dark:border-gray-800"
                                : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                            }`}
                          >
                            {!slot.isEmpty && (
                              <div className="h-full flex flex-col">
                                <div className="text-sm font-medium truncate">{slot.student}</div>
                                <div className="mt-1 text-xs text-muted-foreground">{slot.subject}</div>
                                <div className="mt-auto text-xs text-muted-foreground">45 minutes</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Student attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-center py-3 px-4">Present</th>
                      <th className="text-center py-3 px-4">Absent</th>
                      <th className="text-center py-3 px-4">Late</th>
                      <th className="text-center py-3 px-4">Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceSummary.map((record, index) => {
                      const total = record.present + record.absent + record.late
                      const rate = Math.round((record.present / total) * 100)

                      return (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">{record.student}</td>
                          <td className="text-center py-3 px-4">{record.present}</td>
                          <td className="text-center py-3 px-4">{record.absent}</td>
                          <td className="text-center py-3 px-4">{record.late}</td>
                          <td className="text-center py-3 px-4">
                            <div className="flex items-center justify-center">
                              <Badge
                                className={
                                  rate >= 90
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : rate >= 75
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }
                              >
                                {rate}%
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
