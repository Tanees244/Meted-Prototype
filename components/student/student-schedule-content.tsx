"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Clock, CalendarIcon, User } from "lucide-react"

// Mock data for schedule
const weeklySchedule = [
  {
    day: "Monday",
    sessions: [
      {
        id: 1,
        subject: "Mathematics",
        teacher: "Mr. Johnson",
        time: "09:00 - 10:00",
        status: "upcoming",
      },
      {
        id: 2,
        subject: "English",
        teacher: "Ms. Smith",
        time: "11:00 - 12:00",
        status: "upcoming",
      },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      {
        id: 3,
        subject: "Science",
        teacher: "Dr. Williams",
        time: "09:00 - 10:00",
        status: "upcoming",
      },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      {
        id: 4,
        subject: "Mathematics",
        teacher: "Mr. Johnson",
        time: "09:00 - 10:00",
        status: "upcoming",
      },
      {
        id: 5,
        subject: "History",
        teacher: "Mr. Davis",
        time: "11:00 - 12:00",
        status: "upcoming",
      },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      {
        id: 6,
        subject: "Science",
        teacher: "Dr. Williams",
        time: "09:00 - 10:00",
        status: "upcoming",
      },
    ],
  },
  {
    day: "Friday",
    sessions: [
      {
        id: 7,
        subject: "English",
        teacher: "Ms. Smith",
        time: "09:00 - 10:00",
        status: "upcoming",
      },
      {
        id: 8,
        subject: "History",
        teacher: "Mr. Davis",
        time: "11:00 - 12:00",
        status: "upcoming",
      },
    ],
  },
  {
    day: "Saturday",
    sessions: [],
  },
  {
    day: "Sunday",
    sessions: [],
  },
]

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Mr. Johnson",
    date: "2023-06-12",
    time: "09:00 - 10:00",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "English",
    teacher: "Ms. Smith",
    date: "2023-06-12",
    time: "11:00 - 12:00",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Science",
    teacher: "Dr. Williams",
    date: "2023-06-13",
    time: "09:00 - 10:00",
    status: "upcoming",
  },
]

export default function StudentScheduleContent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("week")

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">My Schedule</h1>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Select defaultValue={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "week" && (
        <div className="space-y-6">
          {weeklySchedule.map((day, index) => (
            <Card key={index} className={day.sessions.length === 0 ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle>{day.day}</CardTitle>
                <CardDescription>
                  {day.sessions.length === 0 ? "No scheduled sessions" : `${day.sessions.length} session(s) scheduled`}
                </CardDescription>
              </CardHeader>
              {day.sessions.length > 0 && (
                <CardContent>
                  <div className="space-y-4">
                    {day.sessions.map((session) => (
                      <div key={session.id} className="flex items-start p-3 rounded-lg border">
                        <div className="flex-1">
                          <h3 className="font-medium">{session.subject}</h3>
                          <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {session.teacher}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {session.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {session.status === "upcoming" ? "Upcoming" : "Completed"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {view === "calendar" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar View</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Today</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (date) {
                      const newDate = new Date(date)
                      newDate.setMonth(newDate.getMonth() - 1)
                      setDate(newDate)
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous month</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (date) {
                      const newDate = new Date(date)
                      newDate.setMonth(newDate.getMonth() + 1)
                      setDate(newDate)
                    }
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next month</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

            <div className="mt-6">
              <h3 className="font-medium mb-3">
                Sessions on{" "}
                {date?.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start p-3 rounded-lg border">
                      <div className="flex-1">
                        <h4 className="font-medium">{session.subject}</h4>
                        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3" />
                            {session.teacher}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.time}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        {session.status === "upcoming" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No sessions scheduled for this day</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {view === "upcoming" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>

          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{session.subject}</CardTitle>
                    <CardDescription>{session.teacher}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {session.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:gap-6 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{session.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
