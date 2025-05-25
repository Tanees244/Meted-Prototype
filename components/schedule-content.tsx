"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react"

// Mock data
const students = [
  {
    id: 1,
    name: "John Doe",
    grade: "10th Grade",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    grade: "9th Grade",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
  },
  {
    id: 3,
    name: "Michael Johnson",
    grade: "11th Grade",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    grade: "8th Grade",
    subject: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
  },
]

// Generate schedule data
const generateSchedule = () => {
  const schedule = []
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  // Create a schedule for each day
  days.forEach((day) => {
    const daySchedule = {
      day,
      slots: [] as any[],
    }

    // Create time slots for each day
    timeSlots.forEach((time) => {
      // Randomly assign a student or leave the slot empty
      const random = Math.random()

      if (random < 0.3) {
        // Empty slot (30% chance)
        daySchedule.slots.push({
          time,
          isEmpty: true,
        })
      } else {
        // Assign a random student (70% chance)
        const studentIndex = Math.floor(Math.random() * students.length)
        daySchedule.slots.push({
          time,
          isEmpty: false,
          student: students[studentIndex],
          subject: students[studentIndex].subject,
        })
      }
    })

    schedule.push(daySchedule)
  })

  return schedule
}

const weeklySchedule = generateSchedule()

// Generate dates for the current week
const generateWeekDates = () => {
  const today = new Date()
  const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  const dates = []

  // Calculate the date of Monday this week
  const monday = new Date(today)
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

  // Generate dates for Monday through Friday
  for (let i = 0; i < 5; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    dates.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
  }

  return dates
}

const weekDates = generateWeekDates()

export function ScheduleContent() {
  const [currentWeek, setCurrentWeek] = useState("May 13 - May 17, 2025")
  const [selectedView, setSelectedView] = useState("week")

  const previousWeek = () => {
    setCurrentWeek("May 6 - May 10, 2025")
  }

  const nextWeek = () => {
    setCurrentWeek("May 20 - May 24, 2025")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View your weekly teaching timetable</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="font-medium">{currentWeek}</span>
          </div>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <Select value={selectedView} onValueChange={setSelectedView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                    <div key={index} className="h-24 flex items-center justify-center text-sm text-muted-foreground">
                      {slot.time}
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {weeklySchedule.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-4">
                    <div className="h-12 flex flex-col items-center justify-center">
                      <div className="font-medium">{day.day}</div>
                      <div className="text-xs text-muted-foreground">{weekDates[dayIndex]}</div>
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
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={slot.student.avatar || "/placeholder.svg"} alt={slot.student.name} />
                                <AvatarFallback>{slot.student.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium truncate">{slot.student.name}</span>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{slot.subject}</div>
                            <div className="mt-auto flex items-center text-xs text-muted-foreground">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              <span>45 minutes</span>
                            </div>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Summary</CardTitle>
            <CardDescription>Overview of your teaching load</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Sessions</span>
                <Badge>28</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Busiest Day</span>
                <Badge variant="outline">Wednesday</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Free Slots</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hours per Week</span>
                <Badge>21</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>Sessions per student this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>{student.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{student.name}</span>
                  </div>
                  <Badge variant="outline">{Math.floor(Math.random() * 5) + 3} sessions</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
