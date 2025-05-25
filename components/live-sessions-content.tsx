"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, VideoIcon } from "lucide-react"

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

const upcomingSessions = [
  {
    id: 1,
    student: students[0],
    date: "Today",
    time: "2:00 PM",
    duration: "45 minutes",
  },
  {
    id: 2,
    student: students[1],
    date: "Today",
    time: "3:30 PM",
    duration: "45 minutes",
  },
  {
    id: 3,
    student: students[2],
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "45 minutes",
  },
  {
    id: 4,
    student: students[3],
    date: "May 15, 2025",
    time: "1:15 PM",
    duration: "45 minutes",
  },
]

const pastSessions = [
  {
    id: 101,
    student: students[0],
    date: "May 10, 2025",
    time: "2:00 PM",
    duration: "45 minutes",
    attended: true,
  },
  {
    id: 102,
    student: students[1],
    date: "May 9, 2025",
    time: "3:30 PM",
    duration: "45 minutes",
    attended: true,
  },
  {
    id: 103,
    student: students[2],
    date: "May 8, 2025",
    time: "10:00 AM",
    duration: "45 minutes",
    attended: false,
  },
  {
    id: 104,
    student: students[3],
    date: "May 7, 2025",
    time: "1:15 PM",
    duration: "45 minutes",
    attended: true,
  },
]

export function LiveSessionsContent() {
  const router = useRouter()
  const [selectedStudent, setSelectedStudent] = useState("")

  const startSession = () => {
    if (selectedStudent) {
      router.push(`/live-sessions/start?student=${selectedStudent}`)
    }
  }

  const startScheduledSession = (sessionId: number) => {
    router.push(`/live-sessions/start?session=${sessionId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Live Sessions</h1>
        <p className="text-muted-foreground">Manage and start your one-on-one sessions with students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start a New Session</CardTitle>
          <CardDescription>Select a student to begin a one-on-one session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.initials}</AvatarFallback>
                      </Avatar>
                      {student.name} - {student.subject}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={startSession} disabled={!selectedStudent} className="md:w-auto">
              <VideoIcon className="h-4 w-4 mr-2" />
              Start Session
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Sessions</CardTitle>
              <CardDescription>Your upcoming one-on-one sessions with students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={session.student.avatar || "/placeholder.svg"} alt={session.student.name} />
                          <AvatarFallback>{session.student.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{session.student.name}</CardTitle>
                          <CardDescription>{session.student.subject}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center text-sm mb-2">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>
                          {session.time} ({session.duration})
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => startScheduledSession(session.id)}>
                        <VideoIcon className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>History of your previous sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-center py-3 px-4">Attendance</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastSessions.map((session) => (
                      <tr key={session.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={session.student.avatar || "/placeholder.svg"}
                                alt={session.student.name}
                              />
                              <AvatarFallback>{session.student.initials}</AvatarFallback>
                            </Avatar>
                            {session.student.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">{session.student.subject}</td>
                        <td className="py-3 px-4">{session.date}</td>
                        <td className="py-3 px-4">{session.time}</td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              session.attended
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {session.attended ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <Button variant="outline" size="sm">
                            View Notes
                          </Button>
                        </td>
                      </tr>
                    ))}
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
